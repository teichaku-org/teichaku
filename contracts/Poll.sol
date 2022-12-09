pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./lib/Array.sol";
import "./DAOHistory.sol";
import "./interface/IWallet.sol";
import "./interface/IPoll.sol";
import "./lib/SafeMath.sol";
import "./struct/poll/DetailPollItem.sol";
import "./struct/poll/AbstractPollItem.sol";
import "./struct/poll/Vote.sol";
import "./struct/assessment/Assessment.sol";
import "./struct/dao/DAOHistoryItem.sol";

//dev
// import "hardhat/console.sol";

contract Poll is IPoll, AccessControl, Ownable {
    // DAO ID
    string private daoId;
    // Project Id
    string private projectId;

    // Constructor
    constructor(
        string memory _daoId,
        string memory _projectId,
        uint256 _commissionRate,
        address _commissionAddress
    ) {
        daoId = _daoId;
        projectId = _projectId;
        COMMISSION_RATE = _commissionRate;
        commissionAddress = _commissionAddress;
        startTimeStamp[0] = block.timestamp;
        endTimeStamp[0] = block.timestamp + 14 days;
        perspectives[0] = ["Planning", "Execution", "Improvement"];
    }

    // Pollを開始したり終了するなどの権限
    // Role to start and end a Poll etc
    bytes32 private constant POLL_ADMIN_ROLE = keccak256("POLL_ADMIN_ROLE");

    // Poll Id
    int256 public currentMaxPollId = 0;

    // 配布するDAOトークンのアドレス
    // DAO token address to distribute
    address public daoTokenAddress;

    // 投票するのに必要なNFT(SBT)のアドレス
    // NFT address required to vote
    address public nftAddress;

    // 投票結果等を保存するDAO履歴のアドレス
    // DAO History address
    address private daoHistoryAddress;

    // Commissionを受け取るアドレス
    // Address to receive Commission
    address public commissionAddress;

    // 立候補者(貢献者)に割り当てられるDAOトークンの総数
    // total amount of DAO tokens to be distributed to candidates(contributors)
    uint256 public CONTRIBUTOR_ASSIGNMENT_TOKEN = 0 * (10**18);

    // 投票者に割り当てられるDAOトークンの総数
    // total amount of DAO tokens to be distributed to voters
    uint256 public VOTER_ASSIGNMENT_TOKEN = 0 * (10**18);

    // 投票時に参加できる人数
    // maximum number of people who can participate in voting
    uint256 public VOTE_MAX_PARTICIPANT = 100;

    // 手数料率
    // commission rate
    uint256 public COMMISSION_RATE = 5;

    // 立候補者のリスト
    // list of candidates
    mapping(int256 => address[]) private candidates; // pollId => [candidate1, candidate2, ...]

    // 立候補者の貢献リスト
    // list of candidates
    mapping(int256 => ContributionItem[]) private contributions; // pollId => [contribution1, contribution2, ...]

    // 投票のリスト
    // list of vote
    mapping(int256 => Vote[]) private votes; // pollId => [vote1, vote2, ...]

    // 投票の開始時間
    // Start-time of polls
    mapping(int256 => uint256) public startTimeStamp; // pollId => Timestamp for the beginning

    // 投票期間
    // Voting duration
    uint256 public votingDuration = 7 days;

    // 投票の終了時間
    // End-time of polls
    mapping(int256 => uint256) public endTimeStamp; //pollId => Timestamp for the deadline

    // 投票観点
    // perspective
    mapping(uint256 => string[]) private perspectives;

    // アクティブな投票観点
    // active perspective
    uint256 public activePerspective = 0;

    /**
     * @notice Set DAO History Address
     * @dev only owner can set DAO History Address
     */
    function setDaoHistoryAddress(address _daoHistoryAddress)
        external
        onlyOwner
    {
        daoHistoryAddress = _daoHistoryAddress;
    }

    /**
     * @notice Set POLL_ADMIN_ROLE
     * @dev only owner can set POLL_ADMIN_ROLE
     */
    function setPollAdminRole(address _address) external onlyOwner {
        _setupRole(POLL_ADMIN_ROLE, _address);
    }

    /**
     * @notice Change Perspective
     * @dev only admin can change Perspective
     */
    function changePerspective(string[] memory perspectiveTexts) external {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        perspectives[++activePerspective] = perspectiveTexts;
    }

    /**
     * @notice Set Token AND NFT Address
     * @dev only admin can set Token AND NFT Address
     */
    function setTokenAddress(address _daoTokenAddress, address _nftAddress)
        external
    {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        daoTokenAddress = _daoTokenAddress;
        nftAddress = _nftAddress;
    }

    /**
     * @notice Set CONTRIBUTOR_ASSIGNMENT_TOKEN
     * @dev only poll admin can set CONTRIBUTOR_ASSIGNMENT_TOKEN
     */
    function setAssignmentToken(uint256 _contributorToken, uint256 _voterToken)
        external
    {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        CONTRIBUTOR_ASSIGNMENT_TOKEN = _contributorToken;
        VOTER_ASSIGNMENT_TOKEN = _voterToken;
    }

    /**
     * @notice Set VOTE_MAX_PARTICIPANT
     * @dev only poll admin can set VOTE_MAX_PARTICIPANT
     */
    function setVoteMaxParticipant(uint256 _voteMaxParticipant) external {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        VOTE_MAX_PARTICIPANT = _voteMaxParticipant;
    }

    /**
     * @notice Set Voting Duration
     * @dev only poll admin can set Voting Duration
     */
    function setVotingDuration(int256 pollId, uint256 _votingDuration)
        external
    {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        votingDuration = _votingDuration;
        endTimeStamp[pollId] = startTimeStamp[pollId] + _votingDuration;
    }

    /**
     * @notice Set startTimeStamp
     * @dev only poll admin can set Commission Address
     */
    function setStartTimeStamp(int256 pollId, uint256 _startTimeStamp)
        external
    {
        require(hasRole(POLL_ADMIN_ROLE, msg.sender), "Not admin");
        startTimeStamp[pollId] = _startTimeStamp;
        endTimeStamp[pollId] = _startTimeStamp + votingDuration;
    }

    /**
     * @notice candidate to the current poll
     */
    function candidateToCurrentPoll(
        string memory contributionText,
        string[] memory evidences,
        string[] memory roles
    ) external {
        uint256 updateIndex = VOTE_MAX_PARTICIPANT + 1;
        for (
            uint256 index = 0;
            index < candidates[currentMaxPollId].length;
            index++
        ) {
            if (candidates[currentMaxPollId][index] == msg.sender) {
                updateIndex = index;
            }
        }

        if (updateIndex == (VOTE_MAX_PARTICIPANT + 1)) {
            candidates[currentMaxPollId].push(msg.sender);
            contributions[currentMaxPollId].push(
                ContributionItem(
                    contributionText,
                    evidences,
                    roles,
                    msg.sender,
                    currentMaxPollId
                )
            );
        } else {
            contributions[currentMaxPollId][updateIndex]
                .contributionText = contributionText;
            contributions[currentMaxPollId][updateIndex].evidences = evidences;
            contributions[currentMaxPollId][updateIndex].roles = roles;
        }
    }

    /**
     * @notice check if the voter has right(DAO NFT) to vote
     */
    function isEligibleToVote(address _address) public view returns (bool) {
        if (nftAddress == address(0)) {
            // Anyone can vote if no NFT address is set
            return true;
        }
        IERC721 daoToken = IERC721(nftAddress);
        return daoToken.balanceOf(_address) >= 1;
    }

    /**
     * @notice vote to the current poll.
     * @dev Voters assign points to candidates and register their votes.
     * Points are normalized to a total of 100 points.
     * A voted point for oneself will always be 0.
     */
    function vote(
        int256 _pollId,
        address[] memory _candidates,
        uint256[][] memory _points,
        string[] memory _comments
    ) external returns (bool) {
        address[] memory voters = getVoters(_pollId);

        // Check if the voter is eligible to vote
        require(isEligibleToVote(msg.sender), "not eligible to vote.");

        // Check if the candidate is not empty
        require(_candidates.length != 0, "Candidates empty.");

        // Check if the points and candidates are the same length
        require(_points.length == _candidates.length, "invalid points");

        string[] memory _perspectives = perspectives[activePerspective];
        for (uint256 index = 0; index < _candidates.length; index++) {
            // Check if the candidate is in the current poll
            require(
                Array.contains(candidates[_pollId], _candidates[index]),
                "Invalid candidate"
            );

            // Check if the points are valid
            for (uint256 i = 0; i < _perspectives.length; i++) {
                require(_points[index][i] >= 0, "Invalid points");

                // A voted point for oneself will always be 0.
                if (_candidates[index] == msg.sender) {
                    _points[index][i] = 0;
                }
            }
        }

        // Check if the voter has already voted
        uint256 voterIndex = VOTE_MAX_PARTICIPANT + 1;
        for (uint256 index = 0; index < voters.length; index++) {
            if (voters[index] == msg.sender) {
                voterIndex = index;
            }
        }

        Vote memory _vote = Vote({
            voter: msg.sender,
            candidates: _candidates,
            points: _points,
            comments: _comments,
            perspectiveId: activePerspective
        });

        if (voterIndex == VOTE_MAX_PARTICIPANT + 1) {
            // save the vote to the list of votes
            votes[_pollId].push(_vote);
        } else {
            // update the vote to the list of votes
            votes[_pollId][voterIndex] = _vote;
        }
        return true;
    }

    /**
     * @notice Settle the current poll, and start new poll
     * @dev only poll admin can execute this function and it is expected that external cron system calls this function weekly or bi-weekly.
     */
    function settleCurrentPollAndCreateNewPoll() external {
        if (!hasRole(POLL_ADMIN_ROLE, msg.sender)) {
            if (block.timestamp < endTimeStamp[currentMaxPollId]) {
                revert("Poll is not finished yet.");
            }
        }
        _settlePoll();
        _createPoll();
    }

    /**
     * @notice Settle the current poll and aggregate the result
     */
    function _settlePoll() internal {
        // Add up votes for each candidate
        address[] memory _candidates = candidates[currentMaxPollId];
        Vote[] memory _votes = votes[currentMaxPollId];
        string[] memory _perspectives = perspectives[activePerspective];

        // Aggregated data for each candidate
        Assessment[][] memory candidatesAssessments = new Assessment[][](
            _candidates.length
        );
        // Aggregate score data (total score for each viewpoint)
        uint256[] memory summedPoints = new uint256[](_candidates.length);

        for (uint256 c = 0; c < _candidates.length; c++) {
            candidatesAssessments[c] = new Assessment[](_votes.length);
            for (uint256 v = 0; v < _votes.length; v++) {
                //Skip vote whose perspective is not the latest
                if (_votes[v].perspectiveId != activePerspective) {
                    continue;
                }
                //Skip vote for oneself
                if (_votes[v].voter == _candidates[c]) {
                    continue;
                }

                candidatesAssessments[c][v] = Assessment({
                    voter: _votes[v].voter,
                    contributor: _candidates[c],
                    perspectiveId: activePerspective,
                    points: _votes[v].points[c],
                    comment: _votes[v].comments[c],
                    pollId: currentMaxPollId
                });

                for (uint256 p = 0; p < _perspectives.length; p++) {
                    if (_votes[v].candidates[c] == _candidates[c]) {
                        summedPoints[c] += _votes[v].points[c][p];
                    }
                }
            }
        }

        // Calculate the total score
        uint256 totalPoints = 0;
        for (uint256 index = 0; index < summedPoints.length; index++) {
            uint256 _points = summedPoints[index];
            totalPoints = SafeMath.add(totalPoints, _points);
        }

        if (totalPoints == 0) {
            return;
        }

        // Decide how much to distribute to Contributors
        uint256[] memory assignmentToken = new uint256[](
            candidates[currentMaxPollId].length
        );
        for (uint256 index = 0; index < _candidates.length; index++) {
            uint256 _points = summedPoints[index];
            assignmentToken[index] = SafeMath.div(
                SafeMath.mul(_points, CONTRIBUTOR_ASSIGNMENT_TOKEN),
                totalPoints
            );
        }
        _transferTokenForContributor(_candidates, assignmentToken);
        _transferTokenForCommission();

        // Decide how much to distribute to Voters
        address[] memory _voters = getVoters(currentMaxPollId);
        uint256 totalVoterCount = _voters.length;
        if (totalVoterCount > 0) {
            uint256 voterAssignmentToken = SafeMath.div(
                VOTER_ASSIGNMENT_TOKEN,
                totalVoterCount
            );
            _transferTokenForVoter(_voters, voterAssignmentToken);
        }
        //Save aggregation results in DAO History
        DAOHistory daoHistory = DAOHistory(daoHistoryAddress);
        for (uint256 c = 0; c < _candidates.length; c++) {
            ContributionItem memory contributionItem = contributions[
                currentMaxPollId
            ][c];
            DAOHistoryItem memory daoHistoryItem = DAOHistoryItem({
                contributionText: contributionItem.contributionText,
                reward: assignmentToken[c],
                rewardToken: daoTokenAddress,
                roles: contributionItem.roles,
                timestamp: block.timestamp,
                contributor: _candidates[c],
                pollId: currentMaxPollId,
                evidences: contributionItem.evidences
            });
            daoHistory.addDaoHistory(daoId, projectId, daoHistoryItem);
            daoHistory.addAssessment(
                daoId,
                projectId,
                candidatesAssessments[c]
            );
        }
    }

    /**
     * @notice start new poll
     */
    function _createPoll() internal {
        currentMaxPollId++;
        startTimeStamp[currentMaxPollId] = endTimeStamp[currentMaxPollId - 1];
        endTimeStamp[currentMaxPollId] =
            endTimeStamp[currentMaxPollId - 1] +
            votingDuration;
    }

    /**
     * @notice Transfer token to teichaku
     */
    function _transferTokenForCommission() internal {
        if (daoTokenAddress == address(0)) {
            // If the token address to be distributed is not registered, the token will not be distributed
            return;
        }
        if (commissionAddress == address(0)) {
            // If the address to be distributed is not registered, the token will not be distributed
            return;
        }

        require(
            commissionAddress != address(0),
            "commissionAddress is not set"
        );
        IWallet wallet = IWallet(commissionAddress);
        wallet.registerToken(daoTokenAddress);

        uint256 token = getCommissionToken();
        if (token > 0) {
            IERC20 tokenContract = IERC20(daoTokenAddress);
            tokenContract.transfer(commissionAddress, token);
        }
    }

    /**
     * @notice Transfer dao token for contributors
     */
    function _transferTokenForContributor(
        address[] memory to,
        uint256[] memory amount
    ) internal {
        if (daoTokenAddress == address(0)) {
            // If the token address to be distributed is not registered, the token will not be distributed
            return;
        }
        require(to.length == amount.length, "to != amount");
        IERC20 daoToken = IERC20(daoTokenAddress);
        for (uint256 index = 0; index < to.length; index++) {
            daoToken.transfer(to[index], amount[index]);
        }
    }

    /**
     * @notice transfer dao token for voters
     */
    function _transferTokenForVoter(address[] memory to, uint256 amount)
        internal
    {
        if (daoTokenAddress == address(0)) {
            // If the token address to be distributed is not registered, the token will not be distributed
            return;
        }
        IERC20 daoToken = IERC20(daoTokenAddress);
        for (uint256 index = 0; index < to.length; index++) {
            daoToken.transfer(to[index], amount);
        }
    }

    /**
     * @notice get the current poll's candidates
     */
    function getCurrentCandidates() public view returns (address[] memory) {
        return candidates[currentMaxPollId];
    }

    /**
     * @notice get the current poll's votes
     */
    function getCurrentVotes() public view returns (Vote[] memory) {
        return votes[currentMaxPollId];
    }

    /**
     * @notice get the poll's votes
     */
    function getVotes(int256 _pollId) public view returns (Vote[] memory) {
        return votes[_pollId];
    }

    /**
     * @notice get the poll's current perspective
     */
    function getCurrentPerspectives() public view returns (string[] memory) {
        return perspectives[activePerspective];
    }

    /**
     * @notice get the current poll's voters
     */
    function getVoters(int256 _pollId) public view returns (address[] memory) {
        Vote[] memory _votes = votes[_pollId];
        address[] memory _voters = new address[](_votes.length);
        for (uint256 index = 0; index < _votes.length; index++) {
            _voters[index] = _votes[index].voter;
        }
        return _voters;
    }

    /**
     * @notice get the poll detail information
     */
    function getPollDetail(int256 _pollId)
        public
        view
        returns (DetailPollItem memory)
    {
        //candidates
        ContributionItem[] memory _contributions = contributions[_pollId];
        //voters
        address[] memory _voters = getVoters(_pollId);
        //start time
        uint256 _startTimeStamp = startTimeStamp[_pollId];
        //start time
        uint256 _endTimeStamp = endTimeStamp[_pollId];
        //current perspectives
        string[] memory _perspectives = getCurrentPerspectives();

        // DetailPollItemを作成
        DetailPollItem memory _detailPoll = DetailPollItem(
            _pollId,
            _contributions,
            _voters,
            _startTimeStamp,
            _endTimeStamp,
            _perspectives
        );
        return _detailPoll;
    }

    function getPerspectives(uint256 _pollId)
        public
        view
        returns (string[] memory)
    {
        return perspectives[_pollId];
    }

    function getCommissionToken() public view returns (uint256) {
        return
            SafeMath.div(
                VOTER_ASSIGNMENT_TOKEN + CONTRIBUTOR_ASSIGNMENT_TOKEN,
                100
            ) * COMMISSION_RATE;
    }
}

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./lib/Array.sol";
import "./DAOHistory.sol";
import "./lib/SafeMath.sol";
import "./struct/poll/ContributionItem.sol";
import "./struct/poll/AbstractPollItem.sol";
import "./struct/poll/Vote.sol";
import "./struct/poll/DetailPollItem.sol";
import "./struct/assessment/Assessment.sol";
import "./struct/dao/DAOHistoryItem.sol";

contract Poll is AccessControl, Ownable, Pausable, ReentrancyGuard {
    // DAO ID
    string public daoId;
    // Project Id
    string public projectId;

    // Constructor
    constructor(string memory _daoId, string memory _projectId) {
        daoId = _daoId;
        projectId = _projectId;
    }

    // Pollを開始したり終了する権限
    // Role to start and end a Poll
    bytes32 public constant POLL_ADMIN_ROLE = keccak256("POLL_ADMIN_ROLE");

    // Poll Id
    int256 public currentMaxPollId = 0;

    // 配布するDAOトークンのアドレス
    // DAO token address to distribute
    address public daoTokenAddress;

    // 投票するのに必要なNFTのアドレス
    // NFT address required to vote
    address public nftAddress;

    // 投票結果等を保存するDAO履歴のアドレス
    // DAO History address
    address public daoHistoryAddress;

    // 立候補者(貢献者)に割り当てられるDAOトークンの総数
    // total amount of DAO tokens to be distributed to candidates(contributors)
    uint256 public CONTRIBUTOR_ASSIGNMENT_TOKEN = 7000 * (10**18);

    // 投票者に割り当てられるDAOトークンの総数
    // total amount of DAO tokens to be distributed to voters
    uint256 public VOTER_ASSIGNMENT_TOKEN = 3000 * (10**18);

    // 投票時に指定できる最大点数
    // maximum number of points that can be voted
    uint256 public VOTE_MAX_POINT = 20;

    // 投票可能かどうかの制御を行うフラグ
    // flag to control voting
    bool public votingEnabled = true;

    // 立候補者のリスト
    // list of candidates
    mapping(int256 => address[]) public candidates; // pollId => [candidate1, candidate2, ...]

    // 立候補者の貢献リスト
    // list of candidates
    mapping(int256 => ContributionItem[]) public contributions; // pollId => [contribution1, contribution2, ...]

    // 投票のリスト
    // list of vote
    mapping(int256 => Vote[]) public votes; // pollId => [vote1, vote2, ...]

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
    mapping(uint256 => string[]) public perspectives; // perspectiveId => [perspective1, perspective2, ...]

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
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Poll::changePerspective: only POLL_ADMIN_ROLE can add perspective"
        );
        perspectives[++activePerspective] = perspectiveTexts;
    }

    /**
     * @notice Set DAO Token Address
     * @dev only admin can set DAO Token Address
     */
    function setDaoTokenAddress(address _daoTokenAddress) external {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Poll::setDaoTokenAddress: only POLL_ADMIN_ROLE"
        );
        daoTokenAddress = _daoTokenAddress;
    }

    /**
     * @notice Set NFT Address
     * @dev only admin can set NFT Address
     */
    function setNftAddress(address _nftAddress) external {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Poll::setNftAddress: only POLL_ADMIN_ROLE"
        );
        nftAddress = _nftAddress;
    }

    /**
     * @notice Set CONTRIBUTOR_ASSIGNMENT_TOKEN
     * @dev only poll admin can set CONTRIBUTOR_ASSIGNMENT_TOKEN
     */
    function setContributorAssignmentToken(uint256 _contributorAssignmentToken)
        external
    {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        CONTRIBUTOR_ASSIGNMENT_TOKEN = _contributorAssignmentToken;
    }

    /**
     * @notice Set VOTER_ASSIGNMENT_TOKEN
     * @dev only poll admin can set VOTER_ASSIGNMENT_TOKEN
     */
    function setVoterAssignmentToken(uint256 _voterAssignmentToken) external {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        VOTER_ASSIGNMENT_TOKEN = _voterAssignmentToken;
    }

    /**
     * @notice Set VOTE_MAX_POINT
     * @dev only poll admin can set VOTE_MAX_POINT
     */
    function setVoteMaxPoint(uint256 _voteMaxPoint) external {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        VOTE_MAX_POINT = _voteMaxPoint;
    }

    /**
     * @notice Set VOTE_MAX_POINT
     * @dev only poll admin can set VOTE_MAX_POINT
     */
    function setVotingEnabled(int256 pollId, bool _votingEnabled) external {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        //TODO: pollIdごとにフラグを設定できるようにする
        votingEnabled = _votingEnabled;
    }

    /**
     * @notice Set Voting Duration
     * @dev only poll admin can set Voting Duration
     */
    function setVotingDuration(int256 pollId, uint256 _votingDuration)
        external
    {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        votingDuration = _votingDuration;
        endTimeStamp[pollId] = startTimeStamp[pollId] + _votingDuration;
    }

    /**
     * @notice candidate to the current poll
     */
    function candidateToCurrentPoll(
        string memory contributionText,
        string[] memory evidences,
        string[] memory roles // TODO: NFTから取得する
    ) external whenNotPaused {
        uint256 updateIndex = 999;
        for (
            uint256 index = 0;
            index < candidates[currentMaxPollId].length;
            index++
        ) {
            if (candidates[currentMaxPollId][index] == msg.sender) {
                updateIndex = index;
            }
        }

        //TODO: get role info from NFT

        if (updateIndex == 999) {
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
    ) external whenNotPaused returns (bool) {
        // Check if votig is enabled
        require(
            votingEnabled,
            "Voting is not enabled right now. Contact the admin to start voting."
        );

        address[] memory voters = getVoters(_pollId);

        // Check if the voter is eligible to vote
        require(isEligibleToVote(msg.sender), "You are not eligible to vote.");

        // Check if the candidate is not empty
        require(_candidates.length != 0, "Candidates must not be empty.");

        // Check if the points and candidates are the same length
        require(
            _points.length == _candidates.length,
            "The number of points is not valid."
        );

        string[] memory _perspectives = perspectives[activePerspective];
        for (uint256 index = 0; index < _candidates.length; index++) {
            // Check if the candidate is in the current poll
            require(
                Array.contains(candidates[_pollId], _candidates[index]),
                "The candidate is not in the current poll."
            );

            // Check if the points are valid
            for (uint256 i = 0; i < _perspectives.length; i++) {
                require(
                    _points[index][i] >= 0,
                    "The points are not valid. (0 <= points)"
                );
                require(
                    _points[index][i] <= VOTE_MAX_POINT,
                    "The points are not valid. (points < VOTE_MAX_POINT)"
                );

                // A voted point for oneself will always be 0.
                if (_candidates[index] == msg.sender) {
                    _points[index][i] = 0;
                }
            }
        }

        // Check if the voter has already voted
        //FIX: 999を止める。もしくは投票の最大数をチェックする
        uint256 voterIndex = 999;
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

        if (voterIndex == 999) {
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
    function settleCurrentPollAndCreateNewPoll()
        external
        whenNotPaused
        nonReentrant
    {
        require(
            hasRole(POLL_ADMIN_ROLE, msg.sender),
            "Caller is not a poll admin"
        );
        _settlePoll();
        _createPoll();
    }

    /**
     * @notice Settle the current poll and aggregate the result
     */
    function _settlePoll() internal {
        // TODO: 最新のpollIdではなく、指定したpollIdを使うようにする
        // Add up votes for each candidate
        address[] memory _candidates = candidates[currentMaxPollId];
        Vote[] memory _votes = votes[currentMaxPollId];
        string[] memory _perspectives = perspectives[activePerspective];

        // candidateごとの集計データ
        Assessment[][] memory candidatesAssessments = new Assessment[][](
            _candidates.length
        );
        // スコアの集計データ(各観点を集計したスコアの合計)
        uint256[] memory summedPoints = new uint256[](_candidates.length);

        for (uint256 c = 0; c < _candidates.length; c++) {
            candidatesAssessments[c] = new Assessment[](_votes.length);
            for (uint256 v = 0; v < _votes.length; v++) {
                //評価観点が最新でないものはスキップ
                if (_votes[v].perspectiveId != activePerspective) {
                    continue;
                }
                //自分の評価はスキップ
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

        // Decide how much to distribute to Contributors
        uint256 totalPoints = 0;
        for (uint256 index = 0; index < summedPoints.length; index++) {
            uint256 _points = summedPoints[index];
            totalPoints = SafeMath.add(totalPoints, _points);
        }

        uint256[] memory assignmentToken = new uint256[](
            candidates[currentMaxPollId].length
        );
        if (totalPoints > 0) {
            for (uint256 index = 0; index < _candidates.length; index++) {
                uint256 _points = summedPoints[index];
                assignmentToken[index] = SafeMath.div(
                    SafeMath.mul(_points, CONTRIBUTOR_ASSIGNMENT_TOKEN),
                    totalPoints
                );
            }
            _mintTokenForContributor(_candidates, assignmentToken);
        }

        // Decide how much to distribute to Voters
        address[] memory _voters = getVoters(currentMaxPollId);
        uint256 totalVoterCount = _voters.length;
        if (totalVoterCount > 0) {
            uint256 voterAssignmentToken = SafeMath.div(
                VOTER_ASSIGNMENT_TOKEN,
                totalVoterCount
            );
            _mintTokenForVoter(_voters, voterAssignmentToken);
        }

        endTimeStamp[currentMaxPollId] = block.timestamp;

        //集計結果をDAO Historyに保存する
        DAOHistory daoHistory = DAOHistory(daoHistoryAddress);
        for (uint256 c = 0; c < _candidates.length; c++) {
            ContributionItem memory contributionItem = contributions[
                currentMaxPollId
            ][c];
            DAOHistoryItem memory daoHistoryItem = DAOHistoryItem({
                contributionText: contributionItem.contributionText,
                reward: assignmentToken[c],
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
        startTimeStamp[currentMaxPollId] = block.timestamp;
        endTimeStamp[currentMaxPollId] = block.timestamp + votingDuration;
    }

    /**
     * @notice Mint dao token for contributors
     */
    function _mintTokenForContributor(
        address[] memory to,
        uint256[] memory amount
    ) internal {
        if (daoTokenAddress == address(0)) {
            // If the token address to be distributed is not registered, the token will not be distributed
            return;
        }
        require(
            to.length == amount.length,
            "to and amount must be same length"
        );
        IERC20 daoToken = IERC20(daoTokenAddress);
        for (uint256 index = 0; index < to.length; index++) {
            daoToken.transfer(to[index], amount[index]);
        }
    }

    /**
     * @notice Mint dao token for voters
     */
    function _mintTokenForVoter(address[] memory to, uint256 amount) internal {
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
     * @notice get the poll's perspective
     */
    function getPerspectives(uint256 _perspectiveId)
        public
        view
        returns (string[] memory)
    {
        return perspectives[_perspectiveId];
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
     * @notice get the current active poll information list
     */
    function getActivePolls() public view returns (AbstractPollItem[] memory) {
        Vote[] memory _votes = votes[currentMaxPollId];
        address[] memory _candidates = candidates[currentMaxPollId];
        uint256 timestamp = startTimeStamp[currentMaxPollId];
        AbstractPollItem memory _polls = AbstractPollItem(
            currentMaxPollId,
            _votes.length,
            _candidates.length,
            timestamp
        );

        //TODO: 複数のアクティブなPollがある場合に対応する
        AbstractPollItem[] memory _pollsArray = new AbstractPollItem[](1);
        _pollsArray[0] = _polls;
        return _pollsArray;
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
        uint256 startTimeStamp = startTimeStamp[_pollId];
        //start time
        uint256 endTimeStamp = endTimeStamp[_pollId];
        //current perspectives
        string[] memory _perspectives = getCurrentPerspectives();

        // DetailPollItemを作成
        DetailPollItem memory _detailPoll = DetailPollItem(
            _pollId,
            _contributions,
            _voters,
            startTimeStamp,
            endTimeStamp,
            _perspectives
        );
        return _detailPoll;
    }

    /**
     * @notice pause the contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}

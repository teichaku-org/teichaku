import { Assessment } from "@/domains/Assessment";
import { AssessmentListAtom } from "@/domains/atoms/AssessmentListAtom";
import { PollContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { DaoHistoryListAtom } from "@/domains/atoms/DaoHistoryListAtom";
import { DaoInfoAtom } from "@/domains/atoms/DaoInfoAtom";
import { DAOHistory } from "@/types";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import artifact from "../../abi/DAOHistory.sol/DAOHistory.json";
import useMetaMask, {
  getContract,
  getContractWithSigner
} from "../web3/useMetaMask";

interface Props {
  daoId: string
  projectId: string
}

export default (props: Props) => {
  const daoId = props.daoId
  const projectId = props.projectId
  const [daoHistory, setDaoHistory] = useAtom(DaoHistoryListAtom);
  const [assessments, setAssessments] = useAtom(AssessmentListAtom);
  const [daoInfo, setDaoInfo] = useAtom(DaoInfoAtom);
  const [pollContractAddress, setPollContractAddress] = useAtom(PollContractAddress)
  const { address } = useMetaMask();

  const contractAddress = process.env
    .NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string;
  const contract = getContract(contractAddress, artifact.abi) as DAOHistory;
  const contractWithSigner = getContractWithSigner(
    contractAddress,
    artifact.abi
  ) as DAOHistory;


  const load = async () => {
    contract.functions.pollAddress(daoId, projectId).then((res) => {
      setPollContractAddress(res[0])
    })
    contract.functions.getDaoHistory(daoId, projectId).then((res) => {
      const _daoHistory = res[0].map((d) => {
        return {
          contributionText: d.contributionText,
          reward: Number(ethers.utils.formatEther(d.reward)),
          roles: d.roles,
          timestamp: new Date(Number(d.timestamp) * 1000),
          contributor: d.contributor,
          pollId: Number(d.pollId),
          evidences: d.evidences
        };
      });
      setDaoHistory(_daoHistory);
    });
    contract.functions.getDaoAssessments(daoId, projectId).then((res) => {
      const _assessments: Assessment[] = res[0].map((d) => {
        return {
          voter: d.voter,
          contributor: d.contributor,
          points: d.points.map(p => p.toNumber()),
          comment: d.comment,
          perspectiveId: d.perspectiveId.toNumber(),
          pollId: d.pollId.toNumber()
        };
      });
      setAssessments(_assessments);
    });
    contract.functions.getDaoInfo(daoId).then((res) => {
      setDaoInfo(res[0]);
    });
  }

  return {
    daoHistory,
    assessments,
    daoInfo,
    load
  };
};

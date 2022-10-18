import { Assessment } from "@/domains/Assessment";
import { DaoHistory } from "@/domains/DaoHistory";
import { DAOHistory } from "@/types";
import { AssessmentStructOutput, DAOHistoryItemStructOutput, DAOInfoStructOutput } from "@/types/DAOHistory";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import artifact from "../../abi/DAOHistory.sol/DAOHistory.json";
import useMetaMask, {
  getContract,
  getContractWithSigner,
} from "../web3/useMetaMask";

export default () => {
  const [daoHistory, setDaoHistory] = useState<DAOHistoryItemStructOutput[]>(
    []
  );
  const [assessments, setAssessments] = useState<AssessmentStructOutput[]>(
    []
  );
  const [daoInfo, setDaoInfo] = useState<DAOInfoStructOutput>();
  const { address } = useMetaMask();

  const contractAddress = process.env
    .NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string;
  const contract = getContract(contractAddress, artifact.abi) as DAOHistory;
  const contractWithSigner = getContractWithSigner(
    contractAddress,
    artifact.abi
  ) as DAOHistory;

  useEffect(() => {
    //TODO: daoIdとprojectIdをURLなど外部から取得する
    contract.functions.getDaoHistory("demo", "season1").then((res) => {
      setDaoHistory(res[0]);
    });
    contract.functions.getDaoAssessments("demo", "season1").then((res) => {
      setAssessments(res[0]);
    });
    contract.functions.getDaoInfo("demo").then((res) => {
      setDaoInfo(res[0]);
    });
  }, [address]);

  const _daoHistory: DaoHistory[] = daoHistory.map((d) => {
    return {
      contributionText: d.contributionText,
      reward: Number(ethers.utils.formatEther(d.reward)),
      roles: d.roles,
      timestamp: new Date(Number(d.timestamp) * 1000),
      contributor: d.contributor,
    };
  });
  const _assessments: Assessment[] = assessments.map((d) => {
    return {
      voter: d.voter,
      contributor: d.contributor,
      points: d.points.map(p => p.toNumber()),
      comment: d.comment,
      perspectiveId: d.perspectiveId.toNumber(),
      pollId: d.pollId.toNumber()
    };
  });
  return {
    daoHistory: _daoHistory,
    assessments: _assessments,
  };
};

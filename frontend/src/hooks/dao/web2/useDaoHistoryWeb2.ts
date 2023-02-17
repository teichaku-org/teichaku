import { AssessmentListAtom } from "@/domains/atoms/AssessmentListAtom";
import { DaoHistoryListAtom } from "@/domains/atoms/DaoHistoryListAtom";
import { DaoInfoAtom } from "@/domains/atoms/DaoInfoAtom";
import { useAtom } from "jotai";
import { useDaoHistoryInterface } from "../interface/useDaoHistoryInterface";

interface Props {
  daoId: string
  projectId: string
}

const useDaoHistoryWeb2: useDaoHistoryInterface = (props: Props) => {
  const daoId = props.daoId
  const projectId = props.projectId
  const [daoHistory, setDaoHistory] = useAtom(DaoHistoryListAtom);
  const [assessments, setAssessments] = useAtom(AssessmentListAtom);
  const [daoInfo, setDaoInfo] = useAtom(DaoInfoAtom);

  const load = async () => {

  }

  return {
    daoHistory,
    assessments,
    daoInfo,
    load
  };
};

export default useDaoHistoryWeb2
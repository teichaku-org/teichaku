import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import { APIClient } from "@/types/APIClient";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useWeb3CheckInterface } from "./interface/useWeb3CheckInterface";
import { useDaoExistCheck } from "./useDaoExistCheck";
import { useDaoLoad } from "./useDaoLoad";

const useWeb3Check: useWeb3CheckInterface = async (props: {
  daoId: string;
  projectId: string;
}) => {
  const [isWeb3, setIsWeb3] = useAtom(Web3FlagAtom);
  const apiClient = new APIClient();

  useEffect(() => {
    // daoがweb3かどうか確認
    apiClient.post("/getIsWeb3", { daoId: props.daoId }).then((res) => {
      if (res) {
        setIsWeb3(res.data);
      }
    });
  }, []);
};

export default useWeb3Check;

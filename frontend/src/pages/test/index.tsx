import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import artifact from "@/abi/DAOToken.sol/DAOToken.json";

const contractAddress = process.env
  .NEXT_PUBLIC_DAOTOKEN_CONTRACT_ADDRESS as string;

const Test: NextPage = () => {
  const [total, setTotal] = useState(0);

  const getProvider = () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    return provider;
  };

  const getContract = (contractAddress: string, abi: any) => {
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract;
  };

  useEffect(() => {
    const contract = getContract(contractAddress, artifact.abi);
    const { totalSupply } = contract.functions;

    const getTotal = async () => {
      const totalSupplyOfDAOToken = await totalSupply();
      console.log(totalSupplyOfDAOToken);
      setTotal(Number(ethers.utils.formatEther(totalSupplyOfDAOToken[0])));
    };
    getTotal();
  }, []);

  return (
    <div>
      <h1>トークン総発行数：{total}</h1>
    </div>
  );
};

export default Test;

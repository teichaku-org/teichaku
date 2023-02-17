import useWeb3Auth from "@/hooks/web3/useWeb3Auth";
import { useLocale } from "@/i18n/useLocale";
import { Button } from "@mantine/core";

export const ConnectWallet = () => {
  const { login } = useWeb3Auth();
  const { t } = useLocale();
  return (
    <>
      <Button variant="gradient" gradient={{ from: "blue", to: "grape" }} onClick={login}>
        {t.Button.ConnectWallet}
      </Button>
    </>

  );
};

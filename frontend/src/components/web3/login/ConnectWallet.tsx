import useMetaMask from "@/hooks/web3/useMetaMask";
import { useLocale } from "@/i18n/useLocale";
import { Button } from "@mantine/core";

export const ConnectWallet = () => {
  const { login } = useMetaMask();
  const { t } = useLocale();
  return (
    <Button variant="gradient" gradient={{ from: "blue", to: "grape" }} onClick={login}>
      {t.Button.ConnectWallet}
    </Button>
  );
};

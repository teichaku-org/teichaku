import useMetaMask from "@/hooks/web3/useMetaMask";
import useWeb3Auth from "@/hooks/web3/useWeb3Auth";
import { useLocale } from "@/i18n/useLocale";
import { Button } from "@mantine/core";


interface Props {
  isMetamaskOnly?: boolean;
  onLogin?: () => void;
}
export const ConnectWallet = (props: Props) => {
  const { login } = useWeb3Auth();
  const {login: loginOnMetamask} = useMetaMask()
  const { t } = useLocale();
  const onClickLogin = async () => {
    if(props.isMetamaskOnly) {
      if(loginOnMetamask) await loginOnMetamask()
      else {
        // Metamaskが入っていないのでログインを促す
        alert(t.Alert.PleaseInstallMetamask)
      }
    } else {
      await login()
    }
    if(props.onLogin) {
      props.onLogin()
    }
  }

  return (
    <>
      <Button variant="gradient" gradient={{ from: "blue", to: "grape" }} 
      onClick={onClickLogin}>
        {t.Button.ConnectWallet}
      </Button>
    </>

  );
};

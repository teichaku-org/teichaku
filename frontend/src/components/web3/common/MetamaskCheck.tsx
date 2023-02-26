export const MetamaskCheck = (props: { isWeb3: boolean }) => {
  if (!props.isWeb3) {
    return <div />
  }

  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  const metamaskErrorRender = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div>画面を表示するにはMetaMaskが必要です。</div>
        <div>MetaMaskのインストールをお願いします。</div>
        <div>またiOS/AndroidはMetaMaskのブラウザからアクセスしてください。</div>
        <div>
          Desktop:{" "}
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja">
            Chrome MetaMaskインストールページ
          </a>
        </div>
        <div>
          iOS:{" "}
          <a href="https://apps.apple.com/jp/app/metamask-blockchain-wallet/id1438144202">
            iOS MetaMaskインストールページ
          </a>
        </div>
        <div>
          Android:{" "}
          <a href="https://play.google.com/store/apps/details?id=io.metamask&hl=ja&gl=US">
            Android MetaMaskインストールページ
          </a>
        </div>
      </div>
    )
  }

  if (!isMetaMaskInstalled()) {
    return metamaskErrorRender()
  }
  return <div />
}

# tokyo-web3-hackathon

# 基本情報

## URL

https://teichaku.vercel.app/

### 動作前提

- MetaMask がインストールされている Chrome(PC)もしくは Metamask の内蔵ブラウザ(Smartphone)
- Etherium Goerli の ETH を持っている

## 使用した tech stacks

### Backend

フルオンチェーン！

- Solidity
- Hardhat
- OpenZeppelin
- Polygon(Mumbai Testnet)

### Frontend

- Next.js
- Ethers.js
- Mantine UI
- nivo (Chart tool)

## deploy した Contract

| コントラクト名 | 概略                                                     | コントラクトアドレス(Polygon Mumbai)       |
| -------------- | -------------------------------------------------------- | ------------------------------------------ |
| DAOHistory     | DAO における活動(貢献・投票)の情報を保持する。           | 0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75 |
| PollFactory    | Poll コントラクトを作成する。DAOHistory から呼び出す。   | 0x476684620C5Dee01A411bc776D511f7081FF47b5 |
| Poll           | 投票・集計・トークン分配を行う。                         | 0x7D31878Af5390930FDc95370364ef2a4328dA639 |
| DAOToken       | 分配する ERC20 のトークン(デモ用)                        | 0xeCC7Bb4cf28Dc6fe99A9f0Fb0AdFD5a2E0F7707A |
| DAONFT         | 複数アカウントによる不正投票を防止するための SBT(デモ用) | TBD                                        |

※ Poll コントラクトは Teichaku で DAO を作成するたびに生成されます。

## テスト手順

```
npm ci
npm run test
```

## application code やその他の file

- /contracts/DAOHistory.sol
  - Teichaku に関わるデータが保存される
- /contracts/PollFactory.sol
  - 投票コントラクトを作成する。イーサリアムのサイズ制限回避のため、DAOHistory から切り離している
- /contracts/Poll.sol
  - 投票コントラクト。受付・集計・トークン分配まで行う。
- /scripts
  - デプロイコードなどのスクリプト
- /test
  - 単体テスト
- /frontend
  - フロントエンド

# 以下開発用のドキュメント

※ secrets_template.ts を secrets.ts にリネームする。ファイルの中身は変更する必要はない。

### blockchain のローカル起動

```
npm ci
npm run node
```

#### ※mainnet からフォークし blockchain をローカル起動する場合は以下

```
npm ci
npm run node -- --fork <infura.ioなどから取得したネットワークエンドポイント>
```

- `.env.local`の各アドレスについてコントラクト作成時の出力結果に応じて修正する必要有

### コントラクトのローカルデプロイ

```
npm run dev
```

### frontend のローカル起動

```
cd frontend
npm ci
npm run dev
```

# 開発用ドキュメント

## 型の自動生成

```
npm run generate
```

## Shibuya テストネットへのデプロイ

前提条件: secrets.ts を準備する
faucet: https://docs.astar.network/docs/build/environment/faucet/

以下コマンドを実行する。

```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/deploy-test1.ts --network shibuya
```

※ .env ファイルおよび vercel の環境変数のコントラクトアドレスを修正する。
NEXT_PUBLIC_EXPECTED_NETWORK = 'Aster Shibuya Testnet'
NEXT_PUBLIC_EXPECTED_NETWORK_CHAIN_ID = '0x51'
NEXT_PUBLIC_EXPECTED_NETWORK_RPC_URL = 'https://evm.shibuya.astar.network/'

## Mumbai テストネットへのデプロイ

前提条件: secrets.ts を準備する

以下コマンドを実行する。

```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/deploy-test1.ts --network maticmum
```

※ .env ファイルおよび vercel の環境変数のコントラクトアドレスを修正する。

## Goerli テストネットへのデプロイ

前提条件: secrets.ts を準備する

以下コマンドを実行する。

```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/deploy-test1.ts --network goerli
```

※ .env ファイルおよび vercel の環境変数のコントラクトアドレスを修正する。

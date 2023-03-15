# サービスURL

| Network | URL |
| --- | --- |
| Etherium Goerli | https://teichaku.vercel.app/ |
| Aster Shibuya | ~~https://hackathon.yunomy.com/~~ (Web3Auth not working, please use Goerli) |


## 前提

- MetaMask がインストールされている Chrome(PC)もしくは Metamask の内蔵ブラウザ(Smartphone)
- Etherium Goerli の ETH を持っている

## tech stacks

### Backend

Web3
- Solidity
- Hardhat
- OpenZeppelin

Web2
- Node.js(TypeScript)
- Firebase Functions
- Firestore

### Frontend

- Next.js
- Ethers.js
- Mantine UI
- nivo (Chart tool)

## deploy した Contract

| コントラクト名 | 概略                                                     | 
| -------------- | -------------------------------------------------------- | 
| DAOLauncher         |  DAOを立ち上げるための初期化用コントラクト |
| DAOHistory     | DAO における活動(貢献・投票)の情報を保持する。           | 
| PollFactory    | Poll コントラクトを作成する。   | 
| Poll           | 投票・集計・トークン分配を行う。                         | 
| DAOToken       | 分配する ERC20 のトークン(デモ用)                        | 
| DAONFT         | 複数アカウントによる不正投票を防止するための SBT(デモ用) |
| Wallet         |  手数料を徴収するためのコントラクトウォレット |


※ Poll コントラクトは Teichaku で DAO を作成するたびに生成されます。



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

### Firebase のローカル起動

```
firebase emulators:start
```

## テスト実行

```
npm ci
npm run test
```

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

# tokyo-web3-hackathon

# 基本情報
## URL
https://tokyo-web3.vercel.app/

### 前提条件
- MetaMaskがインストールされているChrome(PC)もしくはMetamaskの内蔵ブラウザ(Smartphone)

## 使用したtech stacks
### Backend
フルオンチェーン！
* Solidity
* Hardhat
* OpenZeppelin
* Polygon(Mumbai Testnet)
### Frontend
* Next.js
* Ethers.js
* Mantine UI
* nivo (Chart tool)

## deployしたContract

| コントラクト名  | 概略 | コントラクトアドレス(Mumbai) | 
| ------------- | ------------- | ------------- |
| DAOHistory  | DAOにおける活動(貢献・投票)の情報を保持する。  |  TBD |
| PollFactory  | Pollコントラクトを作成する。DAOHistoryから呼び出す。  | TBD  |
| Poll  | 投票・集計・トークン分配を行う。  | TBD  |
| DAOToken  | 分配するERC20のトークン(デモ用)  | TBD  |
| DAONFT  | 複数アカウントによる不正投票を防止するためのSBT(デモ用)  | TBD  |

## テスト手順

```
npm run test
```

## application codeやその他のfile

### blockchainのローカル起動
```
npm ci
npm run node
```

### コントラクトのローカルデプロイ
```
npm run dev
```
### frontendのローカル起動
```
cd frontend
npm ci
npm run dev
```

## デモ
(予定) 新しくDAOを作る方法の掲載

# 開発用ドキュメント
## 型の自動生成
```
npm run generate
```

## DAOをローカルに追加する
```
npx hardhat run scripts/create-dao/0_create-new-dao-demo.ts --network localhost
```

## Mumbaiテストネットへのデプロイ
前提条件: secrets.tsを準備する

以下コマンドを実行する。deploy-test2を実行する前にコントラクトアドレスを設定する。
```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/deploy-test1.ts --network maticmum
npx hardhat run scripts/deploy-test2.ts --network maticmum
```

※ .envファイルおよびvercelの環境変数のコントラクトアドレスを修正する。


## MumbaiテストネットでDAOを作る
各ファイルの設定値をきちんとセットした上で、以下コマンドを実行する
```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/create-dao/0_create-new-dao-demo.ts --network maticmum
npx hardhat run scripts/create-dao/1_set-token.ts --network maticmum
npx hardhat run scripts/create-dao/2_send-token.ts --network maticmum
npx hardhat run scripts/create-dao/3_change-perspective.ts --network maticmum
```
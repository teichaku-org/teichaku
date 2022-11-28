# tokyo-web3-hackathon

# 基本情報
## URL
https://tokyo-web3.vercel.app/

### 動作前提
- MetaMaskがインストールされているChrome(PC)もしくはMetamaskの内蔵ブラウザ(Smartphone)
- Polygon MumbaiのMATICを持っている (https://mumbaifaucet.com/ から取得お願いします)


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

| コントラクト名  | 概略 | コントラクトアドレス(Polygon Mumbai) | 
| ------------- | ------------- | ------------- |
| DAOHistory  | DAOにおける活動(貢献・投票)の情報を保持する。  |  0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75 |
| PollFactory  | Pollコントラクトを作成する。DAOHistoryから呼び出す。  | 0x476684620C5Dee01A411bc776D511f7081FF47b5  |
| Poll  | 投票・集計・トークン分配を行う。  | 0x7D31878Af5390930FDc95370364ef2a4328dA639  |
| DAOToken  | 分配するERC20のトークン(デモ用)  | 0xeCC7Bb4cf28Dc6fe99A9f0Fb0AdFD5a2E0F7707A  |
| DAONFT  | 複数アカウントによる不正投票を防止するためのSBT(デモ用)  | TBD  |

※ PollコントラクトはTeichakuでDAOを作成するたびに生成されます。

## テスト手順

```
npm ci
npm run test
```

## application codeやその他のfile

* /contracts/DAOHistory.sol
  * Teichakuに関わるデータが保存される
* /contracts/PollCreator.sol
  * 投票コントラクトを作成する。イーサリアムのサイズ制限回避のため、DAOHistoryから切り離している
* /contracts/Poll.sol
  * 投票コントラクト。受付・集計・トークン分配まで行う。
* /scripts
  * デプロイコードなどのスクリプト
* /test
  * 単体テスト
* /frontend
  * フロントエンド
 



# 以下開発用のドキュメント
※ secrets_template.tsをsecrets.tsにリネームする。ファイルの中身は変更する必要はない。
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

# tokyo-web3-hackathon

# 基本情報
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

| コントラクト名  | 概略 | コントラクトアドレス | 
| ------------- | ------------- | ------------- |
| DAOHistory  | DAOにおける活動(貢献・投票)の情報を保持する。  | Content Cell  |
| Content Cell  | Content Cell  | Content Cell  |

・application codeやその他のfile
・テスト手順を含むリポジトリへのリンク
・審査やテストのためにプロジェクトにアクセスする方法など





# ローカル開発の手順
ノードを立ち上げコントラクトをデプロイする。

## メタマスクに以下のアドレスを追加する
名前: Hardhat Account#0
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

※ このアカウントのメインネットにETHを送ったりすると、他の人もアクセスできるので、注意してください。あくまでもローカル開発の時のみ使ってください。

## ノードの立ち上げ

```
$ npm run node
```

## ローカルへコントラクトをデプロイ

```
$ npm run dev
```

## フロントエンドの立ち上げ

```
cd frontend
npm run dev
```

メタマスクの接続先がローカルになっていることを確認する。

## コントラクトの単体テスト

```
$ npm run test
```

## 型の自動生成
```
npm run generate
```

## Mumbaiテストネットへのデプロイ
前提条件: secrets.tsを準備する

以下コマンドを実行する
```
export PRIVATE_KEY=<0xウォレットの秘密鍵を入れる>
npx hardhat run scripts/deploy-test1.ts --network maticmum
npx hardhat run scripts/deploy-test2.ts --network maticmum
npx hardhat run scripts/demo-test.ts --network maticmum
```
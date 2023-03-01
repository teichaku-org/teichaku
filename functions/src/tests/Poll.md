# テスト手順

## DAO(Poll)の作成

http://127.0.0.1:5001/teichaku-fa2a9/asia-northeast1/addDao

```
{
    "daoId": "MyDaoId",
    "projectId": "MyProject",
    "name": "MyDaoName",
    "description": "MyDaoDescription",
    "website": "MyWebsite",
    "logo": "https://---"
}
```

## 立候補

http://127.0.0.1:5001/teichaku-fa2a9/asia-northeast1/candidateToCurrentPoll

```
{
      "daoId": "MyDaoId",
      "projectId": "MyProject",
      "contributionText": "こんなことやったよ",
      "evidences": ["https://---", "https://---"],
      "roles": ["role1", "role2"]
}
```

→ 2 回実行しアドレスを candidate1, candidate2 にかえる

## 投票

http://127.0.0.1:5001/teichaku-fa2a9/asia-northeast1/vote

```
{
      "daoId": "MyDaoId",
      "projectId": "MyProject",
      "pollId": 1,
      "candidates": ["candidate1", "candidate2"],
      "points": [[1, 2,3], [3, 4,4]],
      "comments": ["comment1", "comment2"]
}
```

## 締め切り

http://127.0.0.1:5001/teichaku-fa2a9/asia-northeast1/settleCurrentPollAndCreateNewPoll

```
{
      "daoId": "MyDaoId",
      "projectId": "MyProject"
}
```

const path = require('path')

// 웹 서버를 실행합니다. --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
// body-parser를 사용합니다.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// API를 정의합니다.
app.get('/api/distributions', (req, res) => {
  console.log('Req. distributions: ' + req.params.distName)
  res.json([{"name":"TestDist","updatePolicy":null},
  {"name":"WookDist","updatePolicy":null},
  {"name":"WhatTheFuck","updatePolicy":null}])
})

app.get('/api/distributions/:distName/snapshots', (req, res) => {
  console.log('Req. distributions: ' + req.params.distName)
  res.json([
    {"name":"TestDist_20180223194646",
    "createTime":"20180223194646",
    "parentSnapshotName":"",
    "status":"unstable",
    "tag":"none",
    "updatedServiceList":["dep-cd"],
    "user":"sm.art.kim"},
    {"name":"TestDist_20180223194916",
    "createTime":"20180223194916",
    "parentSnapshotName":"TestDist_20180223194646",
    "status":"unstable",
    "tag":"none",
    "updatedServiceList":["dep-cd"],
    "user":"Hong-gildong"},
    {"name":"TestDist_20180223194917",
    "createTime":"20180223194917",
    "parentSnapshotName":"TestDist_20180223194916",
    "status":"unstable",
    "tag":"none",
    "updatedServiceList":["dep-cd"],
    "user":"Hong-gildong"},
    {"name":"TestDist_20180223200319",
    "createTime":"20180223200319",
    "parentSnapshotName":"TestDist_20180223194917",
    "status":"unstable",
    "tag":"none",
    "user":"sm.art.kim"},
    {"name":"TestDist_20180223200323",
    "createTime":"20180223200323",
    "parentSnapshotName":"TestDist_20180223200319",
    "status":"unstable",
    "tag":"none",
    "updatedServiceList":["dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place","dep-cd", "market-place"],
    "user":"sm.art.kim"}
  ])
})

app.get('/api/distributions/:distName/snapshots/:snapshotName', (req, res) => {
  console.log('Req. snapshotName: ' + req.params.snapshotName)
  res.json(
    {"name":"TestDist_20180223194646",
    "createTime":"20180223194646",
    "updatedServices":["dep-cd"],
    "parentSnapshotName":"",
    "status":"unstable",
    "tag":"none",
    "user":"sm.art.kim",
    "services":[
      {"name":"dep-cd",
      "version":"20180223194647",
      "deployType":"playbook",
      "deployFileName":"dep-cd-20180223194647.tar.gz",
      "deployJenkinsFileName":"",
      "envVariableFileName":"",
      "automatedTestFileName":"",
      "automatedTestFramework":"",
      "dependencies":[],
      "artifacts":[
        {"maven/com.dep.cd/dep-cd":"20180223194647"}
      ]}
    ]
  }
  )
})

// public 디렉터리를 공개합니다. --- (※5)
app.use('/', express.static('./build'))
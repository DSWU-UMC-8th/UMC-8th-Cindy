// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors";
import { handleMemberSignUp, handleListMemberReivews } from "./controllers/member.controller.js";
import { handleStoreRegister, handleReviewWrite, handleListStoreReviews} from './controllers/store.controller.js';
import { handleMissionChallenge, handleListStoreMissions, handleListMemberMissions } from './controllers/mission.controller.js';
const app = express()

dotenv.config(); // .env파일을 읽어와서 process.env에 저장
const port = process.env.PORT;

console.log("현재 포트:", process.env.PORT);

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); //단순 객체 문자열 형태로 본문 데이터 해석 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/member", handleMemberSignUp); 
app.post("/api/store", handleStoreRegister); 
app.post("/api/review", handleReviewWrite);
app.post("/api/mission/challenge", handleMissionChallenge); 
app.get("/api/store/:storeId/reviews", handleListStoreReviews); // 가게 리뷰 조회
app.get("/api/member/reviews", handleListMemberReivews); // 사용자 리뷰 조회 
app.get("/api/store/:storeId/missions", handleListStoreMissions); // 특정 가게의 미션 목록 조회 (query string: cursor)
app.get("/api/member/missions", handleListMemberMissions); // 사용자 미션 목록 조회  (query string: status(진행완료, 진행중))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
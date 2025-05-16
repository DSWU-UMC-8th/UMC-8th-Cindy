// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors";
// swagger 세팅 
import swaggerAutogen from "swagger-autogen" 
import swaggerUiExpress from "swagger-ui-express"


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


// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success});
  };

  res.error = ({errorCode = "unknown", reason = null, data = null}) => {
    return res.json({
      resultType: "FAIL",
      resultType: "FAIL",
      error: {errorCode, reason, data},
      success: null,
    });
  };
  next();
});

// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


// swagger 세팅 
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


app.post("/api/member", handleMemberSignUp); // 회원가입
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
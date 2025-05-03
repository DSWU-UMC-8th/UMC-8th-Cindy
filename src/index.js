// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreRegister } from './controllers/store.controller.js';
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

app.post("/api/user", handleUserSignUp); // 해당 url로 post요청이 들어오면 handleUserSignUp함수 실행
app.post("/api/store", handleStoreRegister); // 해당 url로 post요청이 들어오면 handleUserSignUp함수 실행

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview } from "../dtos/store.dto.js"; 
import { storeRegister, reviewWrite } from "../services/store.service.js";

export const handleStoreRegister = async (req, res, next) => {
  console.log("가게 등록을 요청했습니다!");
  console.log("body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).json({result: store});
}

export const handleReviewWrite = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!"); 
  console.log("body:", req.body);

  const review = await reviewWrite(bodyToReview(req.body)); 
  res.status(StatusCodes.OK).json({result: review});
}
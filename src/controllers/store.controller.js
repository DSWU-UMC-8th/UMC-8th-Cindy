import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview } from "../dtos/store.dto.js"; 
import { storeRegister, reviewWrite } from "../services/store.service.js";


export const handleStoreRegister = async (req, res, next) => {
  console.log("가게 등록을 요청했습니다!");
  console.log("[storeController] request body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).json({result: store});
}

export const handleReviewWrite = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!"); 
  console.log("[storeController] reqeust body:", req.body);

  const review = await reviewWrite(bodyToReview(req.body)); 
  res.status(StatusCodes.OK).json({result: review});
}

// 가게의 리뷰 목록 가져오기 핸들러 
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json(reviews);
};


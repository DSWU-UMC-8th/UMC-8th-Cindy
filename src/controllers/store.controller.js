import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview } from "../dtos/store.dto.js"; 
import { storeRegister, reviewWrite, listStoreReviews } from "../services/store.service.js";


export const handleStoreRegister = async (req, res, next) => {
  console.log("가게 등록을 요청했습니다!");
  console.log("[storeController] request body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).success(store);
}

// 리뷰 등록 
export const handleReviewWrite = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!"); 
  console.log("[storeController] reqeust body:", req.body);

  const memberId = parseInt(req.headers["x-member-id"]);
  if (!memberId) {
    return res.status(400).json({ error: "잘못된 요청입니다." });
  }

  const review = await reviewWrite(bodyToReview(req.body, memberId)); 
  res.status(StatusCodes.OK).success(review);
}

// 가게의 리뷰 목록 가져오기 핸들러 
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};


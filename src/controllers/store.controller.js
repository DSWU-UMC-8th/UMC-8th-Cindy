import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview } from "../dtos/store.dto.js"; 
import { storeRegister, reviewWrite, listStoreReviews } from "../services/store.service.js";


export const handleStoreRegister = async (req, res, next) => {
  /*
  #swagger.summary = '상점 등록 API'
  #swagger.tags = ['Store']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "정릉분식" },
            address: { type: "string", example: "서울시 성북구 정릉로 77" },
            regionId: { type: "number", example: 1 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "상점 등록 성공 응답",
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
                id: { type: "string", example: "11" },
                name: { type: "string", example: "정릉분식" },
                address: { type: "string", example: "서울시 성북구 정릉로 77" },
                regionId: { type: "number", example: 1 }
              }
            }
          }
        }
      }
    }
  }
*/

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
                        id: { type: "string" },
                        store: { type: "object", properties: { id: { type: "string" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "string" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "string", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const reviews = await listStoreReviews(
    /*
  #swagger.summary = '특정 상점의 리뷰 목록을 커서 기반 페이지네이션으로 조회합니다.'
  #swagger.tags = ['Store']
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '조회할 상점의 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '마지막으로 받은 리뷰 ID (커서)'
  }
  #swagger.responses[200] = {
    description: "상점 리뷰 목록 조회 성공",
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
                      id: { type: "string", example: "123456789012345678" },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "11" },
                          name: { type: "string", example: "정릉분식" }
                        }
                      },
                      member: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "42" },
                          email: { type: "string", example: "user@example.com" },
                          name: { type: "string", example: "홍길동" }
                        }
                      },
                      content: { type: "string", example: "너무 맛있었어요!" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: {
                      type: "string",
                      nullable: true,
                      example: "123456789012345678"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
*/
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};


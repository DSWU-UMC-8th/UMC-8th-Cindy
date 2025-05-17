import { StatusCodes } from "http-status-codes";
import { bodyToMember } from "../dtos/member.dto.js";
import { memberSignUp, listMemberReviews } from "../services/member.service.js";

// 회원가입 
export const handleMemberSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("[MemberController] request body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const member = await memberSignUp(bodyToMember(req.body)); 
  // res.status(StatusCodes.OK).json({ 
  //   resultType: "SUCCESS",
  //   error: null,
  //   success: member,
  // });

  res.status(StatusCodes.OK).success(member);
};

export const handleStoreRegister = async (req, res, next) => {
  /*
  #swagger.summary = '상점 등록 API'
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
    description: "상점 등록 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            result: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                address: { type: "string" },
                regionId: { type: "number" }
              }
            }
          }
        }
      }
    }
  }
*/

  console.log("가게 등록 요청 성공");
  console.log("[memberContorller] request body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).json({result: store});
}

export const handleListMemberReivews = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 리뷰 목록 조회 API'
  #swagger.parameters['x-member-id'] = {
    in: 'header',
    required: true,
    type: 'string',
    description: '사용자 ID를 담고 있는 커스텀 헤더'
  }
  #swagger.responses[200] = {
    description: "사용자 리뷰 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            result: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "123" },
                  store: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "11" },
                      name: { type: "string", example: "정릉분식" }
                    }
                  },
                  content: { type: "string", example: "매우 청결하고 맛있어요." },
                  score: { type: "number", example: 4.5 }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "x-member-id 헤더가 누락되었거나 잘못된 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "잘못된 요청입니다." }
          }
        }
      }
    }
  }
*/

  
  console.log("사용자 리뷰 조회 요청 성공");

  const memberId = parseInt(req.headers["x-member-id"]); // string 타입이니 parseInt 필요
  if(!memberId){
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "잘못된 요청입니다." });
  }
  const reviews = await listMemberReviews(memberId); // 리뷰 조회 서비스 호출
  
  res.status(StatusCodes.OK).json({ result: reviews });
}


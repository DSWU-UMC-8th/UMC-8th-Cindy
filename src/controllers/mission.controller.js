import { bodyToMission } from "../dtos/mission.dto.js";
import { 
  missionChallenge, 
  listStoreMissions,
  listMemberMissions 
} from "../services/mission.service.js";


export const handleMissionChallenge = async (req, res, next) => {
  /*
  #swagger.summary = '미션 도전 API'
  #swagger.tags = ['Mission']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            missionId: { type: "string", example: "101" },
            memberId: { type: "string", example: "12" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 도전 성공",
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
                id: { type: "string", example: "501" },
                missionId: { type: "string", example: "101" },
                memberId: { type: "string", example: "12" },
                status: { type: "string", example: "진행중" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "이미 도전 중이거나 완료된 미션",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "이미 도전 중인 미션입니다." }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "기타 서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "서버 오류" }
          }
        }
      }
    }
  }
*/

  console.log("미션 도전 요청이 들어왔습니다!");
  console.log("[missionController]request body:", req.body);
  try{
    const memberMission = await missionChallenge(bodyToMission(req.body));
    return res.status(200).success(memberMission); 
  } catch (err) {
    console.log(err.message);
    if(err.message === "이미 도전 중인 미션입니다.") {
      console.error("미션 도전 중 오류 발생:", err.message);
      return res.status(400).json({ error: "이미 도전 중인 미션입니다." });
    }

    else if(err.message === "이미 완료된 미션입니다.") {
      console.error("미션 도전 중 오류 발생:", err.message);
      return res.status(400).json({ error: "이미 완료된 미션입니다." });
    }

    else if(err.message === "미션 도전 중 오류 발생") {
      console.error("미션 도전 중 오류 발생:", err.message);
      return res.status(500).json({ error: "미션 도전 중 오류 발생" });
    }

    else {
      console.error("미션 도전 중 오류 발생:", err.message);
      return res.status(500).json({ error: "서버 오류" });
    }
  }
};

// 가게의 미션 목록 가져오기 핸들러
export const handleListStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '상점의 미션 목록 조회 API'
  #swagger.tags = ['Mission']
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '상점 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이지네이션 커서 (마지막 미션 ID)'
  }
  #swagger.responses[200] = {
    description: "상점의 미션 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "301" },
                  title: { type: "string", example: "첫 리뷰 작성하기" },
                  reward: { type: "number", example: 500 },
                  storeId: { type: "string", example: "11" }
                }
              }
            },
            pagination: {
              type: "object",
              properties: {
                cursor: { type: "string", nullable: true, example: "305" }
              }
            }
          }
        }
      }
    }
  }
*/

  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  return res.status(200).json(missions);
};

// 사용자가 진행중인 미션 목록 가져오기 핸들러
export const handleListMemberMissions = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 미션 목록 조회 API'
  #swagger.tags = ['Mission']
  #swagger.parameters['x-member-id'] = {
    in: 'header',
    required: true,
    type: 'string',
    description: '사용자 ID를 담고 있는 헤더'
  }
  #swagger.parameters['status'] = {
    in: 'query',
    required: false,
    type: 'string',
    enum: ['진행중', '완료'],
    description: '미션 상태 필터'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이지네이션 커서 (마지막 미션 ID)'
  }
  #swagger.responses[200] = {
    description: "사용자 미션 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "401" },
                  missionId: { type: "string", example: "101" },
                  status: { type: "string", example: "진행중" },
                  reward: { type: "number", example: 500 }
                }
              }
            },
            pagination: {
              type: "object",
              properties: {
                cursor: { type: "string", nullable: true, example: "405" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "잘못된 요청 (memberId 없음)",
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

  
  const memberId = parseInt(req.headers["x-member-id"]);
  if (!memberId) {
    return res.status(400).json({ error: "잘못된 요청입니다." });
  }

  const missions = await listMemberMissions(
    memberId, 
    req.query.status,
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  return res.status(200).json(missions);
}
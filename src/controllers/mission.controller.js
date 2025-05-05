import { bodyToMission } from "../dtos/mission.dto.js";
import { missionChallenge } from "../services/mission.service.js";


export const handleMissionChallenge = async (req, res, next) => {
  console.log("미션 도전 요청이 들어왔습니다!");
  console.log("[missionController]request body:", req.body);
  try{
    const memberMission = await missionChallenge(bodyToMission(req.body));
    return res.status(200).json(memberMission); 
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


import { addMemberMission, checkMemberMissionStatus, getMemberMissionByMemberMissionId } from "../repositories/mission.repository.js";
import { responseFromMemberMission } from "../dtos/mission.dto.js";

export const missionChallenge = async (data) => { // data: missionId, memberId 
    // 미션 도전 중 상태인지 확인
    const status = await checkMemberMissionStatus(data.memberId, data.missionId);
    if(status === null) {
        // 미션 도전 등록 
        const memberMissionId = await addMemberMission({
            memberId: data.memberId,
            missionId: data.missionId,
            status: "진행중"
        });
        // 사용자 미션 정보 가져오기
        const mission = await getMemberMissionByMemberMissionId(memberMissionId);

        console.log("응답 사용자 미션 정보: ", responseFromMemberMission(mission));
        return responseFromMemberMission(mission);
    }
    else if(status === "진행중") {
        throw new Error("이미 도전 중인 미션입니다.");
    }
    else if(status === "진행완료") {
        throw new Error("이미 완료된 미션입니다.");
    }
    else{
        throw new Error("미션 도전 중 오류 발생");
    }
}

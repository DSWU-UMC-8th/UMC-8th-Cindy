import {prisma} from "../db.config.js";


// 사용자 미선 상태 조회
export const checkMemberMissionStatus = async (memberId, missionId) => {
    const status = await prisma.memberMission.findFirst({
        where: {
            memberId: memberId,
            missionId: missionId,
        },
        select: {status: true},
    });

    // status 형태 = { status:"진행중" }
    // return status ?? null; -> 객체 전체가 반환된다 
    return status?.status ?? null; // -> string 반환 (문자열만 반환하고 싶으면 .status로 접근해야함)
}


// 사용자 추가 
export const addMemberMission = async (data) => {
    const mission = await prisma.memberMission.create({
        data: {
            memberId: data.memberId,
            missionId: data.missionId,
            status: data.status,
        }
    });
    return mission.id;
}


// 사용자 미션 상태 조회 
export const getMemberMissionByMemberMissionId = async (id) => {
    const result = await prisma.memberMission.findUnique({
        where: { id : id }
    });
    return result ?? null;
}
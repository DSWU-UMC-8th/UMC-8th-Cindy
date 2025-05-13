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

export const getAllStoreMissions = async (storeId, cursor) => {
    const missions = await prisma.mission.findMany({
        where: {
            storeId: storeId,
        },
        select: {
            id: true,
            deadline: true,
            missionSpec: true,
            store: {
                select: {
                    id: true,
                    name: true,
                    address: true,
                },
            },
        },
        take: 10,
        skip: cursor ? 1 : 0, // cursor가 존재하면 1개 건너뛰기
        cursor: cursor ? { id: cursor } : undefined, // cursor가 존재하면 해당 id부터 시작
    });
    return missions;
}

export const getAllMemberMissions = async (memberId, status, cursor) => {
    const missions = await prisma.memberMission.findMany({
        where: {
            memberId: memberId,
            status: status === "complete" ? "진행완료" : "진행중",
        },
        select: {
            id: true,
            mission: {
                select: {
                    id: true,
                    deadline: true,
                    missionSpec: true,
                    store: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                        },
                    },
                },
            },
        },
        take: 10,
        skip: cursor ? 1 : 0, // cursor가 존재하면 1개 건너뛰기
        cursor: cursor ? { id: cursor } : undefined, // cursor가 존재하면 해당 id부터 시작
    });
    return missions;
}


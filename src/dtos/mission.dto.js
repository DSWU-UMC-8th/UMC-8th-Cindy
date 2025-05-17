export const bodyToMission = (body) => {
    return {
        memberId: BigInt(body.memberId),
        missionId: BigInt(body.missionId),
    };
}

export const responseFromMemberMission = (mission) => {
    return {
        missionId: mission.mission_id.toString(),
        status: mission.status,
    };
}

export const responseFromStoreMissions = (missions) => {
    return missions.map((mission) => ({ // mission = missions[0], missions[1] .. 
        missionId: mission.id.toString(), // bigint -> string
        deadline: mission.deadline,
        missionSpec: mission.missionSpec,
        store: {
            id: mission.store.id.toString(),
            name: mission.store.name,
            address: mission.store.address
        }
    }));
}

export const responseFromMemberMissions = (missions) => {
    return missions.map((mission) => ({
        missionId: mission.mission.id.toString(), // bigint -> string
        status: mission.status,
        created_at: mission.created_at,
        updated_at: mission.updated_at,
        store: {
            id: mission.mission.store.id.toString(),
            name: mission.mission.store.name,
            address: mission.mission.store.address
        }
    }));
}

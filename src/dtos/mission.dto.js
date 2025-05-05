export const bodyToMission = (body) => {
    return {
        memberId: body.memberId,
        missionId: body.missionId
    };
}

export const responseFromMemberMission = (mission) => {
    return {
        missionId: mission.mission_id,
        status: mission.status,
        created_at: mission.created_at,
        updated_at: mission.updated_at
    };
}

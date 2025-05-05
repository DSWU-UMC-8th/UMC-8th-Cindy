import { pool } from "../db.config.js";

export const checkMemberMissionStatus = async (memberId, missionId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT status FROM member_mission WHERE member_id = ? AND mission_id = ?`,
            [memberId, missionId]
        );
        console.log("checkMemberMissionStatus:", rows[0]);
        if(rows.length === 0) return null; // 해당 미션 진행중/진행완료 내역 없음 
        return rows[0].status; // "진행중" 또는 "진행완료"
    } catch (err) {
        throw new Error(`미션 도전 중인지 확인하는 중 오류 발생: (${err})`);
    } finally {
        conn.release();
    }
};

export const addMemberMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at)
             VALUES (?, ?, ?, NOW(), NOW());`,
            [
                data.memberId,
                data.missionId,
                data.status
            ]
        );
        return result.insertId; // 생성된 member_mission_id 반환
    } catch (err) {
        throw new Error(`미션 도전 등록 중 오류 발생: (${err})`);
    } finally {
        conn.release();
    }
}

export const getMemberMissionByMemberMissionId = async (id) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT * FROM member_mission WHERE id = ?;`,
            [id]
        );
        if (rows[0].length === 0) return null;
        return rows[0];
    } catch (err) {
        throw new Error(`사용자 미션 정보를 가져오는 중 오류 발생: (${err})`);
    } finally {
        conn.release();
    }
};

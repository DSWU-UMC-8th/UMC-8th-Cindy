import { pool } from "../db.config.js";

export const addMember = async (data) => {
  const conn = await pool.getConnection();
  // try: 에러가 발생할 수 있는 주요 코드 실행 
  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await conn.query(
      `INSERT INTO member (email, name, gender, age, address, spec_address, phone_num, status, social_type, created_at, updated_at, point)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 'none', NOW(), NOW(), 0);`,
      [
        data.email,
        data.name,
        data.gender,
        data.age,
        data.address,
        data.specAddress,
        data.phoneNumber
      ]
    );

    return result.insertId;
    // catch: 에러가 발생하면 에러를 처리 
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  // finally: 에러 발생 여부와 관계 없이 항상 실행되는 코드
  } finally {
    conn.release(); // DB커넥션 반환 
  }
};

export const getMember = async (memberId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(`SELECT * FROM member WHERE id = ?;`, [memberId]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`사용자 정보를 가져오는 중 오류 발생: (${err})`);
  } finally {
    conn.release();
  }
};

export const setPreference = async (memberId, categoryId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO member_prefer (member_id, category_id, created_at, updated_at)
       VALUES (?, ?, NOW(), NOW());`,
      [memberId, categoryId]
    );
  } catch (err) {
    throw new Error(`선호 카테고리 저장 중 오류 발생: (${err})`);
  } finally {
    conn.release();
  }
};

export const getMemberPreferencesByMemberId = async (memberId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT category_id FROM member_prefer WHERE member_id = ? ORDER BY category_id ASC;`,
      [memberId]
    );
    return rows;
  } catch (err) {
    throw new Error(`선호 카테고리 조회 중 오류 발생: (${err})`);
  } finally {
    conn.release();
  }
};
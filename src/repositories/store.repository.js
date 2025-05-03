import { pool } from "../db.config.js";

export const checkRegionExists = async (regionId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query(`SELECT id FROM region WHERE id = ?;`, [regionId]);
        if(rows.length === 0) 
            return null;
        return rows[0];
    } catch (err) {
        throw new Error(`지역 정보를 가져오는 중 오류 발생: (${err})`); 
    } finally {
        conn.release();
    }
};

export const addStore = async (data) => {
    const conn = await pool.getConnection();
    try{
        const [result] = await conn.query(
            `INSERT INTO store (region_id, name, address, score, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW());`,
            [
                data.regionId,
                data.name,
                data.address,
                data.score
            ]
        );
        return result.insertId; // 가게 등록 후 생성된 ID 반환
    } catch (err) {
        throw new Error(`가게 등록 중 오류 발생: (${err})`);
    } finally{
        conn.release();
    }
};


export const getStore = async (storeId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?;`, [storeId]);
        if(rows.length === 0)
            return null;
        return rows[0];
    } catch{
        throw new Error(`가게 정보를 가져오는 중 오류 발생: (${err})`); 
    } finally{
        conn.release();
    }
};



export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query(`SELECT id FROM store WHERE id = ?;`, [storeId]);
        if(rows.length === 0) 
            return null;
        return rows[0];
    } catch (err) {
        throw new Error(`가게 정보를 가져오는 중 오류 발생: (${err})`); 
    } finally {
        conn.release();
    }
};

export const addReview = async (data) => {
    const conn = await pool.getConnection();
    try{
        const [result] = await conn.query(
            `INSERT INTO review (member_id, store_id, body, score, created_at)
            VALUES (?, ?, ?, ?, NOW());`,
            [
                data.memberId,
                data.storeId,
                data.body,
                data.score,
            ]
        );
        return result.insertId; // 리뷰 등록 후 생성된 ID 반환
    } catch (err) {
        throw new Error(`리뷰 등록 중 오류 발생: (${err})`);
    } finally{
        conn.release();
    }
}

export const setImageUrl = async (reviewId, data) => { 
    const conn = await pool.getConnection();
    try{
        const [result] = await conn.query(
            `INSERT INTO review_image (review_id, store_id, image_url, created_at, updated_at) 
                VALUES (?, ?, ?, NOW(), NOW());`,
            [   
                reviewId, 
                data.storeId,
                data.imageUrl,
                data.imageUrl,
            ]
        );
        return result.insertId; // 리뷰 등록 후 생성된 ID 반환
    } catch (err) {
        throw new Error(`리뷰 등록 중 오류 발생: (${err})`);
    } finally{
        conn.release();
    }
}

export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query(`SELECT * FROM review WHERE id = ?;`, [reviewId]);
        if(rows.length === 0)
            return null;
        return rows[0];
    } catch{
        throw new Error(`리뷰 정보를 가져오는 중 오류 발생: (${err})`); 
    } finally{
        conn.release();
    }
}



export const getImageUrlFromReviewId = async (reviewId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query(`SELECT image_url FROM review_image WHERE review_id = ?;`, [reviewId]);
        if(rows.length === 0)
            return null;
        return rows[0].image_url;
    } catch{
        throw new Error(`리뷰 정보를 가져오는 중 오류 발생: (${err})`); 
    } finally{
        conn.release();
    }
}
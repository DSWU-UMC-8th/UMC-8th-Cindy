import { responseFromStore, responseFromReview, responseFromReviews } from "../dtos/store.dto.js";
import {
    addStore,
    getStore,
    checkRegionExists,
    checkStoreExists,
    addReview,
    setImageUrl, 
    getReviewByReviewId,
    getImageUrlByImageUrlId,
    getAllStoreReviews
} from "../repositories/store.repository.js";

export const storeRegister = async (data) => {
    // 지역Id 존재 여부 확인 
    const regionId = await checkRegionExists(data.regionId);
    if(regionId === null) {
        throw new Error("존재하지 않는 지역입니다.");
    }

    // 가게 등록 
    const storeId = await addStore({
        regionId: data.regionId,
        name: data.name,
        address: data.address,
        score: data.score
    });

    // 가게 정보 가져오기 
    const store = await getStore(storeId);
    return responseFromStore(store);
}

// 리뷰 등록 
export const reviewWrite = async (data) => {
    // 가게 존재 여부 확인
    const storeId = await checkStoreExists(data.storeId);
    if(storeId === null) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 리뷰 등록 
    const reviewId = await addReview({
        memberId: data.memberId,
        storeId: data.storeId,
        body: data.body,
        score: data.score,
    });


    const imageUrlId = await setImageUrl(reviewId, data);

    // 리뷰 정보 가져오기
    const review = await getReviewByReviewId(reviewId);
    const imageUrl = await getImageUrlByImageUrlId(imageUrlId); 
    return responseFromReview(review, imageUrl);  

}

// 가게 리뷰 목록 가져오기
export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews); 
};
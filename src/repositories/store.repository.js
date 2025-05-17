import {prisma} from "../db.config.js";


// 지역 존재 여부 확인 
export const checkRegionExists = async (regionId) => {
    const region = await prisma.region.findUnique({
        where: { id: regionId}
    });
    return region ?? null; // 해당 지역이 존재하면 region 객체 반환, 존재하지 않으면 null 반환
}


// 가게 등록
export const addStore = async (data) => {
    const result = await prisma.store.create({
        data: {
            regionId: data.regionId,
            name: data.name,
            address: data.address, 
            score:data.score,
        }
    });
    return result.id; // 가게 등록 후 생성된 ID 반환
}


// 가게 존재 여부 확인
export const checkStoreExists = async(storeId) => {
    const store = await prisma.store.findUnique({
        where: {id: storeId},
        select: {id: true},
    });
    return store ?? null // 해당 가게가 존재하면 store 객체 반환, 존재하지 않으면 null 반환
}



// 가게 조회
export const getStore = async(storeId) => {
    const store = await prisma.store.findUnique({
        where: {id:storeId},
    });
    return store ?? null;
}


// 리뷰 등록
export const addReview = async (data) => {
    const result = await prisma.review.create({
        data: {
            memberId: data.memberId,
            storeId: data.storeId,
            body: data.body,
            score: data.score,
        }
    });
    return result.id;
}

// 이미지 URL 생성
export const setImageUrl = async(reviewId, data) => {
    const result = await prisma.reviewImage.create({
        data:{
            reviewId: reviewId,
            storeId: data.storeId,
            imageUrl: data.imageUrl,
        }
    });
    return result.id;
}


// 리뷰 조회 
export const getReviewByReviewId = async (reviewId) => {
    const review = await prisma.review.findUnique({ 
        where: {id: reviewId},
        select: {
            id: true,
            storeId: true,
            body: true,
        },
    });
    return review ?? null;
}

// imageUrlId로 이미지 URL 가져오기
export const getImageUrlByImageUrlId = async (imageUrlId) => {
    const imageUrl = await prisma.reviewImage.findUnique({
        where: {id: imageUrlId},
        select: {imageUrl: true},
    });

    return imageUrl; 
}


export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      store: true, // 연관된 store 객체
    },
    where: { storeId: storeId, id: { gt: cursor } }, // gt: greater than, 즉 id가 cursor보다 큰 리뷰들만 가져옴
                                                    // SQL 표현-> toreId == ?? AND id > cursor
    orderBy: { id: "asc" }, // 오름차순
    take: 5, // 최대 5개 리뷰 가져오기
  });

  return reviews; // 위 조건에 맞는 리뷰 배열 반환 
};


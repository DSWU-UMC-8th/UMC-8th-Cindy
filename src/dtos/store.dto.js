export const bodyToStore = (body) => {
    return {
        regionId: body.regionId.toString(),
        name: body.name,
        address: body.address,
        score: body.score
    };
};

export const responseFromStore = (store) => {
    return {
        regionId: store.regionId.toString(),
        name: store.name,
        address: store.address,
        score: store.score
    }
}

export const bodyToReview = (body) => {
    return {
        memberId: body.memberId.toString(),
        storeId: body.storeId,
        body: body.body,
        score: body.score,
        imageUrl: body.imageUrl
    };
};


export const responseFromReview= (reviews) => {
    return {
        data: reviews,
        pagination: {
            // 리뷰가 하나라도 있다면 reviews[reviews.length - 1].id를 cursor로 사용 
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};
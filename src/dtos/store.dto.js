export const bodyToStore = (body) => {
    return {
        regionId: BigInt(body.regionId),
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

export const bodyToReview = (body, memberId) => {
    return {
        memberId: BigInt(memberId),
        storeId: BigInt(body.storeId),
        body: body.body,
        score: body.score,
        imageUrl: body.imageUrl,
    }
};

export const responseFromReview = (review, imageUrl) => {
    return {
        reviewId: review.id.toString(),
        storeId: review.storeId.toString(),
        body: review.body,
        imageUrl: imageUrl,
    }
}

export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            // 리뷰가 하나라도 있다면 reviews[reviews.length - 1].id를 cursor로 사용 
            cursor: reviews.length ? reviews[reviews.length - 1].id.toString() : null,
        },
    };
};
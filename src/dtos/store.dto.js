export const bodyToStore = (body) => {
    return {
        regionId: body.regionId,
        name: body.name,
        address: body.address,
        score: body.score
    };
};

export const responseFromStore = (store) => {
    return {
        regionId: store.regionId,
        name: store.name,
        address: store.address,
        score: store.score
    }
}

export const bodyToReview = (body) => {
    return {
        storeId: body.storeId,
        body: body.body,
        score: body.score,
        imageUrl: body.imageUrl
    };
};


export const responseFromReview= (review, imageUrl) => {
    return {
        storeId: review.storeId,
        body: review.body,
        score: review.score,
        imageUrl: imageUrl
    }
}
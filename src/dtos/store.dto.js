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
        regionId: store.region_id,
        name: store.name,
        address: store.address,
        score: store.score
    }
}
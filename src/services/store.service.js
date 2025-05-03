import { responseFromStore } from "../dtos/store.dto.js";
import {
    addStore,
    getStore,
    checkRegionExists 
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
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addMember,
  getMember,
  getMemberPreferencesByMemberId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinMemberId = await addMember({
    email: data.email,
    name: data.name,
    gender: data.gender,
    age: data.age,
    address: data.address,
    specAddress: data.specAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinMemberId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinMemberId, preference);
  }

  // member, preferences 정보 가져오기 
  const member = await getMember(joinMemberId);
  const preferences = await getMemberPreferencesByMemberId(joinMemberId);

  // 가져온 정보를 responseFromUser dto함수로 가공하여 반환 
  return responseFromUser({ member, preferences }); 
};

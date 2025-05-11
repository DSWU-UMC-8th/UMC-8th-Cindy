import { responseFromMember, responseFromMemberReviews } from "../dtos/member.dto.js";
import {
  addMember,
  getMember,
  getMemberPreferencesByMemberId,
  setPreference,
  getMemberReviewsByMemberId,
} from "../repositories/member.repository.js";

import { getStore } from "../repositories/store.repository.js";

export const memberSignUp = async (data) => {
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
  return responseFromMember({ member, preferences }); 
};

// 사용자 리뷰 조회
export const listMemberReviews = async (memberId) => {
  // 사용자가 작성한 리뷰
  const reviews = await getMemberReviewsByMemberId(memberId);
  if (reviews === null) {
    throw new Error("리뷰가 존재하지 않습니다.");
  }

  return responseFromMemberReviews(reviews);
}


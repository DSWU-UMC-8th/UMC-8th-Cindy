import {prisma} from "../db.config.js";

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
  try{
    const result = await prisma.$transaction(async (tx) => {
      // 1. 이메일 중복 검사
      const existing = await tx.member.findFirst({where:{email:data.email}});
      if(existing)
        throw new error("이미 존재하는 이메일입니다.");
      // 2. member 생성
      const created = await tx.member.create({
        data:{
          email: data.email,
          name: data.name,
          gender: data.gender,
          age: data.age,
          address: data.address,
          specAddress: data.specAddress,
          phoneNumber: data.phoneNumber,
        }
      });

      const memberId = created.id;
      
      // 3. member_prefer 생성 
      for (const categoryId of data.preferences) {
        await tx.memberPrefer.create({
          data: {
            memberId: memberId,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
      // 4. member + member_prefer 정보 조회 
      const member = await tx.member.findUnique({ where: { id: memberId } });
      const preferences = await tx.memberPrefer.findMany({
        where: { memberId },
        orderBy: { categoryId: 'asc' },
        select: { categoryId: true }
      });

      return responseFromMember({ member, preferences });
    });

    return result;
  
  } catch(error) {
    // rollback
    console.error("회원가입 실패: ", error.message);
    throw error;
  }

  /*
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
  */
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


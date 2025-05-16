import {prisma} from "../db.config.js";

// 사용자 추가
export const addMember = async (data) => {
  const member = await prisma.member.findFirst({ where: { email: data.email } });
  if (member) { // 이미 존재하는 이메일 
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};

export const getMember = async (memberId) => {
  const member = await prisma.member.findUnique({
    where: { id: memberId }
  });
  return member;
};

export const setPreference = async (memberId, categoryId) => {
  try {
    await prisma.memberPrefer.create({
      data: {
        memberId: memberId,
        categoryId: categoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (err) {
    throw new Error(`선호 카테고리 저장 중 오류 발생: (${err})`);
  }
};

export const getMemberPreferencesByMemberId = async (memberId) => {
  try {
    const preferences = await prisma.memberPrefer.findMany({
      where: { memberId: memberId },
      orderBy: { categoryId: 'asc' },
      select: { categoryId: true }
    });
    return preferences;
  } catch (err) {
    throw new Error(`선호 카테고리 조회 중 오류 발생: (${err})`);
  }
};

export const getMemberReviewsByMemberId = async (memberId) => {
  const reviews = await prisma.review.findMany({
    where: { memberId: memberId },
    select: {
      id: true,
      body: true,
      score: true,
      createdAt: true,
      updatedAt: true, 
      store: {
        select: {
          name: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' } 
  });

  return reviews || null;
};

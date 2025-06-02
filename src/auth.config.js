import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/oauth2/callback/google",
    scope: ["email", "profile"], // 로그인 후 받을 정보의 범위
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);


// google 로그인 후 사용자 정보를 검증하고, 데이터베이스에 저장하는 함수
const googleVerify = async (profile) => {

  const email = profile.emails?.[0]?.value; // 전달받은 이메일로 사용자 조회
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const member = await prisma.member.findFirst({ where: { email } });
  
  // 사용자가 이미 존재하는 경우, 해당 사용자 정보 반환
  if (member !== null) {
    return { id: member.id, email: member.email, name: member.name };
  }


  // 사용자가 존재하지 않는 경우, 새로 생성
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      age: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      specAddress: "추후 수정",
      phoneNum: "추후 수정",
      socialType: "google",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
import { StatusCodes } from "http-status-codes";
import { bodyToMember } from "../dtos/member.dto.js";
import { memberSignUp, listMemberReviews } from "../services/member.service.js";

export const handleMemberSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("[MemberController] request body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const member = await memberSignUp(bodyToMember(req.body)); 
  res.status(StatusCodes.OK).json({ result: member });
};

export const handleStoreRegister = async (req, res, next) => {
  console.log("가게 등록 요청 성공");
  console.log("[memberContorller] request body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).json({result: store});
}

export const handleListMemberReivews = async (req, res, next) => {
  console.log("사용자 리뷰 조회 요청 성공");

  const memberId = parseInt(req.headers["x-member-id"]); // string 타입이니 parseInt 필요
  if(!memberId){
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "잘못된 요청입니다." });
  }
  const reviews = await listMemberReviews(memberId); // 리뷰 조회 서비스 호출
  
  res.status(StatusCodes.OK).json({ result: reviews });
}
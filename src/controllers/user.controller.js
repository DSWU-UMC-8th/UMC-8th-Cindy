import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("[UserController] request body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body)); // bodyToUser DTO를 이요해서 요청 데이터를 변환한 후, 서비스로 전달
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleStoreRegister = async (req, res, next) => {
  console.log("가게 등록 요청 성공");
  console.log("[userContorller] request body:", req.body);

  const store = await storeRegister(bodyToStore(req.body)); 
  res.status(StatusCodes.OK).json({result: store});
}
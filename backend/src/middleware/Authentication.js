import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const JwtVerify = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(400, "Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    
    console.log("JWT verification failed:", error);
    res.status(error.statusCode || 401).json({
        statusCode: 401,
        message: "JWT verification failed: User not found or token is invalid."
    });
}
};

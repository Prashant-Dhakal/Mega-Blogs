import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  createPost,
  getAllposts,
  getCurrentUser,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.js";
import { JwtVerify } from "../middleware/Authentication.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured Routes
router.route("/logout").get(JwtVerify, logoutUser);

router.route("/addpost").post(JwtVerify,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createPost
);
router.route("/getallPost").get(JwtVerify, getAllposts);
router.route("/currentUser").get(JwtVerify, getCurrentUser);

// Route for getting a single post
router.route("/post/:slug").get(JwtVerify, getSinglePost);

// Routes for updating different parts of the post
router.route("/post/updation/:slug").patch(JwtVerify, updatePost);

// Route for deleting a post
router.route("/post/:slug").delete(JwtVerify, deletePost);


export { router };

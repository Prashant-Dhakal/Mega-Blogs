import { Post } from "../models/Post.model.js";
import { User } from "../models/userModel.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const option = {
  httpOnly: true, // Prevent CSRF attacks
};

const generateAccessAndRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      404,
      `Error occured while generating Acess and Refresh Token error is :: ${error}`
    );
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      throw new ApiError(400, "Username is required to register");
    }

    if (!email) {
      throw new ApiError(400, "Email is required to register");
    }

    if (!password) {
      throw new ApiError(400, "Password is required to register");
    }

    const checkingExistedAccount = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkingExistedAccount) {
      throw new ApiError(400, " Username or Email is already exist ");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (!user) {
      throw new ApiError(500, "User not created");
    }

    const createdUser = await User.findById(user?._id).select("-password");

    const { loggedUser, accessToken, refreshToken } = await loggingUser(
      email,
      password
    );

    // Set cookies with proper options
    res
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(new ApiResponse(201, loggedUser, "User successfully registered"));
  } catch (error) {
    throw new ApiError(
      500,
      `Error occured while registering the user the error is : ${error}`
    );
  }
};

/* Logging Function divided into two section
 * One which accepts parameter while registering and calling the loggingUser function and pass parameter.
 * Two which accept data from req.body. if session expired User give data from req.body.
 */

const loggingUser = async (email, password) => {
  if (!email) {
    throw new ApiError(400, "Email is required to logging In");
  }

  if (!password) {
    throw new ApiError(400, "Password is required to logging In");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, `This ${email} is not registered`);
  }

  const passwordCorrect = await user.isPasswordCorrect(password);
  if (!passwordCorrect) {
    throw new ApiError(404, "Password is Incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );
  if (!(accessToken && refreshToken)) {
    throw new ApiError(500, " Both tokens are not generating ");
  }

  const loggedUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  return { loggedUser, accessToken, refreshToken };
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { loggedUser, accessToken, refreshToken } = await loggingUser(
      email,
      password
    );

    res
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(new ApiResponse(200, loggedUser, "Successfully LoggedIn user"));
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: "",
        },
      },
      {
        new: true,
      }
    );

    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, user, "user Successfully Logged Out"));
  } catch (error) {
    throw new ApiError(404, "Error occured while logingOut user");
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.json(new ApiResponse(200, user, "User successfully get"));
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, slug, active, content } = req.body;

    if (!title) {
      throw new ApiError(400, "Title is required");
    }

    if (!slug) {
      throw new ApiError(400, "Slug is required");
    }

    if (!content) {
      throw new ApiError(400, "Content is required");
    }

    const postImageLocalPath = req.files?.image[0].path;

    const postImage = await uploadOnCloudinary(postImageLocalPath);

    const post = await Post.create({
      title,
      slug,
      content,
      image: postImage.url,
      active,
    });

    if (!post) {
      throw new ApiError(500, "Sorry, Post didn't created !");
    }

    res.json(new ApiResponse(200, post, "Post Created Successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      `Error occured while creating the post :: ${error}`
    );
  }
};

const getSinglePost = async (req, res) => {
  try {
    const {slug} = req.params; // Assuming SLUG is passed as a route parameter;

    if (!slug) {
      throw new ApiError(400, "Post SLUG is required");
    }

    // Fetch the post using your database model (e.g., with Mongoose)
    const post = await Post.findOne({slug});

    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    throw new ApiError(400, "Error occured While finding post in getSinglePost function", error);
  }
};

const getAllposts = async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) {
      console.log("Nothing not a single post found to show");
    }
    res.json(
      new ApiResponse(
        200,
        post,
        "Post successfully fetched and showed to the frontend"
      )
    );
  } catch (error) {
    throw new ApiError(
      400,
      `Can't find All post something went wrong :: ${error}`
    );
  }
};

const updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, status, passedSlug } = req.body;

    if (!slug) {
      throw new ApiError(400, "Post SLUG is required");
    }

    // Create an object to hold the fields that need to be updated
    const updates = {};

    if (title) {
      updates.title = title;
      if (passedSlug) {
        updates.slug = passedSlug;
      }
    }

    if (content) {
      updates.content = content;
    }

    if (typeof status !== 'undefined') {
      if (typeof status !== 'boolean') {
        throw new ApiError(400, "status must be a boolean value");
      }
      updates.active = status;
    }

    // Perform the update only if there's something to update
    let post;
    if (Object.keys(updates).length > 0) {
      post = await Post.findOneAndUpdate(
        { slug },
        updates,
        { new: true }
      );
    }

    // If post not found, return an error
    if (!post) {
      return res.status(404).json({ message: "Post not found or nothing to update" });
    }

    // Return the updated post or a success message
    res.status(200).json(new ApiResponse(200, post, "Post successfully updated"));
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { slug } = req.params; // Assuming the SLUG is passed as a route parameter

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Post SLUG is required",
      });
    }

    // Find and delete the post by slug
    const deletedPost = await Post.findOneAndDelete({ slug });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found, nothing to delete",
      });
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Post successfully deleted",
      data: deletedPost, // Optional: return the deleted post data if needed
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting post",
      error: error.message,
    });
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  createPost,
  getSinglePost,
  getAllposts,
  updatePost,
  deletePost
};

import { uploadPicture } from "~/middleware/uploadPictureMiddleware";
import { fileRemover } from "~/utils/fileRemover";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";
import sendMail from "~/utils/sendMail";
import "dotenv/config";
import Comment from "~/models/Comment";
import User from "~/models/User";
import Post from "~/models/Post";

const register = async (req, res, next) => {
  const { avatar, name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    user = await User.create({ avatar, name, email, password });
    res.status(201).json({
      message: "Register successfully",
      data: {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: user.generateToken(),
        //  như token = await user.generateToken() nó sẻ chờ cho đến khi user.generateToken() chạy xong thì mới chạy tiếp
      },
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email or password are not exist");
    if (await user.comparePassword(password)) {
      return res.status(200).json({
        message: "Login successfully",
        data: {
          id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
          token: await user.generateToken(),
        },
      });
    } else {
      const error = new Error("Email or password are not exist");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const odlUser = await User.findOne({ email });
    if (!odlUser) {
      const error = new Error("Email not found");
      error.statusCode = 401;
      throw error;
    }
    const token = await odlUser.generateToken(
      { email },
      odlUser.password,
      "2m"
    );
    const link = `${process.env.FRONTEND_URL}/reset-password/${odlUser._id}/${token}`;
    await sendMail(email, link);
    res.json({ message: "Reset password link has been sent to your email" });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new Error("Password not match with confirm password");
    }
    const user = await User.findById(id);
    const data = verify(token, process.env.JWT_SECRET + user.password);
    if (!user || user?.email !== data?.email)
      throw new Error("Link reset password is invalid");
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Verified",
      data: {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateToken(),
      },
    });
  } catch (error) {
    next(error);
  }
};
const userProfile = async (req, res, next) => {
  try {
    if (!req.user._id) throw new Error("User not found");
    return res.status(200).json({
      id: req.user._id,
      avatar: req.user.avatar,
      name: req.user.name,
      email: req.user.email,
      verified: req.user.verified,
      admin: req.user.admin,
    });
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) throw new Error("User not found");
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    const updateUserProfile = await user.save();
    res.status(200).json({
      id: updateUserProfile._id,
      avatar: updateUserProfile.avatar,
      name: updateUserProfile.name,
      email: updateUserProfile.email,
      verified: updateUserProfile.verified,
      admin: updateUserProfile.admin,
    });
  } catch (error) {
    next(error);
  }
};
const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async (err) => {
      if (err) {
        // đang ở trong function upload nên k cath đc bên ngoài
        const error = new Error(
          "An error occurred when uploading" + " " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updateUser = await User.findById(req.user._id);
          filename = updateUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updateUser.avatar = req.file.filename;
          await updateUser.save();
          res.status(200).json({
            id: updateUser._id,
            avatar: updateUser.avatar,
            name: updateUser.name,
            email: updateUser.email,
            verified: updateUser.verified,
            admin: updateUser.admin,
            token: await updateUser.generateToken(),
          });
        } else {
          let filename;
          const user = await User.findById(req.user._id);
          filename = user.avatar;
          user.avatar = "";
          if (filename) {
            fileRemover(filename);
          }
          await user.save();
          res.status(200).json({
            id: user._id,
            avatar: "",
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateToken(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.name = { $regex: filter, $options: "i" };
    }
    const query = User.find(where);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    res.header({
      "x-filter": filter,
      "x-current-page": JSON.stringify(page),
      "x-pages-size": JSON.stringify(limit),
      "x-total-count": JSON.stringify(total),
      "x-total-page-count": JSON.stringify(pages),
    });
    if (page > pages || page < 1) {
      return res.json([]);
    }
    let users = await query.skip(skip).limit(limit).sort({ createdAt: "desc" });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const postToDelete = await Post.find({ user: userId });
    const postIdToDelete = postToDelete.map((post) => post._id);
    await Post.deleteMany({ user: userId });

    await fileRemover(user.avatar);

    await Comment.deleteMany({ post: { $in: postIdToDelete } });
    await User.deleteOne({ _id: userId });
    await session.commitTransaction();
    res.status(200).json("Delete user successfully");
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
const updateAdminUser = async (req, res, next) => {
  try {
    if (!req.user.admin) {
      throw new Error("You are not admin");
    }
    const userId = req.params.userId;
    const { admin } = req.body;
    if (userId === req.user._id) {
      throw new Error("You can't change your role");
    }
    const user = await User.findOne({ _id: userId });
    console.log(typeof admin !== "undefined");
    user.admin = typeof admin !== "undefined" ? !user.admin : user.admin;
    await user.save();
    res.status(200).json("Update admin successfully");
  } catch (error) {
    next(error);
  }
};
export {
  register,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  updateAdminUser,
};

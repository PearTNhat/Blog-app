import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, min: 6, max: 50, required: true },
    email: { type: String, min: 6, required: true, unique: true },
    password: { type: String, min: 6, max: 50, required: true },
    verified: { type: Boolean, default: true },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    next();
  }
  return next();
});
// tao 1 function generateToken trong UserSchema VD res = UserSchema.create(...) thì có res.generateToken() để tạo token
UserSchema.methods.generateToken = function (
  obj = {},
  securityKey = "",
  expiresIn = "30d"
) {
  return jwt.sign(
    { id: this._id, ...obj },
    process.env.JWT_SECRET + securityKey,
    {
      expiresIn,
    }
  );
};
UserSchema.methods.comparePassword = async function (enterPassword) {
  return await compare(enterPassword, this.password);
};
const User = model("User", UserSchema);
export default User;

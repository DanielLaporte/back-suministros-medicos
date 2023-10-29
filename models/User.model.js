const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }], // Relación con las compras
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

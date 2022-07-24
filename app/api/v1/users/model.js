const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { model, Schema } = mongoose;

let userSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama user minimal 3 karakter"],
      maxLength: [50, "Panjang nama user maksimal 50 karakter"],
      required: [true, "Nama harus diisi"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },

    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizers",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);

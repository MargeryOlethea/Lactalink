const User = require("../models/user");
const UserDetail = require("../models/userDetail");
const { ObjectId } = require("mongodb");
const { comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwtoken");
const readTextFromImage = require("../utils/gvision");

class UserController {
  // getAllUsers buat coba-coba aja
  static async getAllUsers(req, res, next) {
    try {
      // cara exclude dari find, dengan menggunakan .select("-field")
      const data = await User.find().select(["-password", "-location"]);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async ktpRegister(req, res, next) {
    try {
      const idKTP = await readTextFromImage(req.file.buffer);

      let result = null;
      if (idKTP) {
        result = {
          idKTP,
          f4DKTP: idKTP.slice(0, 4), // 1st 4 digit KTP
          provinceId: idKTP.slice(0, 2), // 1st 2 digit KTP
          regencyId: idKTP.slice(2, 4), // 2nd 2 digit KTP
        };
      }

      res.status(200).json({
        message: "Successfully read KTP",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
      };
      await User.create(body);
      res.status(201).json({ message: "Successfully register" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      if (!email || !password) {
        throw { name: "LoginValidationInput" };
      }

      const checkUser = await User.findOne({ email });
      if (!checkUser || !comparePassword(password, checkUser.password)) {
        throw { name: "LoginValidationError" };
      }

      // setup jwt dan payload
      const payload = {
        userId: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        location: checkUser.location,
        role: checkUser.role,
        isRegistered: checkUser.isRegistered,
      };

      const access_token = createToken(payload);

<<<<<<< HEAD
      res.status(200).json({
        message: "Successfully login",
        data: { access_token, ...payload },
      });
=======
      res.status(200).json({ message: "Successfully login", data: { access_token, ...payload } })
>>>>>>> development
    } catch (error) {
      next(error);
    }
  }

  static async createUserDetail(req, res, next) {
    try {
      const {
        babyName,
        babyDOB,
        babyGender,
        bloodType,
        bloodRhesus,
        halal,
        egg,
        dairy,
        nuts,
        soy,
        seafood,
        flourOrWheat,
        redMeat,
        spicyFood,
        caffeine,
      } = req.body;
      const body = {
        UserId: req.loginInfo.userId,
        babyName,
        babyDOB,
        babyGender,
        bloodType,
        bloodRhesus,
        halal,
        egg,
        dairy,
        nuts,
        soy,
        seafood,
        flourOrWheat,
        redMeat,
        spicyFood,
        caffeine,
      };

      const createdUserDetail = await UserDetail.create(body);

      await User.updateOne(
        { _id: req.loginInfo.userId },
        { isRegistered: true },
      );

      res.status(201).json({
        message: "Successfully create user detail",
        data: createdUserDetail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserLoginDetail(req, res, next) {
    try {
      const agg = [
        {
          $match: {
            UserId: new ObjectId(req.loginInfo.userId),
          },
        },
        {
          $lookup: {
            as: "user",
            from: "users",
            foreignField: "_id",
            localField: "UserId",
          },
        },
        {
          $unwind: {
            path: "$user",
          },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
      ];

      const userLoginDetail = await UserDetail.aggregate(agg);

      res.status(200).json({ data: userLoginDetail[0] });
    } catch (error) {
      next(error);
    }
  }

  static async editUserLoginDetail(req, res, next) {
    try {
      const {
        babyName,
        babyDOB,
        babyGender,
        bloodType,
        bloodRhesus,
        halal,
        egg,
        dairy,
        nuts,
        soy,
        seafood,
        flourOrWheat,
        redMeat,
        spicyFood,
        caffeine,
      } = req.body;
      const body = {
        babyName,
        babyDOB,
        babyGender,
        bloodType,
        bloodRhesus,
        halal,
        egg,
        dairy,
        nuts,
        soy,
        seafood,
        flourOrWheat,
        redMeat,
        spicyFood,
        caffeine,
      };

      const updatedUserDetail = await UserDetail.updateOne(
        { UserId: new ObjectId(req.loginInfo.userId) },
        body,
      );

      res.status(200).json({
        message: "Successfully edit user detail",
        data: updatedUserDetail,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

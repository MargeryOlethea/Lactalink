const { ObjectId } = require("mongodb");
const Milk = require("../models/milk");
const UserDetail = require("../models/userDetail");

class MilkController {
  static async createMilk(req, res, next) {
    try {
      const { totalBags, totalMl, pumpDate } = req.body;

      // pumpDate >> yyyy-mm-dd

      const newMilk = await Milk.create({
        totalBags,
        totalMl,
        pumpDate,
        UserId: req.loginInfo.userId,
      });

      res.status(201).json({
        message: "Successfully create milk",
        data: newMilk,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMilk(req, res, next) {
    /*
    gender				+ 2 poin
    rhesus				+ 5 poin
    golongan darah 			+ 2 poin
    halal/non halal 			+ 5 poin
    Telur 					+ 2 poin
    Susu sapi (dan turunannya) 	+ 2 poin
    Kacang-kacangan 			+ 2 poin
    Kedelai 				+ 2 poin
    Seafood 				+ 2 poin
    Tepung 				+ 2 poin
    Daging merah 			+ 2 poin
    Makanan pedas 			+ 2 poin
    Kafein				 	+ 2 poin
    
    TOTAL: 	32 poin,
    */
    try {
      const { location } = req.query;
      const { compability } = req.query;

      const agg = [
        {
          $lookup: {
            as: "userdetail",
            from: "userdetails",
            foreignField: "UserId",
            localField: "UserId",
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
          $unwind: {
            path: "$userdetail",
          },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
        {
          $match: {
            "user.location": location || req.loginInfo.location,
          },
        },
      ];

      const milks = await Milk.aggregate(agg).sort({ createdAt: -1 });

      const userLoginDetail = await UserDetail.findOne({
        UserId: req.loginInfo.userId,
      });

      const milksWithCompability = milks.map((milk) => {
        let score = 0;
        if (milk.userdetail.gender == userLoginDetail.gender) {
          score += 2;
        }
        if (milk.userdetail.bloodRhesus == userLoginDetail.bloodRhesus) {
          score += 5;
        }
        if (milk.userdetail.bloodType == userLoginDetail.bloodType) {
          score += 2;
        }
        if (milk.userdetail.halal == userLoginDetail.halal) {
          score += 5;
        }
        if (milk.userdetail.egg == userLoginDetail.egg) {
          score += 2;
        }
        if (milk.userdetail.dairy == userLoginDetail.dairy) {
          score += 2;
        }
        if (milk.userdetail.nuts == userLoginDetail.nuts) {
          score += 2;
        }
        if (milk.userdetail.soy == userLoginDetail.soy) {
          score += 2;
        }
        if (milk.userdetail.seafood == userLoginDetail.seafood) {
          score += 2;
        }
        if (milk.userdetail.flourOrWheat == userLoginDetail.flourOrWheat) {
          score += 2;
        }
        if (milk.userdetail.redMeat == userLoginDetail.redMeat) {
          score += 2;
        }
        if (milk.userdetail.spicyFood == userLoginDetail.spicyFood) {
          score += 2;
        }
        if (milk.userdetail.caffeine == userLoginDetail.caffeine) {
          score += 2;
        }

        const percentage = Math.round((score / 32) * 100);

        return { ...milk, score: percentage };
      });

      if (compability) {
        if (compability === "desc") {
          milksWithCompability.sort((a, b) => {
            return b.score - a.score;
          });
        } else if (compability === "asc") {
          milksWithCompability.sort((a, b) => {
            return a.score - b.score;
          });
        }
      }

      res.status(200).json({
        message: "Successfully get milks",
        data: milksWithCompability,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMilk(req, res, next) {
    try {
      const { id } = req.params;

      const getMilk = await Milk.findOne({ _id: new ObjectId(id) });

      if (!getMilk) {
        throw { name: "NotFound" };
      }

      // if (getMilk.UserId !== req.loginInfo.userId) {
      //   throw { name: "Forbidden" };
      // }

      const deletedMilk = await Milk.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({
        message: "Successfully delete milk",
        data: deletedMilk,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MilkController;

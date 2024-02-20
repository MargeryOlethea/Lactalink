const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoDB = MONGODB_TEST_CONNECTION_STRING;
mongoose.connect(mongoDB);
const User = require("../models/user");

describe("User test", () => {
  beforeAll(async () => {
    await User.deleteOne({});
  });

  afterEach(async () => {
    await User.deleteOne({});
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  it("has a module", () => {
    expect(User).toBeDefined();
  });

  describe("get user", () => {
    it("get a user", async () => {
      const user = new User({
        name: "mama",
        email: "mama@mama.com",
        password: "112233",
        profilePicture: "mama",
        location: 1122,
        phoneNumber: "112233",
        role: "bunda",
        isRegistered: true,
      });
      await user.save();

      const foundUser = await User.findOne({ name: "mama" });
      const expected = "mama";
      const actual = foundUser.name;
      expect(actual).toEqual(expected);
    });
  });

  describe("save user", () => {
    it("save a user", async () => {
      const user = new User({
        name: "mama",
        email: "mama@mama.com",
        password: "112233",
        profilePicture: "mama",
        location: 1122,
        phoneNumber: "112233",
        role: "bunda",
        isRegistered: true,
      });

      const savedUser = await user.save();
      const expected = "mama";
      const actual = savedUser.name;
      expect(actual).toEqual(expected);
    });
  });

  describe("update user", () => {
    it("update a user", async () => {
      const user = new User({
        name: "mama",
        email: "mama@mama.com",
        password: "112233",
        profilePicture: "mama",
        location: 1122,
        phoneNumber: "112233",
        role: "bunda",
        isRegistered: true,
      });
      await user.save();
      user.name = "mum";
      const updatedUser = await user.save();

      const expected = "mum";
      const actual = updatedUser.name;
      expect(actual).toEqual(expected);
    });
  });
});

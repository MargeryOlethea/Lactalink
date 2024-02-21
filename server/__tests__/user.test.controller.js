const request = require("supertest");
const app = require("../app");
const { createToken } = require("../utils/jwtoken");
const { hashPassword } = require("../utils/bcrypt");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const readTextFromImage = require("../utils/gvision");
const path = require("path");
const fs = require("fs");

let access_token_user;

beforeAll(async () => {
  mongoose.connect(process.env.MONGODB_TEST_CONNECTION_STRING);
  const user1 = await User.create({
    name: "ibu1 d ts",
    email: "ibu1@mail.com",
    password: "asdasd",
    location: "3674",
    phoneNumber: "+6280989901",
    role: "donor",
  });
  // const user1Detail = await User.insertMany({
  //   UserId: user1[0]._id,
  //   babyName: "Bayi",
  //   babyDOB: new Date(),
  //   babyGender: "Name",
  //   bloodType: "O",
  //   bloodRhesus: "+",
  //   halal: true,
  //   egg: true,
  //   dairy: true,
  //   nuts: true,
  //   soy: true,
  //   seafood: true,
  //   flourOrWheat: true,
  //   redMeat: true,
  //   spicyFood: true,
  //   caffeine: true,
  // });

  const payloadUser = {
    userId: user1._id,
    email: user1.email,
    role: user1.role,
  };

  access_token_user = createToken(payloadUser);
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});

describe("User Routes Test", () => {
  describe("GET /users - getalluser", () => {
    it("should get all user", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${access_token_user}`);
      expect(response.status).toBe(200);
    });
    it("shouldnt get all user", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(401);
    });
  });

  describe("POST /login - Login", () => {
    it("200 Success Login", async () => {
      const body = { email: "ibu1@mail.com", password: "asdasd" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(200);
    });
    it("401 Failed Login - email empty", async () => {
      const body = { email: "", password: "asdasd" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
    });
    it("401 Failed Login - password empty", async () => {
      const body = { email: "ibu1@mail.com", password: "" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
    });
    it("401 Failed Login - wrong password", async () => {
      const body = { email: "ibu1@mail.com", password: "salah" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
    });
    it("401 Failed Login - wrong email", async () => {
      const body = { email: "ibu1", password: "asdasd" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
    });
  });

  describe("POST/registration", () => {
    it("Success register", async () => {
      const body = {
        name: "ibu2test",
        email: "ibu2_test@mail.com",
        password: "asdasd",
        location: "3674",
        phoneNumber: "+62809899210",
        role: "donor",
      };
      const response = await request(app).post("/registration").send(body);
      expect(response.status).toBe(201);
    });
    it("failed register unique email", async () => {
      const body = {
        name: "ibu1 d ts",
        email: "ibu1@mail.com",
        password: "asdasd",
        location: "3674",
        phoneNumber: "+6280989921",
        role: "donor",
      };
      const response = await request(app).post("/registration").send(body);
      expect(response.status).toBe(400);
    });
    it("failed register no name input", async () => {
      const body = {
        name: "",
        email: "ibu2_test_nonameinput@mail.com",
        password: "asdasd",
        location: "3674",
        phoneNumber: "+6280989921",
        role: "donor",
      };
      const response = await request(app).post("/registration").send(body);
      expect(response.status).toBe(400);
    });
    it("failed register no email input", async () => {
      const body = {
        name: "ibu12",
        email: "",
        password: "asdasd",
        location: "3674",
        phoneNumber: "+6280989921",
        role: "donor",
      };
      const response = await request(app).post("/registration").send(body);
      expect(response.status).toBe(400);
    });
    it("failed register no password input", async () => {
      const body = {
        name: "ibu12",
        email: "ibu@mail.com",
        location: "3674",
        phoneNumber: "+6280989921",
        role: "donor",
      };
      const response = await request(app).post("/registration").send(body);
      expect(response.status).toBe(400);
    });
  });

  describe("Post /ktp-registration", () => {
    it("should success register with ktp", async () => {
      const filePath = path.resolve(__dirname, "./assets/ktp-suriah.jpeg");

      const imageBuffer = fs.readFileSync(filePath);

      const response = await request(app)
        .post("/ktp-registration")
        .attach("file", imageBuffer, "ktp-suriah.jpeg");
      expect(response.status).toBe(200);
    });
  });

  // describe("Post /detail", () => {
  //   it("should success create userDetail", async () => {
  //     const body = {
  //       babyName: "Bayi",
  //       babyDOB: new Date(),
  //       babyGender: "Name",
  //       bloodType: "O",
  //       bloodRhesus: "+",
  //       halal: true,
  //       egg: true,
  //       dairy: true,
  //       nuts: true,
  //       soy: true,
  //       seafood: true,
  //       flourOrWheat: true,
  //       redMeat: true,
  //       spicyFood: true,
  //       caffeine: true,
  //     };
  //     const response = await request(app)
  //       .post("/detail")
  //       .set("Authorization", `Bearer ${access_token_user}`)
  //       .send(body);
  //     expect(response.status).toBe(404);
  //   });
  // });
});

// describe("", () => {
//   describe("", () => {
//     it("", async () => {});
//   });
// });

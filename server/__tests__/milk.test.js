const request = require("supertest");
const app = require("../app");
const { createToken } = require("../utils/jwtoken");
const Milk = require("../models/milk");
const User = require("../models/user");
const UserDetail = require("../models/userDetail");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

let access_token_user;

beforeAll(async () => {
  mongoose.connect(process.env.MONGODB_TEST_CONNECTION_STRING);
  const user1 = await User.insertMany([
    {
      name: "ibu1 d ts",
      email: "ibu1_milk@mail.com",
      password: "$2a$10$vhZxxgMmWGcsDHWGUA5MSuP/wyk6SP.2Hi1vadQqLbLtdhiIkcpdW",
      location: "3674",
      phoneNumber: "+62809899012",
      role: "donor",
    },
    {
      name: "bapak1 r ts",
      email: "bapak1@mail.com",
      password: "$2a$10$vhZxxgMmWGcsDHWGUA5MSuP/wyk6SP.2Hi1vadQqLbLtdhiIkcpdW",
      location: "3674",
      phoneNumber: "+6280989902",
      role: "receiver",
    },
  ]);
  // console.log(user1);
  const usersDetail = await UserDetail.insertMany([
    {
      UserId: user1[0]._id,
      babyName: "Anto",
      babyDOB: "2024-01-11",
      babyGender: "male",
      bloodType: "B",
      bloodRhesus: "+",
      halal: true,
      egg: false,
      dairy: true,
      nuts: true,
      soy: true,
      seafood: false,
      flourOrWheat: false,
      redMeat: false,
      spicyFood: true,
      caffeine: false,
    },
    {
      UserId: user1[1]._id,
      babyName: "Anton",
      babyDOB: "2024-01-11",
      babyGender: "male",
      bloodType: "B",
      bloodRhesus: "+",
      halal: true,
      egg: false,
      dairy: true,
      nuts: true,
      soy: true,
      seafood: false,
      flourOrWheat: false,
      redMeat: false,
      spicyFood: true,
      caffeine: false,
    },
  ]);
  const milk1 = await Milk.insertMany({
    _id: new ObjectId("577f9d02d71d71fa1fb6f43b"),
    UserId: user1[0]._id,
    totalBags: 10,
    totalMl: 100,
    pumpDate: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const payloadUser = {
    userId: user1[0]._id,
    email: user1[0].email,
    role: user1[0].role,
  };
  console.log(payloadUser, "<<<<<<<<<<<<<<<<< test");

  access_token_user = createToken(payloadUser);
  console.log(access_token_user, "<<<<<<<<<<<< test");
});

afterAll(async () => {
  await User.deleteMany();
  await UserDetail.deleteMany();
  await Milk.deleteMany();
  mongoose.connection.close();
});

describe("/POST /milks", () => {
  describe("/POST /milks - succeed", () => {
    it("should create milk", async () => {
      const body = {
        totalBags: 10,
        totalMl: 100,
        pumpDate: new Date(),
      };
      const response = await request(app)
        .post("/milks")
        .set("Authorization", `Bearer ${access_token_user}`)
        .send(body);
      expect(response.status).toBe(201);
    });
  });

  describe("/POST /milks - failed", () => {
    it("should failed create milk - totalBags min. 1", async () => {
      const body = {
        totalBags: 0,
        totalMl: 10,
        pumpDate: new Date(),
      };
      const response = await request(app)
        .post("/milks")
        .set("Authorization", `Bearer ${access_token_user}`)
        .send(body);

      expect(response.status).toBe(400);
    });

    it("should failed create milk - totalMl min. 1", async () => {
      const body = {
        totalBags: 10,
        totalMl: 0,
        pumpDate: new Date(),
      };
      const response = await request(app)
        .post("/milks")
        .set("Authorization", `Bearer ${access_token_user}`)
        .send(body);

      expect(response.status).toBe(400);
    });

    it("should failed create milk - invalid token", async () => {
      const response = await request(app)
        .post("/milks")
        .set("Authorization", `Bearer asjdkasjdadjskl`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid access_token");
    });

    it("should failed create milk - no Authorization", async () => {
      const body = {
        totalBags: 10,
        totalMl: 5,
        pumpDate: new Date(),
      };
      const response = await request(app).post("/milks").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
  });
});

describe("/GET /milks", () => {
  describe("/GET /milks - succeed", () => {
    it("success get milks", async () => {
      const response = await request(app)
        .get("/milks")
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("success get milks", async () => {
      const location = "3674";
      const response = await request(app)
        .get(`/milks?location=${location}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("success get milks", async () => {
      const compability = "asc";
      const response = await request(app)
        .get(`/milks?compability=${compability}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("success get milks", async () => {
      const compability = "desc";
      const response = await request(app)
        .get(`/milks?compability=${compability}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("success get milks", async () => {
      const location = "3674";
      const compability = "asc";
      const response = await request(app)
        .get(`/milks?compability=${compability}&location=${location}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("success get milks", async () => {
      const location = "3674";
      const compability = "desc";
      const response = await request(app)
        .get(`/milks?compability=${compability}&location=${location}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Successfully get milks");
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
  });

  describe("/GET /milks - failed", () => {
    it("failed get milks - invalid token", async () => {
      const response = await request(app)
        .get("/milks")
        .set("Authorization", `Bearer salahhh`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid access_token");
    });

    it("failed get milks - unauthorized", async () => {
      const response = await request(app).get("/milks");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
  });
});

describe("/DELETE /milks", () => {
  describe("/DELETE /milks - succeed", () => {
    it("success delete milk", async () => {
      const params = "577f9d02d71d71fa1fb6f43b";
      const response = await request(app)
        .delete(`/milks/${params}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(200);
    });
  });

  describe("/DELETE /milks - failed", () => {
    it("failed delete milk - NotFound", async () => {
      const params = "577f9d02d71d71fa1fb6f43b";
      const response = await request(app)
        .delete(`/milks/${params}`)
        .set("Authorization", `Bearer ${access_token_user}`);

      expect(response.status).toBe(404);
    });
  });
});

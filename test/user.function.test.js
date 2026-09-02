require("dotenv").config();
const request = require("supertest");
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
const prisma = require("../db/prisma");
let agent;
let saveRes;
let logonRes;
const { app, server } = require("../app");

beforeAll(async () => {
  await prisma.Task.deleteMany();
  await prisma.User.deleteMany();
  agent = request.agent(app);
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

describe("register a user ", () => {
  let saveRes = null;

  it("46. it creates the user entry", async () => {
    const newUser = {
      name: "John Deere",
      email: "jdeere@example.com",
      password: "Pa$$word20",
    };
    saveRes = await agent.post("/api/users/register").send(newUser);
    expect(saveRes.status).toBe(201);
  });

  it("47. Registration returns an object with the expected name.", () => {
    expect(saveRes.body.user.name).toBe("John Deere");
  });

  it("48. The returned object includes a csrfToken.", () => {
    expect(saveRes.body.csrfToken).toBeDefined();
  });

  it("49. You can logon as the newly registered user.", async () => {
    const logonObj = {
      email: "jdeere@example.com",
      password: "Pa$$word20",
    };
    logonRes = await agent.post("/api/users/logon").send(logonObj);
    saveRes = logonRes;
    expect(logonRes.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("jwt=")]),
    );
  });

  it("50. Verify that you are logged in: /api/tasks should not return a 401", async () => {
    const res = await agent.get("/api/tasks");
    expect(res.status).not.toBe(401);
  });

  it("51. Verify that you can log out.", async () => {
    const csrfTokenFromLogonSession = logonRes.body.csrfToken;
    saveRes = await agent
      .post("/api/users/logoff")
      .set("X-CSRF-TOKEN", csrfTokenFromLogonSession)
      .send();
    expect(saveRes.status).toBe(200);
  });

  it("52. Make sure that you are really logged out: /api/tasks should now return a 401", async () => {
    const res = await agent.get("/api/tasks");
    expect(res.status).toBe(401);
  });
});

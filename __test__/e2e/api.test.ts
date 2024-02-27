import request from "supertest";
import { server } from "../../src/server";

describe("Reset", () => {
  it("returns status code 200 and response OK if database is reset.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 10 })
      .expect(201);
    await request(server).post("/reset").expect(200);
  });
});

describe("Balance", () => {
  it("returns status code 404 and response 0 if account_id doesnt exist in database.", async () => {
    await request(server)
      .get("/balance?account_id=1234")
      .expect(404)
      .then((req) => {
        expect(req.body).toEqual(0);
      });
  });
  it("returns status code 200 and response 10 for account_id that already exist.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 10 })
      .expect(201);
    await request(server)
      .get("/balance?account_id=100")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(10);
      });
  });
});

describe("Event / Deposit", () => {
  it("creates new account if it doesnt exist.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "200", amount: 10 })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ destination: { id: "200", balance: 10 } });
      });
  });
  it("returns the new account balance after deposit into an existing account.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "300", amount: 10 })
      .expect(201);
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "300", amount: 10 })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ destination: { id: "300", balance: 20 } });
      });
  });
  it("returns Validation Error if params are invalid for type deposit.", async () => {
    await request(server).post("/event").send({ type: "deposit" }).expect(400);
    await request(server)
      .post("/event")
      .send({ type: "deposit", amount: 10 })
      .expect(400);
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "100" })
      .expect(400);
  });
});

describe("Event / Withdraw", () => {
  it("returns status code 404 and response 0 if origin doesnt exist.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "withdraw", origin: "400", amount: 10 })
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual(0);
      });
  });
  it("returns new account balance after withdraw from an existing account.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "400", amount: 20 })
      .expect(201);
    await request(server)
      .post("/event")
      .send({ type: "withdraw", origin: "400", amount: 10 })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ origin: { id: "400", balance: 10 } });
      });
  });
  it("returns Validation Error if params are invalid for type withdraw.", async () => {
    await request(server).post("/event").send({ type: "withdraw" }).expect(400);
    await request(server)
      .post("/event")
      .send({ type: "withdraw", amount: 10 })
      .expect(400);
    await request(server)
      .post("/event")
      .send({ type: "withdraw", origin: "100" })
      .expect(400);
  });
});

describe("Event / Transfer", () => {
  it("returns status code 404 and response 0 if origin account doesnt exist.", async () => {
    await request(server)
      .post("/event")
      .send({
        type: "transfer",
        origin: "500",
        amount: 20,
        destination: "600",
      })
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual(0);
      });
  });
  it("returns origin and destination account balance after transfer.", async () => {
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "500", amount: 20 })
      .expect(201);
    await request(server)
      .post("/event")
      .send({ type: "deposit", destination: "600", amount: 10 })
      .expect(201);
    await request(server)
      .post("/event")
      .send({
        type: "transfer",
        origin: "500",
        destination: "600",
        amount: 20,
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          origin: { id: "500", balance: 0 },
          destination: { id: "600", balance: 30 },
        });
      });
  });
  it("returns Validation Error if params are invalid for type transfer.", async () => {
    await request(server).post("/event").send({ type: "transfer" }).expect(400);
  });
});

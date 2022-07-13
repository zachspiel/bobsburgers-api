process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { testEndpoint } from "./root";

chai.use(chaiHttp);

const TOTAL_STORES_NEXT_DOOR = 227;

describe("Stores Next Door", () => {
  describe("/GET storeNextDoor", () => {
    it("it should GET all the stores next door", async () => {
      return testEndpoint("/storeNextDoor").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_STORES_NEXT_DOOR);
      });
    });
  });

  describe("/GET storeNextDoor/1", () => {
    it("it should GET the first store next door with an id of 1", async () => {
      return testEndpoint("/storeNextDoor/1").then((result) => {
        const { body } = result;
        expect(body.id).to.equal(1);
        expect(body.name).to.equal("P.F.E.T.A");
      });
    });
  });

  describe("/GET storeNextDoor?limit=2", () => {
    it("it should GET the first two stores next door", async () => {
      return testEndpoint("/storeNextDoor?limit=2").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(2);
      });
    });
  });

  describe("/GET storeNextDoor/[1,2,3]", () => {
    it("it should GET the first three stores next door", async () => {
      return testEndpoint("/storeNextDoor/[1,2,3]").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET storeNextDoor/1,2,3", () => {
    it("it should GET the first three stores next door", async () => {
      return testEndpoint("/storeNextDoor/1,2,3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET storeNextDoor?skip=3", () => {
    it("it should GET the fourth store next door", async () => {
      return testEndpoint("/storeNextDoor?skip=3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_STORES_NEXT_DOOR - 3);
      });
    });
  });
});

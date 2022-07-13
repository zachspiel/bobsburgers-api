process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { testEndpoint } from "./root";

chai.use(chaiHttp);

const TOTAL_EPISODES = 228;

describe("Episodes", () => {
  describe("/GET episodes", () => {
    it("it should GET all the episodes", async () => {
      return testEndpoint("/episodes").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_EPISODES);
      });
    });
  });

  describe("/GET episodes/1", () => {
    it("it should GET the first episode with an id of 1", async () => {
      return testEndpoint("/episodes/1").then((result) => {
        const { body } = result;
        expect(body.id).to.equal(1);
        expect(body.name).to.equal('"Human Flesh" (a.k.a. "Pilot")');
      });
    });
  });

  describe("/GET episodes?limit=2", () => {
    it("it should GET the first two episodes", async () => {
      return testEndpoint("/episodes?limit=2").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(2);
      });
    });
  });

  describe("/GET episodes/[1,2,3]", () => {
    it("it should GET the first three episodes", async () => {
      return testEndpoint("/episodes/[1,2,3]").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET episodes/1,2,3", () => {
    it("it should GET the first three episodes", async () => {
      return testEndpoint("/episodes/1,2,3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET episodes?skip=3", () => {
    it("it should GET the fourth episode", async () => {
      return testEndpoint("/episodes?skip=3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_EPISODES - 3);
      });
    });
  });
});

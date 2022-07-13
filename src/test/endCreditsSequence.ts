process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { testEndpoint } from "./root";

chai.use(chaiHttp);

const TOTAL_END_CREDIT_SEQUENCES = 228;

describe("End Credits Sequences", () => {
  describe("/GET endCreditsSequence", () => {
    it("it should GET all the end credits sequences", async () => {
      return testEndpoint("/endCreditsSequence").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_END_CREDIT_SEQUENCES);
      });
    });
  });

  describe("/GET endCreditsSequence/1", () => {
    it("it should GET the first end credits sequence with an id of 1", async () => {
      return testEndpoint("/endCreditsSequence/1").then((result) => {
        const { body } = result;
        expect(body.id).to.equal(1);
      });
    });
  });

  describe("/GET endCreditsSequence?limit=2", () => {
    it("it should GET the first two end credits sequences", async () => {
      return testEndpoint("/endCreditsSequence?limit=2").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(2);
      });
    });
  });

  describe("/GET endCreditsSequence/[1,2,3]", () => {
    it("it should GET the first three end credits sequences", async () => {
      return testEndpoint("/endCreditsSequence/[1,2,3]").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET endCreditsSequence/1,2,3", () => {
    it("it should GET the first three end credits sequences", async () => {
      return testEndpoint("/endCreditsSequence/1,2,3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET endCreditsSequence?skip=3", () => {
    it("it should GET the fourth end credits sequence", async () => {
      return testEndpoint("/endCreditsSequence?skip=3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_END_CREDIT_SEQUENCES - 3);
      });
    });
  });
});

process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { testEndpoint } from "./root";

chai.use(chaiHttp);

const TOTAL_PEST_CONTROL_TRUCKS = 225;

describe("Pest Control Trucks", () => {
  describe("/GET pestControlTruck", () => {
    it("it should GET all the pest control trucks", async () => {
      return testEndpoint("/pestControlTruck").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_PEST_CONTROL_TRUCKS);
      });
    });
  });

  describe("/GET pestControlTruck/1", () => {
    it("it should GET the first pest control truck with an id of 1", async () => {
      return testEndpoint("/pestControlTruck/1").then((result) => {
        const { body } = result;
        expect(body.id).to.equal(1);
        expect(body.name).to.equal(`Rat's all Folks! EXTERMINATORS`);
      });
    });
  });

  describe("/GET pestControlTruck?limit=2", () => {
    it("it should GET the first two pest control trucks", async () => {
      return testEndpoint("/pestControlTruck?limit=2").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(2);
      });
    });
  });

  describe("/GET pestControlTruck/[1,2,3]", () => {
    it("it should GET the first three pest control trucks", async () => {
      return testEndpoint("/pestControlTruck/[1,2,3]").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET pestControlTruck/1,2,3", () => {
    it("it should GET the first three pest control truck", async () => {
      return testEndpoint("/pestControlTruck/1,2,3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET pestControlTruck?skip=3", () => {
    it("it should GET the fourth pest control truck", async () => {
      return testEndpoint("/pestControlTruck?skip=3").then((result) => {
        const { body } = result;
        expect(body).to.have.lengthOf(TOTAL_PEST_CONTROL_TRUCKS - 3);
      });
    });
  });
});

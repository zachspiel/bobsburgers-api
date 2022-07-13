process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import { expect } from "chai";

chai.use(chaiHttp);

const TOTAL_CHARACTERS = 501;
export const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe("Root Endpoint", () => {
  describe("/GET /", () => {
    it("it should GET all the available endpoints", async () => {
      return testEndpoint("/").then((result) => {
        const { body } = result;
        expect(body).to.have.keys([
          "characters",
          "burgerOfTheDay",
          "episodes",
          "storeNextDoor",
          "pestControlTruck",
          "endCreditsSequence",
        ]);
      });
    });
  });

  describe("/GET character", () => {
    it("it should respond with an error message", async () => {
      return testEndpoint("/character").then((result) => {
        const { body } = result;

        expect(body.error).to.equal(
          "Error while getting data for route: character. Available options are: characters, episodes, pestControlTrucks, endCreditsSequence or storeNextDoor."
        );
      });
    });
  });
});

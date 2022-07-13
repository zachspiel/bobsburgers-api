process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import { expect } from "chai";

chai.use(chaiHttp);

const TOTAL_CHARACTERS = 506;
const testEndpoint = async (pathname: string) => {
  return chai.request(server).get(pathname);
};

describe("Characters", () => {
  describe("/GET characters", () => {
    it("it should GET all the characters", async () => {
      return testEndpoint("/characters").then((result) => {
        expect(result.body).to.have.lengthOf(TOTAL_CHARACTERS);
      });
    });
  });

  describe("/GET characters/1", () => {
    it("it should GET the first character with an id of 1", async () => {
      return testEndpoint("/characters/1").then((result) => {
        const { body } = result;
        expect(body.id).to.equal(1);
        expect(body.name).to.equal('"Dottie Minerva"');
      });
    });
  });

  describe("/GET characters/1000", () => {
    it("it should GET an error for a character with id 1000", async () => {
      return testEndpoint("/characters/1000").then((result) => {
        const { body } = result;
        expect(body.error).to.equal(
          "Error while retreiving data with id 1000 in route characters."
        );
      });
    });
  });

  describe("/GET characters?limit=5", () => {
    it("it should GET the first five characters", async () => {
      return testEndpoint("/characters?limit=5").then((result) => {
        const { body } = result;

        expect(body).to.have.lengthOf(5);
      });
    });
  });

  describe("/GET characters/[1,2,3]", () => {
    it("it should GET the first three characters", async () => {
      return testEndpoint("/characters/[1,2,3]").then((result) => {
        const { body } = result;

        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET characters/1,2,3", () => {
    it("it should GET the first three characters", async () => {
      return testEndpoint("/characters/1,2,3").then((result) => {
        const { body } = result;

        expect(body).to.have.lengthOf(3);
      });
    });
  });

  describe("/GET characters?skip=5", () => {
    it("it should skip the first five characters", async () => {
      return testEndpoint("/characters?skip=5").then((result) => {
        const { body } = result;

        expect(body).to.have.lengthOf(TOTAL_CHARACTERS - 5);
      });
    });
  });

  describe("/GET characters?sortBy=name&OrderBy=desc&limit=1", () => {
    it("it should GET the last character Zeke", async () => {
      return testEndpoint("/characters?sortBy=name&OrderBy=desc&limit=1").then(
        (result) => {
          const { body } = result;

          expect(body).to.have.lengthOf(1);
          expect(body[0].id).to.equal(TOTAL_CHARACTERS);
        }
      );
    });
  });
});

import { Request, response, Response } from "express";
import { QueryOptions } from "mongoose";
import Characters from "../models/characterModel";
import EndCredits from "../models/endCreditModel";
import Episodes from "../models/episodeModel";
import PestControlTrucks from "../models/pestControlTruckModel";
import StoreNextDoor from "../models/storeModel";
import BurgerOfTheDay from "../models/burgerOfTheDayModel";

import {
  getArrayParameters,
  getFilters,
  getOptions,
  isArray,
  isCommaSeparated,
} from "../util/util";

const ROUTES = [
  "characters",
  "episodes",
  "pestControlTruck",
  "endCreditsSequence",
  "storeNextDoor",
  "burgerOfTheDay",
];

const MAX_DOCUMENTS = 600;

const models = {
  characters: Characters,
  episodes: Episodes,
  pestControlTruck: PestControlTrucks,
  storeNextDoor: StoreNextDoor,
  endCreditsSequence: EndCredits,
  burgerOfTheDay: BurgerOfTheDay,
};

const getRootData = async (req: Request, res: Response) => {
  const data = {
    characters: "https://bobsburgers-api.herokuapp.com/characters/",
    episodes: "https://bobsburgers-api.herokuapp.com/episodes/",
    storeNextDoor: "https://bobsburgers-api.herokuapp.com/storeNextDoor/",
    pestControlTruck: "https://bobsburgers-api.herokuapp.com/pestControlTruck/",
    endCreditsSequence: "https://bobsburgers-api.herokuapp.com/endCreditsSequence/",
    burgerOfTheDay: "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/",
  };

  return res.status(200).json(data);
};

const getAllResourcesInEndpoint = async (req: Request, res: Response) => {
  const route = req.params.route;

  if (!ROUTES.includes(route)) {
    return sendErrorMessage(
      `Error while getting data for route: ${route}. Available options are: characters, episodes, pestControlTrucks, endCreditsSequence or storeNextDoor.`,
      res
    );
  }

  const filters = getFilters(req);
  getData(route, filters, getOptions(req))
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return sendErrorMessage(
        `Error while getting data for route: ${route}. ${error.message}`,
        res
      );
    });
};

const getResourceById = async (req: Request, res: Response) => {
  const route = req.params.route;
  const id = req.params.id;
  let includeMultipleResults = false;
  let filter = {};

  const errorMessage = `Error while retreiving data with id ${id} in route ${route}.`;

  if (!ROUTES.includes(route) || id === undefined) {
    return sendErrorMessage(errorMessage, res);
  }

  if (isArray(id) || isCommaSeparated(id)) {
    filter = getArrayParameters(id);
    includeMultipleResults = true;
  } else if (!isArray(id) && !isNaN(parseInt(id))) {
    filter = { id: parseInt(id) };
  }

  getData(route, filter, {})
    .then((result) => {
      if (result.length === 0) {
        return sendErrorMessage(errorMessage, res);
      }

      return includeMultipleResults ? res.json(result) : res.json(result[0]);
    })
    .catch((error) => {
      return sendErrorMessage(
        `Error while getting data for route: ${route}. ${error.message}`,
        res
      );
    });
};

const getData = async (
  route: String,
  data: Record<string, unknown>,
  options: QueryOptions
) => {
  for (const [key, model] of Object.entries(models)) {
    if (key === route) {
      return await model
        .find(data, "-_id")
        .sort(options.sort ?? { id: 1 })
        .limit(options.limit ?? MAX_DOCUMENTS)
        .skip(options.skip ?? 0);
    }
  }

  return [];
};

const sendErrorMessage = (message: string, response: Response) => {
  return response.status(500).json({ error: message });
};

export default { getRootData, getAllResourcesInEndpoint, getResourceById };

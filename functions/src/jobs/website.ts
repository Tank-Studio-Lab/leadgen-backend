import * as functions from "firebase-functions";
import { checkWebsiteUpController } from "../controllers/website";
const timeZone = "America/Mexico_City";

export const checkWebsitesUpjob = functions.pubsub
  .schedule("every 30 minutes")
  .timeZone(timeZone)
  .onRun(async (context) => {
    try {
      await checkWebsiteUpController();
    } catch (error) {
      console.log(error);
    }
  });

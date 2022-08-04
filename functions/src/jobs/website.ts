import * as functions from "firebase-functions";
import {
  checkWebsiteUpController,
  // getSslDetailsController,
} from "../controllers/website";
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
/*
export const checkWebsiteSSlJob = functions.pubsub
  .schedule("55 23 * * *")
  .timeZone(timeZone)
  .onRun(async (context) => {
    try {
      await getSslDetailsController();
    } catch (error) {
      console.log(error);
    }
  });*/

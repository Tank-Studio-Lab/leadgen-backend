import { addWebsiteToCollection } from "../controllers/places";
import { Place } from "../types/place";

const functions = require("firebase-functions");

export const addPlaceTrigger = functions.firestore
  .document(
    "countries/{countryId}/{statesCollection}/{stateId}/{citiesCollection}/{cityId}/{placesCollection}/{placeId}"
  )
  .onCreate(async (snap: any, context: any) => {
    const place = snap.data() as Place;
    await addWebsiteToCollection(place, context);
  });

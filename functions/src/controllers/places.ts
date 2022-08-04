import * as admin from "firebase-admin";
import { socialMedias } from "../modules/helpers/list";
import { Place } from "../types/place";
const firestore = admin.firestore();
export const addWebsiteToCollection = async (place: Place, context: any) => {
  try {
    const ref = firestore.collection("websites").doc();
    let isSocialMedia = false;
    if (!place.website) {
      console.log("No website");
      return;
    }
    if (socialMedias.some((v) => place.website.includes(v))) {
      isSocialMedia = true;
    }
    console.log(isSocialMedia);
    const data = {
      website: place.website,
      isSocialMedia,
      placeId: place.place_id,
      businessName: place.name,
      country: context.params.countryId,
      state: context.params.stateId,
      city: context.params.cityId,
      sslScan: false,
      pageSpeedScan: false,
      seoScan: false,
      id: ref.id,
    };
    await ref.set(data);
  } catch (error) {
    console.log(error);
  }
};

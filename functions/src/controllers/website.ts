import * as admin from "firebase-admin";
import { websiteUp } from "../modules/website/service";
const firestore = admin.firestore();

export const checkWebsiteUpController = async () => {
  try {
    const ref = firestore
      .collection("websites")
      .where("isSocialMedia", "==", false);
    const allWebsites = await ref.get();
    for (const doc of allWebsites.docs) {
      const data = doc.data();
      const url = data.website;
      const websiteIsUp = await websiteUp(url);
      const websiteRef = firestore
        .collection("websites")
        .doc(doc.id)
        .collection("status")
        .doc();
      await websiteRef.set(websiteIsUp);
    }
  } catch (error) {
    console.log(error);
  }
};

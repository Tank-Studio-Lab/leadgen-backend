import * as admin from "firebase-admin";
import { Request, Response } from "firebase-functions";
import {
  successResponse,
  insufficientParameters,
  failureResponse,
} from "../modules/common/service";
import { User } from "../modules/user/model";
import { getUserPhotoUrl } from "../modules/user/service";
import { sendEmail, resetPasswordEmail } from "../modules/mailgun/service";
const bucket = admin.storage().bucket();
const db = admin.firestore();
const auth = admin.auth();

const actionCodeSettings = {
  url: "https://app.tankstudiolab.com",
  handleCodeInApp: true,
  dynamicLinkDomain: "tankstudiolab.page.link",
};

export const getUserPhotoUrlController = async (user: User) => {
  try {
    if (user.displayName) {
      const img = await getUserPhotoUrl(user.displayName);
      const file = bucket.file(`users/${user.uid}/profile-photo.svg`);
      await file.save(img);
      const signedUrl = file.publicUrl();
      const url = signedUrl[0];
      console.log(`Image url = ${url}`);
      const ref = db.doc(`users/${user.uid}`);
      await ref.update({ photoURL: url });
      await auth.updateUser(user.uid, { photoURL: url });
    } else {
      console.log(`User ${user.uid} has no display name`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUserController = async (user: User) => {
  const { uid, email, displayName } = user;
  try {
    const user = await admin.auth().createUser({
      uid,
      email,
      emailVerified: false,
      password: generatePassword(),
      displayName,
      disabled: false,
    });

    const to = "hello@giovanirodriguez.dev";
    const subject = "Created new user";
    const text = `${user.displayName} with user uid ${user.uid} was created successfully `;

    await sendEmail(to, subject, text);
    console.log(user);
  } catch (error) {
    const to = "hello@giovanirodriguez.dev";
    const subject = "Error creating user";
    const text = (error as { message: string }).message;

    await sendEmail(to, subject, text);
  }
};

export const deleteUserController = async (user: User) => {
  const { uid, displayName } = user;
  try {
    await admin.auth().deleteUser(uid);

    const to = "hello@giovanirodriguez.dev";
    const subject = "Deleted user";
    const text = `${displayName} with user uid ${uid} was deleted successfully `;
    await sendEmail(to, subject, text);
  } catch (error) {
    const to = "hello@giovanirodriguez.dev";
    const subject = "Error deleting user";
    const text = (error as { message: string }).message;

    await sendEmail(to, subject, text);
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) {
    return insufficientParameters(res);
  }
  try {
    const link = await admin
      .auth()
      .generatePasswordResetLink(email as string, actionCodeSettings);
    console.log(link);
    await resetPasswordEmail(link, email as string);
    return successResponse("Email sent successfully", {}, res);
  } catch (error) {
    return failureResponse((error as { message: string }).message, error, res);
  }
};

const generatePassword = () => {
  var length = 14,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

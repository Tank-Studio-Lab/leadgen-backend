const admin = require("firebase-admin");
admin.initializeApp();

// Triggers
import { addPlaceTrigger } from "./triggers/places";

exports.addPlaceTrigger = addPlaceTrigger;

// jobs
import { checkWebsitesUpjob } from "./jobs/website";

exports.checkWebsiteUpJob = checkWebsitesUpjob;
//exports.checkWebsiteSSlJob = checkWebsiteSSlJob;

import * as admin from "firebase-admin";

admin.initializeApp();

import { createDao } from "./api/createDao";
import { getDaoInfo } from "./api/getDaoInfo";

module.exports = { createDao, getDaoInfo };

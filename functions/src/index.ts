import * as admin from "firebase-admin";

admin.initializeApp();

import { addDao } from "./api/addDao";
import { getDaoInfo } from "./api/getDaoInfo";

module.exports = { addDao, getDaoInfo };

import * as admin from "firebase-admin";

admin.initializeApp();

import { createDao } from "./api/createDao";
import { getDaoInfo } from "./api/getDaoInfo";
import { getIsWeb3 } from "./api/getIsWeb3";
import { getPollDetail } from "./api/getPollDetail";
import { candidateToCurrentPoll } from "./api/candidateToCurrentPoll";
import {migrateDao} from "./api/web3Migration/migrateDao";
module.exports = { 
    createDao,
     getDaoInfo,
     getIsWeb3, 
     getPollDetail, 
     candidateToCurrentPoll ,
     migrateDao
    };

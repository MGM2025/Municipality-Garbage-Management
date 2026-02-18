const express = require('express');
const route = express.Router();
const { submitReqCollection, getAllreqCollection, editReqCollectionStatus } = require('../controllers/reqCollection.controllers');

route.get("/getAllReqCollections", getAllreqCollection);
route.get("/getAllReqCollections/:reqId", getAllreqCollection);
route.post("/editReqCollectionStatus/:reqId", editReqCollectionStatus);

module.exports = route;
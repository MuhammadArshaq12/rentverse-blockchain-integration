const express = require("express");

const {
    getBlockchainStatus,
    getContractInfo,
    getTokenDetails,
    getWalletBalance,
    prepareMintTransaction
} = require("../controllers/blockchainController");

const router = express.Router();

router.get("/status", getBlockchainStatus);

router.get("/real-estate/info", getContractInfo);

router.get("/real-estate/token/:tokenId", getTokenDetails);

router.get("/real-estate/balance/:address", getWalletBalance);

router.post(
    "/real-estate/mint",
    prepareMintTransaction
);

module.exports = router;
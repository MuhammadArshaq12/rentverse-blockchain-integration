const {
    getNetworkStatus,
    getContractInfo,
    getTokenDetails,
    getWalletBalance,
    prepareMintTransaction
} = require("../blockchain/realEstate");

// Blockchain / network status
exports.getBlockchainStatus = async (req, res) => {
    try {
        const data = await getNetworkStatus();

        res.status(200).json({
            success: true,
            ...data
        });
    } catch (error) {
        console.error("Blockchain status error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to connect to blockchain",
            error: error.message
        });
    }
};

// Real Estate contract information
exports.getContractInfo = async (req, res) => {
    try {
        const data = await getContractInfo();

        res.status(200).json({
            success: true,
            ...data
        });
    } catch (error) {
        console.error("Contract info error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to read contract information",
            error: error.message
        });
    }
};

// Get NFT details
exports.getTokenDetails = async (req, res) => {
    try {
        const { tokenId } = req.params;

        if (!/^\d+$/.test(tokenId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid token ID"
            });
        }

        const data = await getTokenDetails(tokenId);

        res.status(200).json({
            success: true,
            ...data
        });
    } catch (error) {
        console.error("Token details error:", error);

        res.status(404).json({
            success: false,
            message: "Token not found or blockchain query failed",
            error: error.message
        });
    }
};

// Get wallet NFT balance
exports.getWalletBalance = async (req, res) => {
    try {
        const { address } = req.params;

        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            return res.status(400).json({
                success: false,
                message: "Invalid wallet address"
            });
        }

        const data = await getWalletBalance(address);

        res.status(200).json({
            success: true,
            ...data
        });
    } catch (error) {
        console.error("Wallet balance error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch wallet balance",
            error: error.message
        });
    }
};

exports.prepareMintTransaction = async (req, res) => {
    try {
        const { tokenURI } = req.body;

        if (!tokenURI || typeof tokenURI !== "string") {
            return res.status(400).json({
                success: false,
                message: "tokenURI is required"
            });
        }

        const transaction = await prepareMintTransaction(tokenURI);

        res.status(200).json({
            success: true,
            transaction
        });
    } catch (error) {
        console.error("Mint transaction preparation error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to prepare mint transaction",
            error: error.message
        });
    }
};
const { ethers } = require("ethers");

const CONTRACT_ADDRESS =
    process.env.REAL_ESTATE_CONTRACT_ADDRESS;

const ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function balanceOf(address owner) view returns (uint256)",
    "function mint(string tokenURI) returns (uint256)"
];

const getProvider = () => {
    const rpcUrl = process.env.SEPOLIA_RPC_URL;

    if (!rpcUrl) {
        throw new Error("SEPOLIA_RPC_URL is not configured");
    }

    return new ethers.providers.JsonRpcProvider(rpcUrl);
};

const getContract = () => {
    if (!CONTRACT_ADDRESS) {
        throw new Error(
            "REAL_ESTATE_CONTRACT_ADDRESS is not configured"
        );
    }

    return new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        getProvider()
    );
};

const getNetworkStatus = async () => {
    const provider = getProvider();

    const network = await provider.getNetwork();
    const latestBlock = await provider.getBlockNumber();

    return {
        network: network.name,
        chainId: network.chainId,
        latestBlock,
        contractAddress: CONTRACT_ADDRESS
    };
};

const getContractInfo = async () => {
    const contract = getContract();

    const [name, symbol, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply()
    ]);

    return {
        contractAddress: CONTRACT_ADDRESS,
        name,
        symbol,
        totalSupply: totalSupply.toString()
    };
};

const getTokenDetails = async (tokenId) => {
    const contract = getContract();

    const [owner, tokenURI] = await Promise.all([
        contract.ownerOf(tokenId),
        contract.tokenURI(tokenId)
    ]);

    return {
        tokenId: tokenId.toString(),
        owner,
        tokenURI
    };
};

const getWalletBalance = async (address) => {
    const contract = getContract();

    const balance = await contract.balanceOf(address);

    return {
        address,
        balance: balance.toString()
    };
};

const prepareMintTransaction = async (tokenURI) => {
    if (!tokenURI || typeof tokenURI !== "string") {
        throw new Error("tokenURI is required");
    }

    const contract = getContract();

    const data = contract.interface.encodeFunctionData("mint", [
        tokenURI
    ]);

    return {
        to: CONTRACT_ADDRESS,
        data,
        value: "0x0"
    };
};

module.exports = {
    getProvider,
    getContract,
    getNetworkStatus,
    getContractInfo,
    getTokenDetails,
    getWalletBalance,
    prepareMintTransaction,
    CONTRACT_ADDRESS
};
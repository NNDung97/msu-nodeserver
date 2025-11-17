import * as accService from '../services/account.service.js';

export const getAccountCharacters = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const { pageNo } = req.query;
        const pageSize = 10; // Cố định pageSize là 6
        const characters = await accService.getAccountCharacters(walletAddress, pageNo, pageSize);
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAccountCurrency = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        console.log('Fetching currencies for wallet address:', walletAddress);
        const currencies = await accService.getAccountCurrency(walletAddress);
        res.json(currencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAccountItems = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        console.log('Fetching items for wallet address:', walletAddress);
        const items = await accService.getAccountItems(walletAddress);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAccountNeso = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        console.log('Fetching Neso for wallet address:', walletAddress);
        const neso = await accService.getAccountNeso(walletAddress);
        res.json(neso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

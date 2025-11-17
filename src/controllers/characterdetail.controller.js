import * as characterDetailService from '../services/character.service.js';

export const getCharacterDetails = async (req, res) => {
    try {
        const { accessKey } = req.params;
        console.log('Fetching details for character access key:', accessKey);
        const characterDetails = await characterDetailService.getCharacterDetails(accessKey);
        res.json(characterDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCharacterEquipment = async (req, res) => {
    try {
        const { accessKey } = req.params;
        console.log('Fetching equipment for character access key:', accessKey);
        const characterEquipment = await characterDetailService.getCharacterEquipment(accessKey);
        res.json(characterEquipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCharacterHyperStats = async (req, res) => {
    try {
        const { accessKey } = req.params;
        console.log('Fetching hyper stats for character access key:', accessKey);
        const characterHyperStats = await characterDetailService.getCharacterHyperStats(accessKey);
        res.json(characterHyperStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCharacterApStats = async (req, res) => {
    try {
        const { accessKey } = req.params;
        console.log('Fetching AP stats for character access key:', accessKey);
        const characterApStats = await characterDetailService.getCharacterApStats(accessKey);
        res.json(characterApStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
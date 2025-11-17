import * as iDService from '../services/Itemdetail.service.js';

export const getItemDetails = async (req, res) => {
  const { assetKey } = req.params;
  try {
    const itemDetails = await iDService.getItemDetails(assetKey);
    res.json(itemDetails);
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
};

export const getItemDetailsWithItemID = async (req, res) => {
  const { itemID } = req.params;
  try {
    const itemDetails = await iDService.getItemDetailsWithItemID(itemID);
    res.json(itemDetails);
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
};

export const getItemSet = async (req, res) => {
  const { itemId } = req.params;
  try {
    console.log('Received request for itemId:', itemId);
    const itemSet = await iDService.getItemSet(itemId);
    res.json(itemSet);
  } catch (error) {
    console.error('Error fetching item set:', error);
    res.status(500).json({ error: 'Failed to fetch item set' });
  }
};
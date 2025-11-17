import axios from 'axios';


export const getItemDetails = async (assetKey) => {
  const url = `${process.env.MSU_URL}/items/${assetKey}/common`;
  const url2 = `${process.env.MSU_URL}/items/${assetKey}/stats`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response2 = await axios.get(url2, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return { ...response.data, stats: response2.data };
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

export const getItemDetailsWithItemID = async (itemID) => {
  const url = `${process.env.MSU_URL}/gamemeta/items/${itemID}/common`;
  const url2 = `${process.env.MSU_URL}/gamemeta/items/${itemID}/stats`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response2 = await axios.get(url2, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return { ...response.data, stats: response2.data };
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

export const getItemSet = async (itemId) => {
  const url = `${process.env.MSU_URL}/gamemeta/items/${itemId}/set`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching item set:', error);
    throw error;
  }
};

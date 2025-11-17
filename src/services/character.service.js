import axios from 'axios';

export const getCharacterDetails = async (accessKey) => {
  const url = `${process.env.MSU_URL}/characters/${accessKey}/common`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('check get char',error.response?.data || error.message);
    throw new Error('Không thể lấy thông tin nhân vật');
  }
}

export const getCharacterEquipment = async (accessKey) => {
  const url = `${process.env.MSU_URL}/characters/${accessKey}/wearing`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error('Không thể lấy thông tin trang bị nhân vật');
  }
}

export const getCharacterHyperStats = async (accessKey) => {
  const url = `${process.env.MSU_URL}/characters/${accessKey}/hyper-stat`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error('Không thể lấy thông tin hyper stats nhân vật');
  }
}

export const getCharacterApStats = async (accessKey) => {
  const url = `${process.env.MSU_URL}/characters/${accessKey}/ap-stat`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error('Không thể lấy thông tin AP stats nhân vật');
  }
}

import axios from 'axios';

export const getAccountCharacters = async (walletAddress, pageNo, pageSize) => {
  console.log('check wallet', walletAddress);
  
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/characters?paginationParam.pageNo=${pageNo}&paginationParam.pageSize=${pageSize}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('check get account char',error.response?.data || error.message);
    throw new Error('Không thể lấy thông tin tài khoản');
  }
};

export const getAccountCurrency = async (walletAddress) => {
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/currencies`;
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
    throw new Error('Không thể lấy thông tin tài khoản');
  }
};

export const getAccountItems = async (walletAddress) => {
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/items`;
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
    throw new Error('Không thể lấy thông tin tài khoản');
  }
};

export const getAccountNeso = async (walletAddress) => {
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/neso`;
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
    throw new Error('Không thể lấy thông tin tài khoản');
  }
};

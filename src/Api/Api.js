import { cryptoData, cryptoAssets } from '../data';

const simulateRequest = (data, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const fakeFetchCrypto = () => simulateRequest(cryptoData);

export const fetchAssets = () => simulateRequest(cryptoAssets);

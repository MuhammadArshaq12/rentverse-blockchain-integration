const API_BASE_URL = 'http://127.0.0.1:3099/api';

export const getBlockchainStatus = async () => {
  const response = await fetch(
    `${API_BASE_URL}/blockchain/status`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blockchain status');
  }

  return response.json();
};

export const getContractInfo = async () => {
  const response = await fetch(
    `${API_BASE_URL}/blockchain/real-estate/info`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch contract information');
  }

  return response.json();
};

export const prepareMintTransaction = async (tokenURI) => {
  const response = await fetch(
    `${API_BASE_URL}/blockchain/real-estate/mint`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenURI,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || 'Failed to prepare mint transaction'
    );
  }

  return data.transaction;
};
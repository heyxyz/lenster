import LensEndpoint from '@hey/data/lens-endpoints';

/**
 * Validate lens account using Lens API verify endpoint
 * @param accessToken Lens access token
 * @param isMainnet Is mainnet
 * @returns Is valid lens account or not
 */
const validateLensAccount = async (accessToken: string, isMainnet: boolean) => {
  const response = await fetch(
    isMainnet ? LensEndpoint.Mainnet : LensEndpoint.Testnet,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-agent': 'Hey.xyz'
      },
      body: JSON.stringify({
        query: `
          query Verify {
            verify(request: { accessToken: "${accessToken}" })
          }
        `
      })
    }
  );

  const json: { data: { verify: boolean } } = await response.json();

  return json.data.verify;
};

export default validateLensAccount;

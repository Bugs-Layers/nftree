import { createThirdwebClient } from 'thirdweb';
import { env } from '~/env';

const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

export const client = createThirdwebClient(secretKey ? { secretKey } : { clientId }) 
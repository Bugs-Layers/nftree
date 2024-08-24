import { createThirdwebClient } from 'thirdweb';
import { env } from '~/env';

const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = env.THIRDWEB_SECRET_KEY;

export const twClient = createThirdwebClient(secretKey ? { secretKey } : { clientId }) 
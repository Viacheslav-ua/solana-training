import { airdropIfRequired } from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

export const airdrop = async (key: string) => {
  const connection = new Connection(clusterApiUrl("devnet"));
  if (!connection) process.exit(1);
  const publicKey = new PublicKey(key);
  try {
    const balance = await airdropIfRequired(
      connection,
      publicKey,
      1 * LAMPORTS_PER_SOL,
      0.2 * LAMPORTS_PER_SOL
    );
    console.log(balance);
  } catch (error) {
    console.log('Error: ', error);
  }
};

airdrop('9z7uYi1HuhYDsrPoQ8j4PU6XHSht3uiBQD8PjyHxQNrj');



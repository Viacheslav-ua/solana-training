import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

if (!connection) process.exit(1);
console.log(`⚡️ Connected to devnet`);

let publicKeyString = process.env["PUBLIC_KEY"] || "9z7uYi1HuhYDsrPoQ8j4PU6XHSht3uiBQD8PjyHxQNrj";

const publicKey = new PublicKey(publicKeyString);
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);
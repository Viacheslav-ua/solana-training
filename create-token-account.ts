import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount  } from "@solana/spl-token";
import bs58 from "bs58";

const privateKey = process.env["PRIVATE_KEY_SLV"];
if (privateKey === undefined) {
  console.log("Add PRIVATE_KEY_SLV to .env!");
  process.exit(1);
}
const pk = bs58.decode(privateKey);
const sender = Keypair.fromSecretKey(pk);
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey("AE7AqHZwLw9nvPSpvYFDwwWp68dBsEzQqknWqWguQt1h");
const recipient = new PublicKey("9z7uYi1HuhYDsrPoQ8j4PU6XHSht3uiBQD8PjyHxQNrj");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token account: ${link}`);
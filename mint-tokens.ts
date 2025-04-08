import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
import bs58 from "bs58";

const privateKey = process.env["PRIVATE_KEY_SLV"];
if (privateKey === undefined) {
  console.log("Add PRIVATE_KEY_SLV to .env!");
  process.exit(1);
}
const pk = bs58.decode(privateKey);
const sender = Keypair.fromSecretKey(pk);
const connection = new Connection(clusterApiUrl("devnet"));
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const tokenMintAccount = new PublicKey("AYEDMh8iLbF7osVqqQrnyjdWxWGUJnua1KUu5nSZPajW");
const recipientAssociatedTokenAccount = new PublicKey("3VgiYHWQn68HAvfe1KBE4NiBA19STm3bjhTghG3xAKAX");

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log("✅ Success!");
console.log(`Mint Token Transaction: ${link}`);



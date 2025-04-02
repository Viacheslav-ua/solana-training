import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import bs58 from "bs58";

let privateKey = process.env["PRIVATE_KEY_SLV"];
if (privateKey === undefined) {
  console.log("Add PRIVATE_KEY_SLV to .env!");
  process.exit(1);
}
const pk = bs58.decode(privateKey);
const sender = Keypair.fromSecretKey(pk);
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2
);
const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Token Mint: ${link}`);

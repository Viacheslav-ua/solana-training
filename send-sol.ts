import "dotenv/config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from "@solana/web3.js";

const privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const publicKeyRecipient = process.env["PUBLIC_KEY_SLV"];
if (publicKeyRecipient === undefined) {
  console.log("PUBLIC_KEY_SLV environment variable not found, add to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
const recipient = new PublicKey(publicKeyRecipient)
const connection = new Connection(clusterApiUrl("devnet"));
const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
const memoText = "My new text is here!";

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);
console.log(`🔑 Recipient public key is: ${recipient}`);
console.log(`Memo Text is: ${memoProgram}`);
console.log(`💸 Attempting to send 0.02 SOL to ${recipient.toBase58()}...`);

const tx = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.02 * LAMPORTS_PER_SOL,
});

const addMemoInstruction = new TransactionInstruction({
  keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

tx.add(sendSolInstruction);
tx.add(addMemoInstruction);

const signature = await sendAndConfirmTransaction(connection, tx, [ sender]);

console.log(`✅ Transaction confirmed, signature: \x1b[95m${signature}\x1b[0m`);
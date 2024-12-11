const TonWeb = require("tonweb");
const TonMnemonic = require("tonweb-mnemonic");

async function createTonV4R2Wallet() {
    const tonweb = new TonWeb();

    // Generate a new mnemonic
    const mnemonic = await TonMnemonic.generateMnemonic();
    console.log("Mnemonic:", mnemonic.join(" "));

    // Derive the key pair from the mnemonic
    const keyPair = await TonMnemonic.mnemonicToKeyPair(mnemonic);
    console.log("Public Key:", TonWeb.utils.bytesToHex(keyPair.publicKey));
    console.log("Secret Key:", TonWeb.utils.bytesToHex(keyPair.secretKey));

    // Create a V4R2 wallet with the derived public key
    const wallet = tonweb.wallet.create({
        publicKey: keyPair.publicKey,
        workchain: 0,
        walletVersion: "v4R2", // Explicitly specify V4R2
    });

    // Get the wallet address
    const walletAddress = await wallet.getAddress();
    console.log("Wallet Address (V4R2):", walletAddress.toString(true, true, true));
}

createTonV4R2Wallet().catch(console.error);

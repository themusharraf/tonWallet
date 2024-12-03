import {mnemonicToWalletKey} from "ton-crypto";
import {fromNano, TonClient, WalletContractV4, internal} from "ton";
import {getHttpEndpoint} from "@orbs-network/ton-access";

async function main() {
    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = ""; // your 24 secret words (replace ... with the rest of the words)
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});

    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    // make sure wallet is deployed
    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed");
    }

    console.log("wallet is deployed- ", wallet.address)

    const balance = await client.getBalance(wallet.address)
    console.log("balance: ", fromNano(balance))

    // send ton 0.05 EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
                value: "0.05", // 0.05 TON
                body: "Salom", // optional comment
                bounce: false,
            })
        ]
    });

    // let currentSeqno = seqno;
    // while (currentSeqno == seqno) {
    //     console.log("waiting for transaction to confirm...");
    //     await sleep(1500);
    //     currentSeqno = await walletContract.getSeqno();
    // }
    // console.log("transaction confirmed!");
}

main()

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
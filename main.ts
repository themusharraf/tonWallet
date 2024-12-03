import {mnemonicToWalletKey} from "ton-crypto";
import {fromNano, TonClient, WalletContractV4} from "ton";
import {getHttpEndpoint} from "@orbs-network/ton-access";

async function main() {
    const mnemonic = "thrive employ amazing logicstock braveinject nest couch bluemotioncruisesilk womanswitch insestcomic rhyt";

    // To'g'ri bo'laklash
    const key = await mnemonicToWalletKey(mnemonic.split(" "));

    // Wallet yaratish
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});

    // Testnet endpointini olish
    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    // Walletni tekshirish
    // console.log("Wallet address:", wallet.address.toString());


    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("Wallet is not deployed");
    }

    console.log("wallet is deployed- ", wallet.address)

    const balance = await client.getBalance(wallet.address)
    console.log("balance: ", fromNano(balance))

}

main()
# Ton Wallet V4 Transaction Script


🚀 **TON blockchain uchun Wallet V4 bilan ishlashning qulay va kuchli skripti.**  
Ushbu skript yordamida TON testnet bilan ulaning, hamyoningizni tasdiqlang, balansni ko‘ring va Toncoin tranzaksiyalarini amalga oshiring.

---

## 🌟 **Xususiyatlari**

- **TON testnet bilan ulanish** 🌐  
  Eng so‘nggi TON RPC mijozidan foydalanib, xavfsiz ulanishni tez va oson yo‘lga qo‘ying.

- **Hamyonni tasdiqlash** 🔐  
  Har qanday operatsiyani bajarishdan oldin hamyon zanjirga joylashtirilganligini tekshiring.

- **Hamyon balansini tekshirish** 💰  
  Hamyoningizdagi Toncoin miqdorini ko‘ring va ko‘rsatib bering.

- **Tranzaksiyalar yuborish** ✉️  
  Istalgan manzilga Toncoin yuboring, xabarning mazmunini sozlang va bounce opsiyasidan foydalaning.

---

## 🛠️ **Qanday ishlatish kerak**

### **1. Repozitoriyani klonlash**
Avvalo, ushbu repozitoriyani o‘z kompyuteringizga yuklab oling:
```bash
https://github.com/themusharraf/tonWallet.git
```
##    2. Zaruriy kutubxonalarni o‘rnatish
- **Barcha kerakli paketlarni o‘rnating**:
```bash
npm install ton ton-crypto @orbs-network/ton-access
```
##    3. Mnemonic qo‘shish
- **Skriptdagi bo‘sh joyni o‘z 24 ta yod so‘zlaringiz bilan almashtiring**:
```typescript
const mnemonic = "sizning 24 ta yod so‘zlaringiz";
```

##    4. Skriptni ishga tushirish
- **Hamyon bilan ishlash uchun skriptni ishga tushiring**:
```bash
 npx ts-node main.ts
```
## 📖 **Kodga umumiy nazar**

### **Importlar**
TON blockchain bilan ishlash uchun quyidagi paketlardan foydalanamiz:
- **`ton-crypto`**:  
  Mnemonic yod so‘zlarni hamyon kalitlariga aylantiradi.
- **`ton`**:  
  TON blockchain bilan ishlash uchun asosiy kutubxona.
- **`ton-access`**:  
  TON tarmoqlari uchun to‘g‘ri HTTP endpointlarni aniqlaydi.

---

### **Asosiy ish jarayoni**

1. **TON mijozini ishga tushirish**:  
   `getHttpEndpoint` funksiyasidan foydalanib, TON testnet bilan ulaning.

2. **Wallet V4 ni yuklash**:  
   Mnemonic yordamida Wallet V4 uchun ommaviy va maxfiy kalitlaringizni hosil qiling.

3. **Hamyonni tasdiqlash**:  
   Hamyonning zanjirda joylashtirilganligini tekshiring.

4. **Balansni ko‘rish**:  
   Hamyoningizdagi Toncoin miqdorini toping va qaytaring.

5. **Tranzaksiyani yuborish**:  
   **0.05 TON** ni belgilangan manzilga yuboring va xabar matnini sozlang.

# 💻 **Kod namunasi**

```javascript
import {mnemonicToWalletKey} from "ton-crypto";
import {fromNano, TonClient, WalletContractV4, internal} from "ton";
import {getHttpEndpoint} from "@orbs-network/ton-access";

async function main() {
    const mnemonic = "sizning 24 ta yod so‘zlaringiz";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});

    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("hamyon joylashtirilmagan");
    }

    console.log("hamyon joylashtirilgan- ", wallet.address);
    console.log("balans: ", fromNano(await client.getBalance(wallet.address)));

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno,
        messages: [
            internal({
                to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
                value: "0.05",
                body: "Salom",
                bounce: false,
            }),
        ],
    });
}

main();
```
## 🚨 **Muhim eslatmalar**

### 1. **Mnemonic xavfsizligi** 🔒  
- Mnemonic (24 ta yod so‘zlaringiz) maxfiy saqlang.  
- Agar kimdir ushbu so‘zlarni qo‘lga kiritsa, u sizning hamyoningizni boshqara oladi.

---

### 2. **Testnetdan foydalanish** 🌐  
- Ushbu skript **TON testnet tarmog‘idan** foydalanadi.  
- Agar asosiy tarmoqda ishlashni xohlasangiz, tarmoq sozlamalarini yangilang.

---

### 3. **Yetarli balans** 💸  
- Tranzaksiyalarni amalga oshirish va tarmoq to‘lovlarini qoplash uchun yetarli balansingiz borligiga ishonch hosil qiling.

---

## 🧩 **Kengaytirish**

- Hamyonni zanjirga joylashtirish funksiyasini qo‘shish.
- Qabul qiluvchi manzil va miqdorni dinamik ravishda kiritish uchun CLI argumentlarni qo‘llab-quvvatlash.
- Tranzaksiya xatoliklari uchun yanada takomillashtirilgan ishlov berish.

---

## ❤️ **Hissa qo‘shish**

- Fork qiling, yaxshilang yoki yangi funksiyalarni taklif qiling.  
- Hamma taklif va hissalar mamnuniyat bilan qabul qilinadi!

---

## 🔗 **Resurslar**

- [TON Hujjatlari](https://ton.org/docs)  
- [TON Jamiyati](https://ton.org/community)  
- [TON Testnet Explorer](https://testnet.tonscan.org)

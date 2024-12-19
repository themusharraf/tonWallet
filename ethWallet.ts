import { ethers } from 'ethers';

// Create a random Ethereum wallet
const wallet = ethers.Wallet.createRandom();

// Log the wallet details
console.log('Mnemonic:', wallet.mnemonic?.phrase); // Seed phrase
console.log('Private Key:', wallet.privateKey);   // Private key
console.log('Address:', wallet.address);          // Wallet address

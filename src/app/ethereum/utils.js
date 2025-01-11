import { request_contract_ABI, request_contract_Address, request_contract_Address_Sepolia } from './constants.js';
import { ethers } from 'ethers';


export const getSignerContract = () => {
    if (typeof window !== "undefined" && window.ethereum) {
        const getProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = getProvider?.getSigner();
        const request_contract = new ethers.Contract(request_contract_Address_Sepolia, request_contract_ABI, signer);

        return { signer, request_contract }
    }
}
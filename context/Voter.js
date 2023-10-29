import React,{useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import {ethers} from "ethers";
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client";
import { useRouter } from 'next/router';

import {VotingAddress,VotingAddressABI} from './constants'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const fetchContract =(signerOrProvide)=>
new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvide);
export const VotingContext=React.createContext();
export const VotingProvider=({children})=>{
  const votingTitle="smart contract app";
  const router=useRouter();
  const [currenAccount,setCurrentAccount]=useState('');
  const [candidateLength,setCandidateLength] =useState('');
  const pushCandidate=[];
  const candidateIndex=[];
  const [candidateArray,setCandidateArray]=useState(pushCandidate);
  const [error,setError]=useState('');
  const highestVote=[];
  const pushVoter=[];
  const [voteArray,setVoterArray] = useState(pushVoter);
  const [voterLength,setVoterLength] =useState('');
  const[voterAddress,setVoterAddress]= useState([]);

const checkifwalletisconnected=async()=>{
    if(!window.ethereum) return setError("please install metamask");
    const account = await window.ethereum.request({method: "eth_account"})
    if(account.length){
        setCurrentAccount(account[0]);

    }else{
        setError("Please install metamask & connect,Reload")
    }
};
const connectWallet=async()=>{
    if(!window.ethereum)return setError("please install metamask");
    const account = await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(account[0]);
}

const uploadtoipfs=async(file)=>{
    try{
      const added = await client.add({content:file});
      const url="https://ipfs.infura.io/ipfs/${added.path}";
      return url;
    }
    catch(error){
        setError("Error uploading file to ipfs")
    }
};
const createVoter=async(formInput,fileUrl,router)=>{
    try{
   const (name,address,position)=formInput;
   console.log(name,address,position,fileUrl)
    }catch(error){
        setError("Error in creating voter")
    }
}

  return (<VotingContext.Provider value={{votingTitle,checkifwalletisconnected,connectWallet,uploadtoipfs}}>
    {children}
    </VotingContext.Provider>);
};

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VotingContext } from '../context/Voter';
import Style from "../styles/allowedvoter.module.css";
import images from "../assests/candidate-1.jpg";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import IPFS from 'ipfs-http-client';


const allowedvoters = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({
        name: "",
        address: "",
        position: "",
    });
    const router = useRouter();
    const { uploadtoipfs,createVoter } = useContext(VotingContext);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const previewURL = URL.createObjectURL(file);
        setFileUrl(previewURL);
    }, []);
    

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxsize: 5000000,
    });


    return (
        <div className={Style.createVoter}>
            <div>
                {fileUrl && (
                    <div className={Style.voterInfo}>
                        <img src={fileUrl} alt="Voter Image"  />
                        <div className={Style.voterInfo_paragraph}>
                            <p>Name: <span>&nbsp;{formInput.name}</span></p>
                            <p>Add: &nbsp;<span>{formInput.address.slice(0, 20)}</span></p>
                            <p>Pos: &nbsp;<span>{formInput.position}</span></p>
                        </div>
                    </div>
                )}
                {
                    !fileUrl && (
                        <div className={Style.sideInfo}>
                            <div className={Style.sideInfo_box}>
                                <h4>Create candidate for voting</h4>
                                <p>Blockchain voting</p>
                                <p className={Style.sideInfo_para}>Contract Candidate</p>
                            </div>
                            <div className={Style.car}>
                                {/*voterArray.map((el,i)=>(
                                    <div key={i+1} className={Style.caard_box}>
                                        <div className={Style.image}>
                                            <img src="" alt="Profile photo"/>
                                    </div>
                                    <div className={Style.card_info}>
                                        <p>Name</p>
                                        <p>Address</p>
                                        <p>Details</p>
                                        </div></div>
                                ))*/}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={Style.voter}>
                <div className={Style.voter_container}>
                    <h1>Create New Voter</h1>
                    <div className={Style.voter_container_box}>
                        <div className={Style.voter_container_box_div}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <div className={Style.voter_container_box_div_info}>
                                    <p>Upload File</p>
                                    <div className={Style.voter_container_box_div_imgage}>
                                    <Image src={images.upload} width={150} height={150} objectFit='contain' alt='image'/>

                                    </div>
                                    <p>Drag and drop file</p>
                                    <p>or Browse media on your device</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.input_container}>
                <Input inputType="text" title="Name" placeholder="Voter Name" handleClick={(e)=>setFormInput({...formInput,name:e.target.value})}/>
<Input inputType="text" title="Address" placeholder="Voter Address" handleClick={(e)=>setFormInput({...formInput,address:e.target.value})}/>
<Input inputType="text" title="Position" placeholder="Voter Position" handleClick={(e)=>setFormInput({...formInput,position:e.target.value})}/>
<div className={Style.Button}>
                <Button btnName="Authorized Voter" handleClick={()=>createVoter(formInput,fileUrl,router)}/>

               </div>
                </div>
            </div>
            <div className={Style.createdVoter}>
                <div className={Style.createdVoter_info}>
                    <Image src={images} alt="user profile"/>
                    <p>Notice for user</p>
                    <p>Organizer<span></span></p> </div>
                    <p>Only Organizer of the voting can create voter </p>
            </div>
        </div>
    )
}

export default allowedvoters;

import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {CircleProgress} from 'react-gradient-progress'
import Usersvg from '../static/user.svg'
import Avatar from '../avatar/index'
import Lock from '../static/lock.svg'
import Button from '../../modules/button/index';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import "./style.css";


function Filedropper(props) {
    const {fileCallback, wait,connectionEstablished,setBtnWait,load,receiver,confirmSend,sendConfirm,isloading,maxLoad,users,position,peers} = props
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        // Dropzone options and events
        noClick: true,
        noKeyboard: true,
        disabled: wait,
        onDrop: (acceptedFiles) => {
            acceptedFiles.map((file) => fileCallback(file))
        }
    });

    return (
        <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                 <>
                        {!connectionEstablished?
                            <div className="peer-avatar align-center">
                                <div className="flex-col-center">
                                    <h2>There is no one in the room!</h2>
                                    <p>Once you have a peer connection, you will be able to share files</p>
                                </div>
                            </div>:
                            //add avatar module here
                            <div className="avatar-wrapper">
                            {users?users.map((item,index) => item.name!=position?<Avatar nameID={item.id}  index={item.name}/>:null):<Avatar style={{display:"none"}}/>}
                            </div>
                            } 
                            <div className="privacy-cont">
                                <img src={Lock} />
                                <p>Private Room</p>
                            </div>
                            {
                            confirmSend?
                                <div className="file-container">
                                    <div className="input-cont">
                                    <p>Do you want to send ?</p>
                                    <div className="confirm-inputs">
                                    <Button className="button-secondary focusBtn" type="Button" onClick={()=>sendConfirm(true)}>
                                           Send
                                    </Button>
                                    <Button className="button-secondary" type="Button" onClick={()=>sendConfirm(false)}>
                                           Cancel
                                    </Button>
                                    </div>
                                    </div>
                                </div>                            
                            :
                            load?
                                <div className="file-container">
                                    <div className="input-cont">
                                        <p>Sending File</p>
                                        <Progress
                                         percent={Math.floor((isloading/maxLoad)*100)}
                                        theme={{
                                            success: {
                                            symbol: '🏄‍',
                                            color: 'rgb(223, 105, 180)'
                                            },
                                            active: {
                                            symbol: '😀',
                                            color: '#fbc630'
                                            },
                                            default: {
                                            symbol: '😱',
                                            color: '#fbc630'
                                            }
                                        }}
                                        />
                                    </div>
                                </div>
                            :
                                receiver?
                                <div className="file-container">
                                    <div className="input-cont">
                                        <p>Receiving File</p>
                                        <Progress
                                         percent={Math.floor((isloading/maxLoad)*100)}
                                        theme={{
                                            success: {
                                            symbol: '🏄‍',
                                            color: 'rgb(223, 105, 180)'
                                            },
                                            active: {
                                            symbol: '😀',
                                            color: '#fbc630'
                                            },
                                            default: {
                                            symbol: '😱',
                                            color: '#fbc630'
                                            }
                                        }}
                                        />
                                    </div>
                                </div>                           
                            :
                                wait?
                                <div className="file-container">
                                    <div className="input-cont">
                                        <p>Wait till the user accepts the file</p>
                                        <Button className="button-secondary" onClick={()=>setBtnWait(false)} type="Button">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            :
                                <div className="file-container">
                                    <div className="input-cont">
                                        <input id="yolo" {...getInputProps()}/>
                                        <p>Drag a File here to Send</p>
                                        <p>OR</p>
                                        <Button className="button-primary" type="Button" onClick={open}>
                                            Select File
                                        </Button>
                                    </div>
                                </div>
                            }

                    </>
            </div>
        </div>
    );
}

export default Filedropper
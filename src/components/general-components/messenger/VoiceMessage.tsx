import './../../../style/general/voiceMessage.scss';
import { IconVoice } from "../../svg/IconVoice"
import { useContext, useEffect, useRef, useState } from 'react';
import { JsxElement } from 'typescript';
import { IconVoicePause } from '../../svg/IconVoicePause';
import { IconVoiceButton } from '../../svg/IconVoiceButton';
import { Modal } from '../../ui/Modal';
import { IconVoiceStop } from '../../svg/IconVoiceStop';
import { SocketContext } from '../../../context/SocketContext';
import $api from '../../../http';
import { AxiosResponse } from 'axios';
import { SOCKET_MESSENDER_EVENT } from '../../../types/enum';
import { MessageType } from "../../../types/types"

export const VoiceMessage = (props:{Audio:string, Side:string}) => {
    const [Duration, setDuration] = useState<number>(0);
    const [Moment, setMoment] = useState<number>(0);
    const [IsPlaying, setIsPlaying] = useState<boolean>(false);
    const [CurrentTime, setCurrentTime] = useState<number>(0);
    const [Percentage, setPercentage] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null!);

    const play = () => {
        const audio = audioRef.current;
        audio.volume = 0.1;

        if(!IsPlaying){
            setIsPlaying(true);
            audio.play();
        }
        if(IsPlaying){
            setIsPlaying(false);
            audio.pause();
            
        }
        
    }
    return(
        <div className="voice__message__wrapper">
            <button className={`voice__message__listen__button ${props.Side}`} onClick={play} >
                {!IsPlaying ? <IconVoice className="voice__icon"/> : <IconVoicePause className="voice__icon"/>}
            </button>
            <div className={`voice__message__duration__bar__wrapper ${props.Side}`}>
                <input value={Percentage} type="range" step={0.01} className="voice__message__input__bar" onChange={(e)=>{
                    const audio = audioRef.current;
                    audio.currentTime = (audio.duration / 100) * Number(e.target.value);
                    setMoment(Number(e.target.value));
                }} />
                <div className='voice__message__time__container'>
                    <span style={{margin: "0 31px"}}>
                        {`${Math.round(CurrentTime / 60)}:${Math.round(CurrentTime % 60) < 10 ?`0${Math.round(CurrentTime%60)}` : `${Math.round(CurrentTime%60)}`}`}
                    </span>
                    {/* <span style={{margin: "0 6px"}}>
                    {`${Math.round(Duration / 60)}:${Math.round(Duration % 60) < 10 ?`0${Math.round(Duration%60)}` : `${Math.round(Duration%60)}`}`}
                    </span> */}
                </div>
                <audio src={props.Audio} ref={audioRef}
                    onLoadedData={(e)=>{
                        setDuration(Number(e.currentTarget.duration.toFixed(2)));
                    }}
                    onTimeUpdate={(e)=>{
                        const p = ((Number(e.currentTarget.currentTime) / Number(e.currentTarget.duration)) * 100);
                        const time = Number(e.currentTarget.currentTime);

                        if(Percentage==100){
                            setIsPlaying(false);
                        }

                        setPercentage(+p);
                        setCurrentTime(time);
                    }}
                >

                </audio>
            </div>
        </div>
    );
}
export const VoiceButton = (props: {updateList:(NewMessage:MessageType)=>void,setIsOpenVoice:(o: boolean) => void, IsOpenVoice: boolean, chatId: string, _id:string}) => {

    const [Permission, setPermission] = useState<PermissionState>()
    // const [AudioFile, setAudioFile] = useState<Blob>();
    const { socket } = useContext(SocketContext)
    const [Recorder, setRecorder] = useState<MediaRecorder>()

    let mediaRecorder:any=undefined;

    function startRecording(){
        // if(Permission==="granted"){
            let chunks:any[] = [];
            props.setIsOpenVoice(true);
            navigator.mediaDevices.getUserMedia({audio:true, video:false}).then((stream)=>{
                const options = {mimeType: "audio/webm"};
                mediaRecorder = new MediaRecorder(stream, options);
                setRecorder(mediaRecorder);
                mediaRecorder.addEventListener("dataavailable", (e:any)=>{
                    chunks.push(e.data);

                })
                mediaRecorder.addEventListener("stop", ()=>{
                    sendData(new Blob(chunks, {type:options.mimeType}));
                    console.log(new Blob(chunks, {type:options.mimeType}))
                    stream.getTracks().forEach((t)=>{
                        t.stop()
                    })
                })
                mediaRecorder.start(1000)
                console.log(chunks)
            })
        // }
    }
    async function sendData(AudioFile:Blob) {
        let fileName: null | string = null
        if (AudioFile) {
            const formData = new FormData()

            // const file = new File([AudioFile], 'webm.webm');

            formData.append("file", AudioFile)
            const res:AxiosResponse<string> = await $api.post('messenger/file-message',formData)
            fileName = res.data
        }
        if (socket) {
            socket.current?.emit(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_VOICE_MESSAGE, {
                chatId: props.chatId,
                senderId: props._id,
                timestamp: new Date(),
                isRead: true,
                file: fileName,
            })
            if(fileName){

                props.updateList(
                    {
                        chatId: props.chatId,
                        senderId: props._id,
                        content: "",
                        timestamp: new Date(),
                        isRead: true,
                        file: fileName,
                        forward:false,
                        senderIdold:"",
                        audio:true,
                        like:"",
                        messageId:""
                    }
                )
            }
        }
        // console.log(AudioFile)
    }
    function stopRecording(){
        if (Recorder) Recorder.stop()
        props.setIsOpenVoice(false);
    }

    navigator.permissions.query({name:"microphone" as PermissionName}).then(function(res){
        setPermission(res.state);
        res.onchange = function(result){
            if(result.target){
                setPermission((result.target as PermissionStatus).state);
            }
            
        }
    })

    if(!props.IsOpenVoice){
        return (
            <div className="voice__message__button__wrapper" onClick={startRecording}>
                <IconVoiceButton className="voice__message__button__img "/>
            </div>
        )
    }else{
        return(
            <div className="voice__message__button__wrapper__recording" onClick={stopRecording}>
                <IconVoiceStop />
            </div>
        )
    }
}
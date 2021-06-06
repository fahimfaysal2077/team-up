import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../Login/Login/Login';
import firebase from 'firebase';


function ChatInput({channelName, channelId}) {
    const [input, setInput] = useState('');


    const sendMessage = (e) => {
        e.preventDefault(); // prevents refresh

        if (!channelId) {
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: 'Fahim Faysal',
            userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNGdH6wUBTLeEpqTb-53rFi3FoaGBJywyEA&usqp=CAU',
        });

        setInput('');
    };

    return (
        <ChatInputContainer>
            <form>
                <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder={`Message #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
 border-radius: 20px;

 > form {
     position: relative;
     display: flex;
     justify-content: center;
 }

 > form > input {
     position: fixed;
     bottom: 30px;
     width: 60%;
     border: 1px solid gray;
     border-radius: 3px;
     padding: 20px;
     outline: none;
 }

 > form > button {
     display: none !important;
 }
`;

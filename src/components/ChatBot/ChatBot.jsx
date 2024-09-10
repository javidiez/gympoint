

import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./chatBot.module.css"

export const ChatBot = () => {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if(!input.trim()) return;

        const userMessages = {text: input, sender: "user"}
        setMessages([...messages, userMessages])

        try {
            const response = await fetch('',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...messages.map(msg => ({role: msg.sender, content: msg.text})),
                        {role: "user", content: input}
                    ]

                })
            })
            if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}
            const data = await response.json();
            const botMessages = {
                text: data.choices[0].message.content.trim(),
                sender: 'assistant'
            }
            setMessages(prev => [...prev, botMessages])
            
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div className={styles.chat_container}>
            <div className={styles.chat_box}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.sender}`}>
                        {msg.text}
                    </div>
                )
                )}
            </div>
            <div className={styles.input_container}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => e.key == "Enter" && handleSendMessage()} placeholder="Enviar mensaje" />

            </div>
            <button className="btn btn-warning" onClick={handleSendMessage}>
                Enviar
            </button>

        </div>
    )
}

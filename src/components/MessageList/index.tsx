import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';

import { io } from 'socket.io-client';

import { styles } from './styles';

let messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', message => {
  messagesQueue.push(message)
})

export const MessageList = () => {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await api.get<MessageProps[]>('messages/last')
      setCurrentMessages(response.data)

    }
    fetchMessages();

  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ])
        messagesQueue.shift();
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'>

      {currentMessages.map(message => (
        <Message key={message.text} data={message} />
      ))}


    </ScrollView>
  );
}
import React, { useState } from 'react';

import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export const SendMessageForm = () => {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)


  const handleMessageSubmit = async () => {
    const messageFormated = message.trim();



    if (messageFormated.length > 0) {
      setSendingMessage(true)
      await api.post('messages', { message: messageFormated })

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)
      Alert.alert('Mensagem enviada')
    } else {
      Alert.alert('Escreva a mensagem para enviar.')
    }

  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.PINK}
        backgroundColor={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />

    </View>
  );
}
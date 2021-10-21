import React, { useState } from 'react';

import { TextInput, View } from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export const SendMessageForm = () => {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChange={event => setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.PINK}
        backgroundColor={COLORS.WHITE}
      />

    </View>
  );
}
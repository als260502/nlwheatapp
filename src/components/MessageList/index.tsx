import React from 'react';

import { ScrollView } from 'react-native';
import { Message } from '../Message';


import { styles } from './styles';

export const MessageList = () => {

  const message = {
    id: 'texto01',
    text: 'texto de teste das mensagens',
    user: {
      name: 'Andre Souza',
      avatar_url: 'http://github.com/als260502.png',
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'    >

      <Message data={message} />
      <Message data={message} />
      <Message data={message} />

    </ScrollView>
  );
}
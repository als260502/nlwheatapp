import React from 'react';
import { Text, View } from 'react-native';

import { MotiView } from 'moti'
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export type User = {
  name: string;
  avatar_url: string;
}

export type Message = {
  id: string;
  text: string;
  user: User;
}

type MessageProps = {
  data: Message;
}

export const Message = ({ data }: MessageProps) => {
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: -50, }}
      transition={{ type: 'timing', duration: 700 }}
      animate={{ opacity: 1, translateY: 0 }}
    >
      <Text style={styles.message}>
        {data.text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto
          sizes='small'
          imageUri={data.user.avatar_url}
        />
        <Text style={styles.userName}>{data.user.name}</Text>

      </View>

    </MotiView>
  );
}
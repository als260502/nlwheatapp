import React from 'react';
import { useAuth } from '../../hooks/useAuth'

import { View } from 'react-native';

import { styles } from './styles';

import { Button } from '../Button'
import { COLORS } from '../../theme';

export const SignInBox = () => {
  const { signIn, isSigningIn } = useAuth();
  return (
    <View style={styles.container}>

      <Button
        title='ENTRAR COM GITHUB'
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon='github'
        onPress={signIn}
        isLoading={isSigningIn}
      />

    </View>
  );
}
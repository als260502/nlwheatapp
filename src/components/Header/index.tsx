import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { UserPhoto } from '../UserPhoto'

import LogoSvg from '../../assets/logo.svg'

const Header = () => {
  return (
    <View style={styles.container}>

      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>
            Sair
          </Text>
        </TouchableOpacity>

        <UserPhoto
          imageUri={'https://github.com/als260502.png'}
        />
      </View>

    </View>
  );
}

export { Header };
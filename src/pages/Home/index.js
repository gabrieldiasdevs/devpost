import React from 'react'
import { Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { 
  Container,
  ButtonPost
} from './styles'

export default function Home(){
  const navigation = useNavigation()

  return(
    <Container>
      <Text>HOME</Text>

      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
        <Feather
          name='edit-2'
          color='#FFF'
          size={25}
        />
      </ButtonPost>
    </Container>
  )
}
import React, { useState, useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { AuthContext } from '../../contexts/auth'

import { 
  Container,
  Input,
  Button,
  ButtonText
} from './styles'

export default function NewPost(){
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const [post, setPost] = useState('')

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

  async function handlePost(){
    if(post === ''){
      alert('Seu post contem conteúdo inválido!')
      return
    }

    let avatarUrl = null

    try{
      let response = await storage().ref('users').child(user?.uid).getDownloadURL()
      avatarUrl = response

    }catch(err){
      avatarUrl = null
    }

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user?.nome,
      userId: user?.uid,
      likes: 0,
      avatarUrl,
    })
    .then(() => {
      setPost('')
    })
    .catch((error) => {
      console.log(error)
    })

    navigation.goBack()

  }

  return(
    <Container>
      <Input 
        placeholder='O que está acontecendo?' 
        value={post}
        onChangeText={ (text) => setPost(text) }
        autoCorrect={false}
        multiline={true}
        placeholderTextColor='#DDD'
        maxLength={300}
      />
    </Container>
  )
}
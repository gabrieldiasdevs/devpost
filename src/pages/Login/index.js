import React, { useState, useContext } from 'react'
import { Text, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

const TitleAnimated = Animatable.createAnimatableComponent(Title)

import { 
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles'

import { AuthContext } from '../../contexts/auth'

export default function Login(){
  const { signUp, signIn, loadingAuth } = useContext(AuthContext) 

  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function toggleLogin(){
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }

  function handleSignIn(){
    if(email === '' || password === ''){
      alert('Preencha todos os campos!')
      return
    }

    signIn(email, password)
  }

  async function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      alert('Preencha todos os campos!')
      return
    }

    await signUp(email, password, name)

  }

  if(login){
    return(
      <Container>
        <TitleAnimated animation='flipInY'>
          Dev<Text style={{ color: '#E52246' }}>Post</Text>
        </TitleAnimated>
  
        <Input
          placeholder='seuemail@teste.com'
          value={email}
          onChangeText={ (text) => setEmail(text) }
        />
  
        <Input
          placeholder='********'
          value={password}
          onChangeText={ (text) => setPassword(text) }
          secureTextEntry={true}
        />
  
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={27} color='#FFF' />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
  
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    )
  }

  return(
    <Container>
      <TitleAnimated animation='flipInX'>
        Dev<Text style={{ color: '#E52246' }}>Post</Text>
      </TitleAnimated>

      <Input
        placeholder='Seu nome'
        value={name}
        onChangeText={ (text) => setName(text) }
      />

      <Input
        placeholder='seuemail@teste.com'
        value={email}
        onChangeText={ (text) => setEmail(text) }
      />

      <Input
        placeholder='********'
        value={password}
        onChangeText={ (text) => setPassword(text) }
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={27} color='#FFF' />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  )
}
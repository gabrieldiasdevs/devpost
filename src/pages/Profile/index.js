import React, { useContext, useState } from 'react'
import { Modal, Platform } from 'react-native'
import Header from '../../components/Header'
import Feather from 'react-native-vector-icons/Feather'

import { 
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input
} from './styles'

import { AuthContext } from '../../contexts/auth'

export default function Profile(){
  const { signOut, user } = useContext(AuthContext)

  const [nome, setNome] = useState(user.nome)
  const [url, setUrl] = useState(null)
  const [open, setOpen] = useState(false)

  async function handleSignOut(){
    await signOut()
  }

  async function updateProfile(){

  }

  return(
    <Container>
      <Header/>

      {url ? (
        <UploadButton>
          <UploadText>
            <Feather name='upload' size={30} color='#E52246' />
          </UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>
            <Feather name='upload' size={30} color='#E52246' />
          </UploadText>
        </UploadButton>
      )}
      
      <Name> {user?.nome} </Name>
      <Email> {user?.email} </Email>

      <Button bg='#428CFD' onPress={ () => setOpen(true) }>
        <ButtonText color='#FFF'>Atualizar Perfil</ButtonText>
      </Button>

      <Button bg='#DDD' onPress={handleSignOut}>
        <ButtonText color='#353840'>Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'} > 

          <ButtonBack onPress={ () => setOpen(false) }>
            <Feather name='arrow-left' size={22} color='#121212'/>
            <ButtonText color='#121212'>Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={ (text) => setNome(text) }
          />

          <Button bg='#428CFD' onPress={updateProfile}>
            <ButtonText color='#FFF'>Salvar</ButtonText>
          </Button>

        </ModalContainer>
      </Modal>

    </Container>
  )
}
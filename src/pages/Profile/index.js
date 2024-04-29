import React, { useContext, useState, useEffect } from 'react'
import { Modal, Platform } from 'react-native'
import Header from '../../components/Header'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchImageLibrary } from 'react-native-image-picker'

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
  const { signOut, user, setUser, storageUser } = useContext(AuthContext)

  const [nome, setNome] = useState(user.nome)
  const [url, setUrl] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadAvatar(){
      try{
        if(isActive){
          let response = await storage().ref('users')
          .child(user?.uid).getDownloadURL()
          setUrl(response)
        }
        
      }catch(err){
        console.log(err)
      }
    }

    loadAvatar()

    return () => isActive = false
  }, [])

  async function handleSignOut(){
    await signOut()
  }

  async function updateProfile(){
    if(nome === ''){
      return
    }

    await firestore().collection('users')
    .doc(user?.uid)
    .update({
      nome: nome
    })

    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get()

    postDocs.forEach( async doc => {
      await firestore().collection('posts').doc(doc.id)
      .update({
        autor: nome
      })
    })

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email
    }

    setUser(data)
    storageUser(data)

    setOpen(false)

  }

  function uploadFile(){

    const options = {
      noData: true,
      mediaType: 'photo',
    }

    launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log('CANCELOU')
      }else if(response.error){
        console.log('ERRO')
      }else{
        uploadFileFirebase(response)
        .then(() => {
          uploadAvatarPosts()
        })

        setUrl(response.assets[0].uri)

      }
    })
  }

  function getFileLocalPath(response){
    return response.assets[0].uri
  }

  async function uploadFileFirebase(response){
    const fileSource = getFileLocalPath(response)

    const storageRef = storage().ref('users').child(user?.uid)

    return await storageRef.putFile(fileSource)
  }

  async function uploadAvatarPosts(){
    const storageRef = storage().ref('users').child(user?.uid)
    const url = await storageRef.getDownloadURL()
    .then(async (image) => {
      const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get()

      postDocs.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          avatarUrl: image
        })
      })
    })

    .catch((error) => {
      console.log(error)
    })
  }

  return(
    <Container>
      <Header/>

      {url ? (
        <UploadButton onPress={uploadFile}>
          <UploadText>
            <Feather name='upload' size={30} color='#E52246' />
          </UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={uploadFile}>
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
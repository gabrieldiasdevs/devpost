import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { formatDistance, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { 
  Container,
  UserArea,
  UserAvatar,
  UserName,
  Content,
  InfoArea,
  LikeArea,
  LikeNumber,
  DatePost
} from './styles'

export default function Posts({ data, userId }){
  const navigation = useNavigation()
  const [likePost, setLikePost] = useState(data?.likes)

  async function handleLikePost(id, likes){
    const docId = `${userId}_${id}`

    const doc = await firestore().collection('likes')
    .doc(docId).get()

    if(doc.exists){
      await firestore().collection('posts')
      .doc(id).update({
        likes: likes - 1
      })

      await firestore().collection('likes').doc(docId)
      .delete()
      .then(() => {
        setLikePost(likes - 1)
      })

      return

    }

    await firestore().collection('likes')
    .doc(docId).set({
      postId: id,
      userId: userId,
    })

    await firestore().collection('posts')
    .doc(id).update({
      likes: likes + 1
    })
    .then(() => {
      setLikePost(likes + 1)
    })

  }

  function formatTimePost(){
    const datePost = new Date(data.created.seconds * 1000)

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  return(
    <Container onPress={ () => navigation.navigate('PostsUser', { title: data.autor, userId: data.userId } ) }>
      <UserArea>

        {data.avatarUrl ? (
          <UserAvatar source={{ uri: data.avatarUrl }}/>
        ) : (
          <UserAvatar source={require('../../assets/avatar.png')}/>
        )}

        <UserName numberOfLines={1}> {data?.autor} </UserName>
      </UserArea>
      <Content> {data?.content} </Content>
      <InfoArea>
        <LikeArea onPress={ () => handleLikePost(data.id, likePost) }>

          <LikeNumber> {likePost === 0 ? '' : likePost} </LikeNumber>
          <Entypo name={likePost === 0 ? 'heart-outlined' : 'heart'} size={20} color='#E52246'/>

        </LikeArea>
        <DatePost> {formatTimePost()} </DatePost>
      </InfoArea>
    </Container>
  )
}
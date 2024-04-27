import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { formatDistance } from 'date-fns'
import { pt, ptBR } from 'date-fns/locale'

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
  const [likePost, setLikePost] = useState(data?.likes)

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
    <Container>
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
        <LikeArea>

          <LikeNumber> {likePost === 0 ? '' : likePost} </LikeNumber>
          <Entypo name={likePost === 0 ? 'heart-outlined' : 'heart'} size={20} color='#E52246'/>

        </LikeArea>
        <DatePost> {formatTimePost()} </DatePost>
      </InfoArea>
    </Container>
  )
}
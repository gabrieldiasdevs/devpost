import React, { useContext } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

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

import { AuthContext } from '../../contexts/auth'

export default function Posts({ data, userId }){
  const { user } = useContext(AuthContext)

  return(
    <Container>
      <UserArea>
        <UserAvatar source={require('../../assets/avatar.png')}/>
        <UserName numberOfLines={1}> {data.nome} </UserName>
      </UserArea>
      <Content>koasfkmoaksfmnokansfijnsfikjnkjasfhbjih bjk bijbhijbniuabfiu bijiuhiubni fniubiubiubiub fi9uabuibiubiub iubiuuibiubfia biubiujbfaiu buihjbuih buib aiubn iubiu biunain i nbjnok njk kn kjnkjl nkj.</Content>
      <InfoArea>
        <LikeArea>
          <LikeNumber>3</LikeNumber>
          <Entypo name='heart' size={20} color='#E52246'/>
        </LikeArea>
        <DatePost>a menos de 1 minuto</DatePost>
      </InfoArea>
    </Container>
  )
}
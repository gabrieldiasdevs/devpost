import React from 'react'
import { Text } from 'react-native'
import { 
  Container,
  Title
} from './styles'

export default function Header(){
  return(
    <Container>
      <Title>
        Dev<Text style={{ fontStyle: 'italic', color: '#E52246', fontWeight: 'bold' }}>Post</Text>
      </Title>
    </Container>
  )
}
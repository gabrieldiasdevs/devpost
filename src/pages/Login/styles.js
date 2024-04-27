import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #36393F;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color: #FFF;
  font-size: 60px;
  font-weight: bold;
  font-style: italic;
`

export const Input = styled.TextInput`
  width: 80%;
  background-color: #FFF;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 17px;
`

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #418CFB;
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: #FFF;
  font-size: 20px;
`

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`

export const SignUpText = styled.Text`
  color: #DDD;
  font-size: 15px;
`
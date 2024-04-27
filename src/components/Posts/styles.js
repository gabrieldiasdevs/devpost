import styled from 'styled-components/native'

export const Container = styled.View`
  margin: 7px;
  background-color: #FFF;
  border-radius: 5px;
  padding: 10px;
  justify-content: space-between;
  gap: 15px;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  elevation: 3;
`

export const UserArea = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #D4D4D4;
`

export const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
`

export const Content = styled.Text`
  color: #000;
`

export const InfoArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const LikeArea = styled.View`
  flex-direction: row;
`

export const LikeNumber = styled.Text`
  color: #E52246;
`

export const DatePost = styled.Text`
  color: #000;
`
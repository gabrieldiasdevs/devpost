import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'

import { AuthContext } from '../../contexts/auth'

export default function Profile(){
  const { signOut } = useContext(AuthContext)

  async function handleSignOut(){
    await signOut()
  }

  return(
    <View>
      <Text>PROFILE</Text>
      <Button title='Sair da conta' onPress={handleSignOut}/>
    </View>
  )
}
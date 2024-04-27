import React, { useState, useContext, useCallback } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header'
import Posts from '../../components/Posts'
import firestore from '@react-native-firebase/firestore'

import { 
  Container,
  ButtonPost,
  ListPosts
} from './styles'

import { AuthContext } from '../../contexts/auth'

export default function Home(){
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      function fetchPosts(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5).get()
        .then((snapshot) => {

          if(isActive){
            setPosts([])
            const postList = []

            snapshot.docs.map( u => {
              postList.push({
                ...u.data(),
                id: u.id,
              })
            })

            setPosts(postList)
            setLoading(false)

          }

        })

      }

      fetchPosts()

      return () => {
        isActive = false
      }

    }, [])
  )

  return(
    <Container>
      <Header/>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color='#E52246' />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={ ({ item }) => <Posts data={item} userId={user?.uid} /> }
        />
      )}

      

      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
        <Feather
          name='edit-2'
          color='#FFF'
          size={25}
        />
      </ButtonPost>
    </Container>
  )
}
import React, { useLayoutEffect, useState, useCallback, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Posts from '../../components/Posts'
import { Container, ListPosts } from './styles'
import { AuthContext } from '../../contexts/auth'

export default function PostsUser(){
  const { user } = useContext(AuthContext)
  const route = useRoute()
  const navigation = useNavigation()

  const [title, setTitle] = useState(route?.params?.title)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback(() => {
      let isActive = true
      
      firestore().collection('posts')
      .where('userId', '==', route.params?.userId)
      .orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
        const postList = []

        snapshot.docs.map( u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        if(isActive){
          setPosts(postList)
          setLoading(false)
        }

      })


      return () => {
        isActive = false
      }

    }, [])
  )

  return(
    <Container>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={50} color='#E52246'/>
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={ ({ item }) => <Posts data={item} userId={user.uid} /> }
        />
      )}
    </Container>
  )
}
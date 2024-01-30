import React, { useContext, useEffect, useState } from 'react'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { authContext } from '../ContextProvider/ContextProvider';

const Dashboard = () => {
  const { LoginData } = useContext(authContext);
  const [user, setUser] = useState({
    name:'Shiva Verma',
    age:26,
    email:'shivaverma1115@gmail.com'
  });
  const {name,age,email} = user
  const fetchData = async () => {
    fetch(`${process.env.REACT_APP_BACKENED_URL}/signup/${LoginData.email}`)
      .then(res => res.json())
      .then((ans) => setUser(ans))
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <Center py={6} minH={'100vh'} >
      <Box
        maxW={'270px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={""}
            bg={'gray'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {name} - ({age})
            </Heading>
            <Text color={'gray.500'}>{email}</Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Dashboard

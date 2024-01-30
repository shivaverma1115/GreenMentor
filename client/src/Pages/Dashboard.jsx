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
  Link,
} from '@chakra-ui/react'
import { authContext } from '../ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { LoginData } = useContext(authContext);
  const [user, setUser] = useState({
    name: 'Shiva Verma',
    age: 26,
    email: 'shivaverma1115@gmail.com'
  });
  const { name, age, email } = user
  const fetchData = async () => {
    try {
      fetch(`${process.env.REACT_APP_BACKENED_URL}/signup/${LoginData.email}`)
        .then(res => res.json())
        .then((ans) => setUser(ans))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const nevigate = useNavigate() ;
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
          <Stack spacing={3} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {name} - ({age})
            </Heading>
            <Text color={'gray.500'}>{email}</Text>
            <Text align={'center'} onClick={() => nevigate('/login')} >
              Already a user? <Link color={'blue.400'}>Login</Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Dashboard

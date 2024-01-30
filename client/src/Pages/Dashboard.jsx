import React, { useContext, useEffect, useState } from 'react'
import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack, Link } from '@chakra-ui/react'
import { EditIcon } from "@chakra-ui/icons"
import { authContext } from '../ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // --------------- Data mange through contextApi ----------------
  const { LoginData, user, setUser } = useContext(authContext);
  const { name, age, email } = user;

  // --------------- Retrive Data through mongoDb ----------------
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
  }, [user])

  // --------------- For Nevigation ----------------
  const nevigate = useNavigate();

  return (
    <Center py={6} minH={'100vh'} >
      <Box
        maxW={'270px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Box cursor={'pointer'} onClick={() => nevigate('/editPage')} position={'absolute'} color={'white'} fontSize={'20px'} px={3} >
          <EditIcon />
        </Box>
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
            <Heading fontSize={'17px'} fontWeight={500} fontFamily={'body'}>
              Name: <span style={{ color: 'gray' }} >{name}</span>
              <br />
              Age: <span style={{ color: 'gray' }} >{age}</span>
            </Heading>
            <Text>Email: <span style={{ color: 'gray' }} >{email}</span></Text>
            <Text align={'center'}>
              Back to
              <Flex>
                <Link onClick={() => nevigate('/')} color={'blue.400'}>Signup</Link>
                <span style={{ marginLeft: '10px', marginRight: '10px' }} >or</span>
                <Link onClick={() => nevigate('/login')} color={'blue.400'}>Login</Link>
              </Flex>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Dashboard

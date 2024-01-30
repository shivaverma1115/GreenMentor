import {Link, Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { authContext } from '../ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken } = useContext(authContext);

  const [LoginData, setLoginData] = useState();
  const handleForm = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value })
  }

  const nevigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENED_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginData)
      })
      const ans = await res.json();
      setToken(ans.token)
      console.log(LoginData)
      console.log(ans)
      nevigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit} >
              <Stack spacing={4}>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' required border={'1px solid gray'} name='email' onChange={(e) => handleForm(e)} />
                </Box>
                <Box>
                  <FormLabel>Password</FormLabel>
                  <Input type='password' required border={'1px solid gray'} name='password' onChange={(e) => handleForm(e)} />
                </Box>
                <Box mx={'auto'} w={'fit-content'} border={'1px solid gray'} >
                  <Input type='submit' value={'Signup'} />
                </Box>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'} onClick={() => nevigate('/')} >
                Register? <Link color={'blue.400'}>Signup</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login

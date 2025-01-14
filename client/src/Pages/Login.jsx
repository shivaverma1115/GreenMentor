import { Link, Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, Spinner } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { authContext } from '../ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // --------------- Retrive Data through contextApi ----------------
  const { setToken, LoginData, setLoginData } = useContext(authContext);


  // --------------- handle Loading ----------------
  const [Loading, setLoading] = useState(false);
  const handleForm = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value })
  }


  const nevigate = useNavigate();
  const toast = useToast();

  // --------------- Data Post to MongoDb ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENED_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginData)
      })
      toast({
        title: 'Login successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      const ans = await res.json();
      setToken(ans.token)
      console.log(LoginData)
      console.log(ans)
      nevigate('/dashboard')
      setLoading(false);
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
            to enjoy all of our cool <span color={'blue.400'}>features</span> ✌️
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
                {Loading ? "" : <Box bg={'blue.400'} borderRadius={5} color={'white'} _hover={{
                  bg: 'blue.500',
                }} >
                  <Input cursor={'pointer'} type='submit' value={'Login'} />
                </Box>}
              </Stack>
            </form>
            {
              Loading ?
                <>
                  <Box w={'fit-content'} m={'auto'}>
                    <Spinner size='lg' />
                  </Box>
                  <Text color={'gray'} fontWeight={700} w={'fit-content'} m={'auto'}>
                    Data retrieval is in progress. You can expect the results within approximately one minute.
                  </Text>
                </> :
                <Stack pt={6}>
                  <Text align={'center'} onClick={() => nevigate('/')} >
                    Register? <Link color={'blue.400'}>Signup</Link>
                  </Text>
                </Stack>
            }
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login

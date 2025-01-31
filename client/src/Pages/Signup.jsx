import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Link, Spinner, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    // --------------- handle Loading ----------------
    const [Loading, setLoading] = useState(false);

    // --------------- handle FormData ----------------
    const [formData, setFormData] = useState();
    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // --------------- for nevigation ----------------
    const nevigate = useNavigate();

    const toast = useToast();

    // --------------- Post Data to MongoDb ----------------
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        await fetch(`${process.env.REACT_APP_BACKENED_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((ans) => console.log(ans))
            .catch((err) => console.log(err))
        toast({
            title: 'Account successfully created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        nevigate('/login')
        setLoading(false);
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit} >
                            <Stack spacing={4}>
                                <Flex>
                                    <Box mr={2} >
                                        <FormLabel>Name</FormLabel>
                                        <Input type='text' required border={'1px solid gray'} name='name' onChange={(e) => handleForm(e)} />
                                    </Box>
                                    <Box ml={2} >
                                        <FormLabel>Age</FormLabel>
                                        <Input type='number' required border={'1px solid gray'} name='age' onChange={(e) => handleForm(e)} />
                                    </Box>
                                </Flex>
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
                                }}  >
                                    <Input cursor={'pointer'} type='submit' value={'Signup'} />
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
                                    <Text align={'center'} onClick={() => nevigate('/login')} >
                                        Already a user? <Link color={'blue.400'}>Login</Link>
                                    </Text>
                                </Stack>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Signup

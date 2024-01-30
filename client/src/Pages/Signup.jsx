import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState();
    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault() ;
        const res = await fetch(`${process.env.REACT_APP_BACKENED_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const ans = await res.json();
        console.log(ans);
    }
    const nevigate = useNavigate() ;
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
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit} >
                            <Stack spacing={4}>
                                <Flex>
                                    <Box mr={2} >
                                        <FormLabel>Name</FormLabel>
                                        <Input type='text' required border={'1px solid gray'}name='name' onChange={(e)=>handleForm(e)} />
                                    </Box>
                                    <Box ml={2} >
                                    <FormLabel>Age</FormLabel>
                                        <Input type='number' required border={'1px solid gray'}name='age'onChange={(e)=>handleForm(e)} />
                                    </Box>
                                </Flex>
                                <Box>
                                <FormLabel>Email</FormLabel>
                                    <Input type='email' required border={'1px solid gray'}name='email'onChange={(e)=>handleForm(e)}/>
                                </Box>
                                <Box>
                                <FormLabel>Password</FormLabel>
                                    <Input type='password' required border={'1px solid gray'}name='password'onChange={(e)=>handleForm(e)} />
                                </Box>
                                <Box mx={'auto'} w={'fit-content'} border={'1px solid gray'} >
                                    <Input type='submit' value={'Signup'} />
                                </Box>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'} onClick={()=>nevigate('/login')} >
                                Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Signup

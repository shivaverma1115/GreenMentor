import { Link, Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, Spinner } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { authContext } from '../ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const EditPage = () => {
    // --------------- handle Loading ----------------
    const [Loading, setLoading] = useState(false);

    // --------------- User DashBoard Data through contextApi -----------
    const { user, setUser } = useContext(authContext);
    const handleForm = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const nevigate = useNavigate();
    const toast = useToast();

    // --------------- Edit Data to server ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_BACKENED_URL}/signup/${user._id}`, user)
            .then((res) => { console.log(res) })
            .then(() => {
                toast({
                    title: 'Edit successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .then(() => { nevigate('/dashboard') })
            .catch((err) => { console.log(err) })
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Edit your credentials</Heading>
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
                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' value={user.name} required border={'1px solid gray'} name='name' onChange={(e) => handleForm(e)} />
                                </Box>
                                <Box>
                                    <FormLabel>Age</FormLabel>
                                    <Input value={user.age} type='number' required border={'1px solid gray'} name='age' onChange={(e) => handleForm(e)} />
                                </Box>
                                {Loading ? "" : <Box bg={'blue.400'} borderRadius={5} color={'white'} _hover={{
                                    bg: 'blue.500',
                                }} >
                                    <Input cursor={'pointer'} type='submit' value={'Update'} />
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
                                    <Text align={'center'} onClick={() => nevigate('/dashboard')} >
                                        Go to <Link color={'blue.400'}>Dashboard</Link>
                                    </Text>
                                </Stack>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default EditPage

import { useState } from 'react'
import {
    Input,
    Flex,
    Heading,
    HStack,
    Text,
    VStack,
    InputGroup,
    InputRightElement,
    Icon,
    Button,
    Container,
} from '@chakra-ui/react'
import MainNav from '../MainNav/MainNav'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    return (
        <VStack bg='#07070A' h='100vh' >
            <MainNav />
            <Container 
                display='flex'
                p='4rem 0 1rem'
                justifyContent='center'
            >
                <VStack 
                    border='2px solid #F75F8C' 
                    borderRadius='lg' 
                    spacing={8} 
                    h='72vh'
                    p='2rem' 
                >
                    <Heading  
                        fontWeight='bold' 
                        p='0.5rem'
                        bgGradient='linear(to-tr, #BC248C, #D3B8BA)'
                        bgClip='text'
                    >
                        Login
                    </Heading>
                    <Flex direction='column' gap='20px'>
                        <HStack w='100%' spacing={3}>
                            <Text color='#D3B8BA' fontWeight='bold'>Email: </Text>
                            <Input 
                                variant='flushed' 
                                placeholder='janedoe@email.com'
                                value={email}
                                color='#D3B8BA'
                                fontSize='sm'
                                m='0.5rem 0'
                                onChange={ e => {setEmail(e.target.value)}}
                                _placeholder={{
                                    color: 'gray.400',
                                    fontSize: 'sm',
                                }}
                                focusBorderColor= '#F75F8C'
                            />
                        </HStack>
                        <HStack w='100%' spacing={3}>
                            <Text color='#D3B8BA' fontWeight='bold'>Password: </Text>
                            <InputGroup size='md'>
                                <Input
                                    variant='flushed'
                                    color='#D3B8BA'
                                    m='0.5rem 0'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={ e => {setPassword(e.target.value)}}
                                    _placeholder={{
                                        color: 'gray.400',
                                        fontSize: 'sm',
                                    }}
                                    focusBorderColor= '#F75F8C'
                                />
                                <InputRightElement>
                                    <Button 
                                        h='1rem' 
                                        size='sm' 
                                        bg='transparent'
                                        mt='0.5rem'
                                        onClick={()=>setShow(!show)}
                                        _hover={{bg: 'transparent'}}
                                    >
                                        {show ? 
                                            <Icon as={MdVisibilityOff} bg='transparent' color='#DE2D66' /> 
                                            : 
                                            <Icon as={MdVisibility} bg='transparent' color='#DE2D66' /> 
                                        }
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </HStack>
                        <Button
                            borderRadius='30px'
                            bgGradient='linear(to-tr, #BC248C, #F75F8C)'
                            color='#D3B8BA'
                            mt='0.5rem'
                            p='0.75rem 1rem'
                            _hover={{
                                bg:'transparent',
                                color: '#F75F8C',
                                border: '2px solid #D3B8BA'
                            }}
                        >
                            Login
                        </Button>
                        <Text color='#D3B8BA' fontWeight='bold' fontSize='xs' >OR</Text>
                        <Button
                            borderRadius='30px'
                            bg='#fff'
                            color='07070A'
                            p='0.75rem 1rem'
                        >
                            Continue with Google <Icon as={FcGoogle} ml='5px' />
                        </Button>
                    </Flex>
                </VStack>
            </Container>
        </VStack>
    )

}

export default Login
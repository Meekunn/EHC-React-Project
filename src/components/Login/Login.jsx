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
import { useNavigate } from 'react-router-dom'
import MainNav from '../MainNav/MainNav'
import GoogleAuth from '../../HOC/GoogleAuth'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

const Login = () => {

    const router = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: '', password: ''})
    const [show, setShow] = useState(false)
    const [signin, setSignin] = useState({ success: false, error: ''})

    const { signInGoogle } = GoogleAuth()

    const signInEmail = (e) => {
        e.preventDefault()
        setSignin({...signin, success: true})

        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then(userinfo => {
            if(auth.currentUser.emailVerified) {
                alert('successful login')
                router('/dashboard')
                console.log(userinfo.user)
            } else {
                alert('verify your email')
            }
            setUserInfo({email: '', password: ''})
        })
        .catch(err => {
            alert('Invalid Email or Password')
            console.log(signin.error)
            setSignin({...signin, success: false})
            setSignin({...signin, error: err.message})
        })
    }

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
                    w='90%'
                >
                    <Heading  
                        fontWeight='bold' 
                        p='0.5rem'
                        bgGradient='linear(to-tr, #BC248C, #D3B8BA)'
                        bgClip='text'
                    >
                        Login
                    </Heading>
                    <Flex direction='column' gap='20px' w='100%'>
                        <HStack w='100%' spacing={3}>
                            <Text color='#D3B8BA' fontWeight='bold' w='30%'>Email: </Text>
                            <Input 
                                variant='flushed' 
                                placeholder='janedoe@email.com'
                                value={userInfo.email}
                                color='#D3B8BA'
                                fontSize='sm'
                                m='0.5rem 0'
                                pl='5px'
                                onChange={ e => setUserInfo({...userInfo, email: e.target.value})}
                                _placeholder={{
                                    color: 'gray.400',
                                    fontSize: 'sm',
                                }}
                                focusBorderColor= '#F75F8C'
                            />
                        </HStack>
                        <HStack w='100%' spacing={3}>
                            <Text color='#D3B8BA' fontWeight='bold' w='30%'>Password: </Text>
                            <InputGroup size='md'>
                                <Input
                                    variant='flushed'
                                    color='#D3B8BA'
                                    m='0.5rem 0'
                                    pl='5px'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={userInfo.password}
                                    onChange={ e => setUserInfo({...userInfo, password: e.target.value})}
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
                            mt='1rem'
                            p='0.75rem 1rem'
                            _hover={{
                                bg:'transparent',
                                color: '#F75F8C',
                                border: '2px solid #D3B8BA'
                            }}
                            onClick={signInEmail}
                        >
                            Login
                        </Button>
                        <Text color='#D3B8BA' fontWeight='bold' fontSize='xs' >OR</Text>
                        <Button
                            borderRadius='30px'
                            bg='#fff'
                            color='07070A'
                            p='0.75rem 1rem'
                            onClick={signInGoogle}
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
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
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../config/firebase'
import MainNav from '../MainNav/MainNav'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

const SignUp = ({signInGoogle}) => {

    const router = useNavigate()
    
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: ''})
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [signUp, setSignUp] = useState({success: false, error: ''})
    

    const signUpEmail = (e) => {
        e.preventDefault()
        setSignUp({...signUp, success: true})

        if (userInfo.password !== confirmPass ) {
            setSignUp.error('Password do not match!')
            console.log(setSignUp.error)
            setSignUp({...signUp, success: false})
        } else {
            setSignUp({...signUp, success: true})
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then ((userinfo) => {
                updateProfile(auth.currentUser, {
                    displayName: userInfo.username
                })
                sendEmailVerification(auth.currentUser)
                alert('SignUp Successful,Verify Email and Proceed to Login Page')
                console.log(userinfo.user)
                router('/login')
                setUserInfo({email: '', username: '', password: ''})
            })
            .catch((error) => {

                if(error.code === 'auth/weak-password'){
                    setSignUp.error('Please enter a strong password')
                } 
                else if (error.code === 'auth/email-already-in-use') {
                    setSignUp.error('Email is already in use')
                } 
                else{
                    setSignUp.error('Unable to Sign Up. Try again later.')
                }
    
                setSignUp({...signUp, success: false})
            })
            console.log(signUp.error)
        }
    }

    return (
        <VStack bg='#07070A' h='100vh' >
            <MainNav />
            <Container 
                display='flex'
                p='3rem 0 1rem'
                justifyContent='center'
            >
                <VStack 
                    border='2px solid #F75F8C' 
                    borderRadius='lg' 
                    spacing={5} 
                    h='75vh'
                    p='2rem'
                    w='90%' 
                >
                    <Heading  
                        fontWeight='bold' 
                        p='0.5rem'
                        bgGradient='linear(to-tr, #BC248C, #D3B8BA)'
                        bgClip='text'
                        fontSize='1.8rem'
                    >
                        Sign Up
                    </Heading>
                    <Flex direction='column' gap='12px' w='90%' >
                        <HStack w='100%' spacing={2} >
                            <Text 
                                color='#D3B8BA' 
                                fontWeight='bold' 
                                fontSize='0.8rem'
                                w='25%'
                            >
                                Username: 
                            </Text>
                            <Input 
                                variant='flushed' 
                                placeholder='Jane Doe'
                                pl='5px'
                                value={userInfo.username}
                                color='#D3B8BA'
                                fontSize='sm'
                                m='0.5rem 0'
                                onChange={ e => setUserInfo({...userInfo, username: e.target.value})}
                                _placeholder={{
                                    color: 'gray.400',
                                    fontSize: 'sm',
                                }}
                                focusBorderColor= '#F75F8C'
                            />
                        </HStack>
                        <HStack w='100%' spacing={2} >
                            <Text 
                                color='#D3B8BA' 
                                fontWeight='bold' 
                                fontSize='0.8rem'
                                w='25%'
                            >
                                Email: 
                            </Text>
                            <Input 
                                variant='flushed' 
                                placeholder='janedoe@email.com'
                                pl='5px'
                                value={userInfo.email}
                                color='#D3B8BA'
                                fontSize='sm'
                                m='0.5rem 0'
                                onChange={ e => setUserInfo({...userInfo, email: e.target.value})}
                                _placeholder={{
                                    color: 'gray.400',
                                    fontSize: 'sm',
                                }}
                                focusBorderColor= '#F75F8C'
                            />
                        </HStack>
                        <HStack w='100%' spacing={2} >
                            <Text 
                                color='#D3B8BA' 
                                fontWeight='bold' 
                                fontSize='0.8rem'
                                w='25%'
                            >
                                Password: 
                            </Text>
                            <InputGroup size='md'>
                                <Input
                                    variant='flushed'
                                    color='#D3B8BA'
                                    m='0.5rem 0'
                                    pl='5px'
                                    type={showPass ? 'text' : 'password'}
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
                                        onClick={()=>setShowPass(!showPass)}
                                        _hover={{bg: 'transparent'}}
                                    >
                                        {showPass ? 
                                            <Icon as={MdVisibilityOff} bg='transparent' color='#DE2D66' /> 
                                            : 
                                            <Icon as={MdVisibility} bg='transparent' color='#DE2D66' /> 
                                        }
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </HStack>
                        <HStack w='100%' spacing={2}>
                            <Text 
                                color='#D3B8BA' 
                                fontWeight='bold' 
                                fontSize='0.8rem'
                                w='25%'
                            >
                                Confirm Password: 
                            </Text>
                            <InputGroup size='md'>
                                <Input
                                    variant='flushed'
                                    color='#D3B8BA'
                                    m='0.5rem 0'
                                    pl='5px'
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={confirmPass}
                                    onChange={(e)=> setConfirmPass(e.target.value)}
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
                                        onClick={()=>setShowConfirm(!showConfirm)}
                                        _hover={{bg: 'transparent'}}
                                    >
                                        {showConfirm ? 
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
                            onClick={signUpEmail}
                        >
                            Sign Up
                        </Button>
                        <Text color='#D3B8BA' fontWeight='bold' fontSize='xs' >OR</Text>
                        <Button
                            borderRadius='30px'
                            bg='#fff'
                            color='07070A'
                            p='0.75rem 1rem'
                            onClick={signInGoogle}
                        >
                            Sign Up with Google <Icon as={FcGoogle} ml='5px' />
                        </Button>
                    </Flex>
                </VStack>
            </Container>
        </VStack>
    )
}

export default SignUp
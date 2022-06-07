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
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import MainNav from '../MainNav/MainNav'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState('')
    const [signup, setSignup] = useState(false)

    const signUp = () => {
        if (password !== confirmPass ) {
            setError('Password do not match!')
            alert('Password do not match!')
        } else {
            setSignup(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then (() => {
                const user = auth.currentUser
                console.log(user.uid)
                alert('SignUp Successful')
                setEmail("")
                setPassword("")
                setConfirmPass("")
            })
            .catch((error) => {

                if(error.code === 'auth/weak-password'){
                    setError('Please enter a strong password')
                } 
                else if (error.code === 'auth/email-already-in-use') {
                    setError('Email is already in use')
                } 
                else{
                    setError('Unable to Sign Up. Try again later.')
                }
    
                setSignup(false)
            })
            console.log(error)
        }
    }
     
    const signUpGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user.uid)
            alert('SignUp Successful')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.log(error)
        });
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
                >
                    <Heading  
                        fontWeight='bold' 
                        p='0.5rem'
                        bgGradient='linear(to-tr, #BC248C, #D3B8BA)'
                        bgClip='text'
                    >
                        Sign Up
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
                        <HStack w='100%' spacing={3}>
                            <Text color='#D3B8BA' fontWeight='bold'>Confirm Password: </Text>
                            <InputGroup size='md'>
                                <Input
                                    variant='flushed'
                                    color='#D3B8BA'
                                    m='0.5rem 0'
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={confirmPass}
                                    onChange={ e => {setConfirmPass(e.target.value)}}
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
                            onClick={signUp}
                        >
                            Sign Up
                        </Button>
                        <Text color='#D3B8BA' fontWeight='bold' fontSize='xs' >OR</Text>
                        <Button
                            borderRadius='30px'
                            bg='#fff'
                            color='07070A'
                            p='0.75rem 1rem'
                            onClick={signUpGoogle}
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
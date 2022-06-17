import { 
    Container,
    VStack,
    Flex,
    Box,
    Icon,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { auth, db } from '../../config/firebase'
import Navbar from "../Navbar/Navbar"

const Dashboard = ({signOutAccount}) => {

    const router = useNavigate()
    const [userName, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const user = auth.currentUser
        if(user !== null) {
            user.providerData.forEach((profile) => {
                setUserName(profile.displayName)
                setUserUid(profile.uid)
            })
            const username = user.displayName
            setUserName(username)
            setUserUid(user.uid)
        } else {
            console.log('no user found')
        }
    }

    const createSchoolCollection = async () => {
        const docRef = doc(db, 'school', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    const createWorkCollection = async () => {
        const docRef = doc(db, 'work', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    const createPersonalCollection = async () => {
        const docRef = doc(db, 'personal', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    return (
        <VStack bg='#07070A'>
            <Navbar signOutAccount={signOutAccount} />
            <Container pt='3rem'>
                <Text
                    fontSize='4xl'
                    fontWeight='bold'
                    bgGradient='linear(to-tr, #D3B8BA, #F75F8C)'
                    bgClip='text'
                    textAlign='left'
                    m='2rem 0.5rem'
                >
                    Hello {userName}
                </Text>
                <Flex>
                    <Box
                        as='button'
                        h='150px'
                        w='150px'
                        lineHeight='1.2'
                        border='1px solid #272728'
                        borderRadius='20px'
                        fontSize='xl'
                        fontWeight='bold'
                        bg='#272728'
                        color='#fff'
                        p='1rem'
                        m='0.5rem'
                        display='flex'
                        flexDirection='column'
                        gap='40px'
                        onClick={createSchoolCollection}
                    >
                        <Box
                            color='#fff'
                            bg='#F7578C'
                            borderRadius='15px'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            h='45px'
                            w='45px'
                        >
                            <Icon as={IoSchool} w={6} h={6} />
                        </Box>
                        School
                    </Box>
                    <Box
                        as='button'
                        h='150px'
                        w='150px'
                        lineHeight='1.2'
                        border='1px solid #272728'
                        borderRadius='20px'
                        fontSize='xl'
                        fontWeight='bold'
                        bg='#272728'
                        color='#fff'
                        p='1rem'
                        m='0.5rem'
                        display='flex'
                        flexDirection='column'
                        gap='40px'
                        onClick={createPersonalCollection}
                    >
                        <Box
                            color='#fff'
                            bg='#33948D'
                            borderRadius='15px'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            h='45px'
                            w='45px'
                        >
                            <Icon as={IoPersonSharp} w={6} h={6} />
                        </Box>
                        Personal
                    </Box>
                    <Box
                        as='button'
                        h='150px'
                        w='150px'
                        lineHeight='1.2'
                        border='1px solid #272728'
                        borderRadius='20px'
                        fontSize='xl'
                        fontWeight='bold'
                        bg='#272728'
                        color='#fff'
                        p='1rem'
                        m='0.5rem'
                        display='flex'
                        flexDirection='column'
                        gap='40px'
                        onClick={createWorkCollection}
                    >
                        <Box
                            color='#fff'
                            bg='#AC6089'
                            borderRadius='15px'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            h='45px'
                            w='45px'
                        >
                            <Icon as={MdWork} w={6} h={6} />
                        </Box>
                        Work
                    </Box>
                </Flex>
            </Container>
        </VStack>
    )
    
}
export default Dashboard
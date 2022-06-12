import { 
    Container,
    VStack,
    Flex,
    Box,
    Icon,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../../config/firebase'
import Navbar from "../Navbar/Navbar"

const Dashboard = ({signOutAccount}) => {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        getUsername()
    }, [])

    const getUsername = () => {
        const user = auth.currentUser
        if(user !== null) {
            user.providerData.forEach((profile) => {
                setUserName(profile.displayName)
            })
            const username = user.displayName
            setUserName(username)
            console.log(userName)
        } else {
            console.log('no user found')
        }
    }

    return (
        <VStack bg='#07070A'>
            <Navbar signOutAccount={signOutAccount} />
            <Container>
                <Text>Hello {userName}</Text>
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
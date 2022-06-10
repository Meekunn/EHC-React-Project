import {
    Box,
    Flex,
    Heading,
    Icon,
    Spacer,
    Text,
} from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './mainnav.scss'

const MainNav = () => {

    return (
        <Flex bg='#07070A' m='1.5rem 1rem' align='center' justify='space-between' w='70%' >
            <Flex>
                <Box 
                    bgGradient='linear(to-tr, #BC248C, #F75F8C)' 
                    w='30px' 
                    h='30px' 
                    borderRadius='0.65rem' 
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    m='0 0.5rem'
                >
                    <Icon as={FaCheck} color='#D3B8BA' fontSize='xl' />
                </Box>
                <Heading color='#D3B8BA' fontSize='2xl' fontWeight='bold' pr='0.5rem' >tsks.</Heading>
                <Spacer />
                <Text color='#D3B8BA' padding='0 1rem' fontSize='xs' fontWeight='bold' >Features</Text>
            </Flex>
            <Spacer w='5px' />
            <Flex>
                <Link to='/login' className='nav-links active' >Log in</Link>
                <Spacer />
                <Link to='/signup' className='nav-links' >Sign up</Link>
            </Flex>
        </Flex>
    )
}

export default MainNav
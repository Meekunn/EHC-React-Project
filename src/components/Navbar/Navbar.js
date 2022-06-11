import { 
    Button,
    Flex, 
    HStack, 
    Icon, 
    Spacer,
    Text
} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { BiSearchAlt } from "react-icons/bi"
import { MdEventNote } from 'react-icons/md'
import { IoNotifications, IoPersonCircleOutline } from 'react-icons/io5'
import '../MainNav/mainnav.scss'


const Navbar = () => {
    return (
        <HStack p='0.5rem 1rem' w='100%' >
            <Flex>
                <Button
                    bgGradient='linear(to-tr, #BC248C, #F75F8C)' 
                    color='#07070A'
                    fontWeight='bold'
                    variant='solid'
                    size='xs'
                    p='1rem'
                >
                    LOGOUT &#128075;
                </Button>
                <NavLink 
                    to='#' 
                    className='nav-links' 
                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <Icon as={MdEventNote} w={5} h={5} />
                    <Text p='0 0.2rem' >Collections</Text>
                </NavLink>
            </Flex>
            <Spacer />
            <Flex spacing={2} align='center' >
                <Button m='0 0.5rem'
                    bg='transparent'
                    size='xs'
                    color='#D3B8BA'
                    _hover={{
                        color: '#F75F8C'
                    }}
                >
                    <Icon as={BiSearchAlt}  w={5} h={5} />
                </Button>
                <Button m='0 0.5rem'
                    bg='transparent'
                    size='xs'
                    color='#D3B8BA'
                    _hover={{
                        color: '#F75F8C'
                    }}
                >
                    <Icon as={IoNotifications}  w={5} h={5} />
                </Button>
                <Button m='0 0.5rem'
                    bg='transparent'
                    size='xs'
                    color='#D3B8BA'
                    // _hover={{
                    //     color: '#F75F8C'
                    // }}
                >
                    <Icon as={IoPersonCircleOutline} w={7} h={7} />
                </Button>
            </Flex>
        </HStack>
    )
}

export default Navbar

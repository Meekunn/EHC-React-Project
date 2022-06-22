import { 
    Flex,
    Box,
    Icon
} from '@chakra-ui/react'
import { IoSchool, IoPersonAddSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './sidenav.scss'

const SideNav = () => {

    const router = useNavigate()

    return (
        <div className='sidenav-wrapper'>
            <h2>Collections</h2>
            <Flex direction='column' gap='20px' color='#d7d7d7' >
                <button className='sidenav-btn' onClick={() => router('/dashboard/school')}>
                <Box
                    color='#fff'
                    bg='#F7578C'
                    borderRadius='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    h='35px'
                    w='35px'
                    mr='1rem'
                >
                    <Icon as={IoSchool} w={4} h={4} />
                </Box>
                    School
                </button>
                <button className='sidenav-btn'>
                <Box
                    color='#fff'
                    bg='#33948D'
                    borderRadius='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    h='35px'
                    w='35px'
                    mr='1rem'
                >
                    <Icon as={IoPersonAddSharp} w={4} h={4} />
                </Box>
                    Personal
                </button>
                <button className='sidenav-btn'>
                <Box
                    color='#fff'
                    bg='#AC4089'
                    borderRadius='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    h='35px'
                    w='35px'
                    mr='1rem'
                >
                    <Icon as={MdWork} w={4} h={4} />
                </Box>
                    Work
                </button>
            </Flex>
        </div>
    )
}

export default SideNav
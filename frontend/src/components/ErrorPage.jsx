import {
    Heading,
    Container,
    Text,
    Box,
  } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import BackButton from './BackButton';
  
  export default function ErrorPage({ code, message }) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="overlay" // Ensure this is higher than the navbar's z-index
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white" // Optional: Set a background color if needed
      >
        <BackButton icon={<ArrowBackIcon />} bg="transparent" />
        <Container maxW={'3xl'} textAlign="center">
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color={'#d9376e'}
          >
            {code}
            <Text as={'span'} color="black">
              {' '+ message}
            </Text>
          </Heading>
        </Container>
      </Box>
    );
  }
  
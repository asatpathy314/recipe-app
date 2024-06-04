import { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    FormErrorMessage
  } from '@chakra-ui/react';
  import { ArrowBackIcon } from '@chakra-ui/icons'
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../lib/firebase';
  import BackButton from './BackButton';
  
  export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputErrorCode, setInputErrorCode] = useState('');

    const handleSubmit = () => {
      if (!email.includes('@')) {
        setInputErrorCode(1);
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user)
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg="#eff0f3" color="#2a2a2a">
        <Flex p={8} flex={1} align={'center'} justify={'center'} position="relative">
          <BackButton icon={<ArrowBackIcon />} size="lg"/>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color="#0d0d0d">Sign In</Heading>
            <FormControl id="email" isRequired isInvalid={inputErrorCode===1 || inputErrorCode===3}>
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email"
              bg="#fffffe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              {(inputErrorCode===1) && (
                <FormErrorMessage>A valid email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl 
            id="password"
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" bg="#fffffe" />
            </FormControl>
            <Button bg="#ff8e3c" variant={'solid'} onClick={handleSubmit}>
                Sign In
            </Button>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={'/LoginImage.webp'}
          />
        </Flex>
      </Stack>
    );
  }
  
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
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../lib/firebase';
  import BackButton from './BackButton';
  
  export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputErrorCode, setInputErrorCode] = useState('');

    const handleSubmit = () => {
      if (password !== confirmPassword) {
        setInputErrorCode(2);
      }
      if (!email.includes('@')) {
        setInputErrorCode(1);
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user)
        })
        .catch((error) => {
          console.log(error.message)
          if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            console.log("hey there")
            setInputErrorCode(3);
          }
        });
    }
  
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg="#eff0f3" color="#2a2a2a">
        <Flex p={8} flex={1} align={'center'} justify={'center'} position="relative">
          <BackButton icon={<ArrowBackIcon />} size="lg"/>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color="#0d0d0d">Create Account</Heading>
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
              {(inputErrorCode===3) && (
                 <FormErrorMessage>Account with this email already exists.</FormErrorMessage>
                )
              }
            </FormControl>
            <FormControl 
            id="password"
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" bg="#fffffe" />
            </FormControl>
            <FormControl 
            id="confirmPassword" 
            isRequired
            value={confirmPassword} 
            isInvalid={inputErrorCode===2}
            onChange={(e) => {setConfirmPassword(e.target.value)}}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" bg="#fffffe" />
              {(inputErrorCode===2) && (
                <FormErrorMessage>Does not match entered password.</FormErrorMessage>
              )}
            </FormControl>
            <Button bg="#ff8e3c" variant={'solid'} onClick={handleSubmit}>
                Create Account
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
  
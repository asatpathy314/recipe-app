import { useState, useContext } from 'react';
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
  import { useNavigate } from "react-router-dom";
  import { ArrowBackIcon } from '@chakra-ui/icons'
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../lib/firebase';
  import BackButton from './BackButton';
  import { AuthContext } from './AuthProvider';
  
  export default function RegisterPage() {
    const navigate = useNavigate();
    const { email, setEmail, userID, setUserID, accessToken, setAccessToken, isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputErrorCode, setInputErrorCode] = useState('');

    const handleSubmit = () => {
      if (inputPassword !== confirmPassword) {
        setInputErrorCode(2);
      }
      if (!inputEmail.includes('@')) {
        setInputErrorCode(1);
      }
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          setEmail(userCredential.user.email);
          setAccessToken(userCredential.user.accessToken);
          setUserID(userCredential.user.uid);
          setIsLoggedIn(true);
          navigate("/");
          navigate(0);
        })
        .catch((error) => {
          console.log(error.message)
          if (error.message === "Firebase: Error (auth/email-already-in-use).") {
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
            <FormControl id="inputEmail" isRequired isInvalid={inputErrorCode===1 || inputErrorCode===3}>
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email"
              bg="#fffffe"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
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
            id="inputPassword"
            value={inputPassword} 
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
            src={'/RegisterImage3.jpg'}
          />
        </Flex>
      </Stack>
    );
  }
  
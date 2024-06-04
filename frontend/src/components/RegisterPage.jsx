import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
  } from '@chakra-ui/react';
  import { ArrowBackIcon } from '@chakra-ui/icons'
  import BackButton from './BackButton';
  
  export default function RegisterPage() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg="#eff0f3" color="#2a2a2a">
        <Flex p={8} flex={1} align={'center'} justify={'center'} position="relative">
          <BackButton icon={<ArrowBackIcon />} size="lg"/>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color="#0d0d0d">Create Account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" bg="#fffffe"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" bg="#fffffe" />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" bg="#fffffe" />
            </FormControl>
            <Button bg="#ff8e3c" variant={'solid'}>
                Sign in
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
  
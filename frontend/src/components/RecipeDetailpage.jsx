import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Tag,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { AuthContext } from './AuthProvider';
import Chatbot from './Chatbot';
import Replies from './Replies';

const RecipeDetailPage = ({ match }) => {
  const { accessToken } = useContext(AuthContext);
  const { id } = useParams() 
  console.log(id)
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/recipe/${id}`,{
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
        });
        setRecipe(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching recipe');
        console.error(error)
      }
    }
    fetchData();
  }, [accessToken, id]);

  if (recipe !== null) {
  return (
  <Container maxW={'7xl'} pb={10}>
     { recipe &&
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'recipe image'}
            src={
              recipe.images?.LARGE?.url || recipe.image
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {recipe.label}
            </Heading>
            <Text
              fontWeight={300}
              fontSize={'2xl'}>
              {Math.round(recipe.calories) + ' calories'}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                fontSize={'2xl'}
                fontWeight={'300'}>
                {'Author: ' + recipe.source}
              </Text>
            </VStack>
            <Box gap={5}>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Tags
              </Text>
              <Tag size="lg" m={2}>{recipe?.dishType[0]}</Tag>
              <Tag size="lg" m={2}>{recipe?.mealType[0]}</Tag>
              <Tag size="lg" m={2}>{recipe?.cuisineType[0]}</Tag>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Ingredients
              </Text>
              <UnorderedList spacing={2}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <ListItem key={idx}>
                    <Text as={'span'}>
                    {ingredient.text}
                    </Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
      }
    <Replies replies={recipe.comments}/>
    </Container>
  );
  }  
};

export default RecipeDetailPage;

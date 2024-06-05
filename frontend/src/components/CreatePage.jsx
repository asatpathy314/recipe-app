import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import TagsSearch from './TagsSearch';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [ingredientHeaders, setIngredientHeaders] = useState(['']);
  const [dishType, setDishType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleRemoveIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddHeader = () => setIngredientHeaders([...ingredientHeaders, '']);
  const handleRemoveHeader = (index) =>
    setIngredientHeaders(ingredientHeaders.filter((_, i) => i !== index));
  const handleHeaderChange = (index, value) => {
    const newHeaders = [...ingredientHeaders];
    newHeaders[index] = value;
    setIngredientHeaders(newHeaders);
  };

  const handleSubmit = () => {
    console.log('submit');
    console.log(dishType, cuisine, mealType);
  }

  return (
    <Box p={8} maxWidth="1200px" mx="auto">
      <Heading mb={6}>Create a recipe</Heading>
      <form>
        <Stack spacing={4}>
          <FormControl id="title">
            <FormLabel>Recipe Title</FormLabel>
            <Input placeholder="Give your recipe a title" />
          </FormControl>
          
          <FormControl id="tags">
            <FormLabel>Tags</FormLabel>
            <Flex gap={3}>
              <TagsSearch type="dish" inputState={dishType} changeInputState={setDishType} />
              <TagsSearch type="cuisine" inputState={cuisine} changeInputState={setCuisine} />
              <TagsSearch type="meal" inputState={mealType} changeInputState={setMealType} />
            </Flex>
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Share the story behind your recipe" />
          </FormControl>

          <FormControl id="ingredients">
            <FormLabel>Ingredients</FormLabel>
            {ingredientHeaders.map((header, index) => (
              <Flex key={index} mb={2} align="center">
                <Input
                  placeholder="Add a header, e.g. Cake"
                  value={header}
                  onChange={(e) => handleHeaderChange(index, e.target.value)}
                  mr={2}
                />
                <IconButton
                  icon={<MinusIcon />}
                  onClick={() => handleRemoveHeader(index)}
                />
              </Flex>
            ))}
            {ingredients.map((ingredient, index) => (
              <Flex key={index} mb={2} align="center">
                <Input
                  placeholder="e.g. 1 cup sugar"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  mr={2}
                />
                <IconButton
                  icon={<MinusIcon />}
                  onClick={() => handleRemoveIngredient(index)}
                />
              </Flex>
            ))}
            <Button onClick={handleAddIngredient} leftIcon={<AddIcon />} mt={2}>
              Add Ingredient
            </Button>
            <Button onClick={handleAddHeader} leftIcon={<AddIcon />} mt={2} ml={2}>
              Add Header
            </Button>
          </FormControl>

          <FormControl id="photo">
            <FormLabel>Photo (optional)</FormLabel>
            <Button>Upload Image</Button>
          </FormControl>

          <Button colorScheme="orange" type="submit" mt={4} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateRecipe;

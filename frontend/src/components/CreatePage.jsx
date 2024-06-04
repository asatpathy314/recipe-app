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
  Select,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const mealTypes = ['breakfast', 'brunch', 'lunch/dinner', 'snack', 'teatime'];
const dishTypes = [
  'alcohol cocktail',
  'biscuits and cookies',
  'bread',
  'cereals',
  'condiments and sauces',
  'desserts',
  'drinks',
  'egg',
  'ice cream and custard',
  'main course',
  'pancake',
  'pasta',
  'pastry',
  'pies and tarts',
  'pizza',
  'preps',
  'preserve',
  'salad',
  'sandwiches',
  'seafood',
  'side dish',
  'soup',
  'special occasions',
  'starter',
  'sweets',
];
const cuisineTypes = [
  'american',
  'asian',
  'british',
  'caribbean',
  'central europe',
  'chinese',
  'eastern europe',
  'french',
  'greek',
  'indian',
  'italian',
  'japanese',
  'korean',
  'kosher',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'south american',
  'south east asian',
  'world',
];

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [ingredientHeaders, setIngredientHeaders] = useState(['']);

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

  return (
    <Box p={8} maxWidth="1200px" mx="auto">
      <Heading mb={6}>Create</Heading>
      <Heading size="lg" mb={4}>Create a recipe</Heading>
      <form>
        <Stack spacing={4}>
          <FormControl id="title">
            <FormLabel>Recipe Title</FormLabel>
            <Input placeholder="Give your recipe a title" />
          </FormControl>
          
          <FormControl id="tags">
            <FormLabel>Tags</FormLabel>
            <Flex>
              <Select placeholder="Dish Type" mr={2}>
                {dishTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              <Select placeholder="Cuisine Type" mr={2}>
                {cuisineTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              <Select placeholder="Meal Type">
                {mealTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
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

          <Button colorScheme="orange" type="submit" mt={4}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateRecipe;

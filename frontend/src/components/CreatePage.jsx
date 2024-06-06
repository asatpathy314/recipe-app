import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import TagsSearch from './TagsSearch';

const CreateRecipe = () => {
  const { accessToken, email } = useContext(AuthContext);
  const [label, setLabel] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [dishType, setDishType] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [mealType, setMealType] = useState('');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState(null);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleRemoveIngredient = (index) => {
    setIngredientToDelete(index);
    onOpen();
  };
  const confirmRemoveIngredient = () => {
    setIngredients(ingredients.filter((_, i) => i !== ingredientToDelete));
    onClose();
  };
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlePhotoDelete = () => {
    setPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ingredients);
    const formattedIngredients = ingredients.map((ingredient, index) => ({ text: ingredient.trim() }));
    console.log(formattedIngredients);
    if (mealType === 'Lunch' || mealType === 'Dinner') {
      console.log("hehe")
      setMealType('lunch/dinner')
    }

    const recipeData = {
      label,
      dishType: [dishType],
      mealType: [mealType],
      cuisineType: [cuisineType],
      source: email.split('@')[0],
      image: "",
      calories,
      isApproved: false,
      isUserGenerated: true,
      ingredients
    };

    console.log(recipeData)
    try {
      await axios.post('http://localhost:8000/recipe', recipeData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error creating recipe');
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box p={10} maxWidth="800px" width="100%">
        <Heading mb={6}>Create a recipe</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Recipe Title</FormLabel>
              <Input
                placeholder="Give your recipe a title"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </FormControl>
            <FormControl id="tags">
              <FormLabel>Tags</FormLabel>
              <Flex gap={3}>
                <TagsSearch type="dish" inputState={dishType} changeInputState={setDishType} />
                <TagsSearch type="cuisine" inputState={cuisineType} changeInputState={setCuisineType} />
                <TagsSearch type="meal" inputState={mealType} changeInputState={setMealType} />
              </Flex>
            </FormControl>

            <FormControl id="calories">
              <FormLabel>Calories</FormLabel>
              <NumberInput min={0} max={15000} >
              <NumberInputField placeholder="Enter the number of calories" value={calories} onChange={(e)=>{setCalories(e.target.value)}}/>
            </NumberInput>
            </FormControl>

            <FormControl id="ingredients">
              <FormLabel>Ingredients</FormLabel>
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
            </FormControl>

            <Button colorScheme="orange" type="submit" mt={4}>
              Submit
            </Button>
          </Stack>
        </form>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this ingredient?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmRemoveIngredient}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default CreateRecipe;


/*
            <FormControl id="photo">
              <FormLabel>Photo (optional)</FormLabel>
              <Input type="file" onChange={handlePhotoUpload} />
              {photo && (
                <Flex mt={2} align="center">
                  <Box mr={2}>{photo.name}</Box>
                  <Button onClick={handlePhotoDelete}>Delete Photo</Button>
                </Flex>
              )}
            </FormControl>
            */
import React, { useState, useContext } from 'react';
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
  const { accessToken } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [ingredientHeaders, setIngredientHeaders] = useState(['']);
  const [dishType, setDishType] = useState('');
  const [cuisine, setCuisine] = useState('');
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

  const handleAddHeader = () => setIngredientHeaders([...ingredientHeaders, '']);
  const handleRemoveHeader = (index) => {
    setIngredientHeaders(ingredientHeaders.filter((_, i) => i !== index));
  };
  const handleHeaderChange = (index, value) => {
    const newHeaders = [...ingredientHeaders];
    newHeaders[index] = value;
    setIngredientHeaders(newHeaders);
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlePhotoDelete = () => {
    setPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      ingredientHeaders,
      dishType,
      cuisine,
      mealType,
      username,
      photo, 
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/recipe',
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Recipe submitted successfully:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error submitting recipe:', error.response.data);
      } else {
        console.error('Error submitting recipe:', error.message);
      }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <Textarea
                placeholder="Share the story behind your recipe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
              <Input type="file" onChange={handlePhotoUpload} />
              {photo && (
                <Flex mt={2} align="center">
                  <Box mr={2}>{photo.name}</Box>
                  <Button onClick={handlePhotoDelete}>Delete Photo</Button>
                </Flex>
              )}
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

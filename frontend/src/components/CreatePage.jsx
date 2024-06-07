import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
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
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import TagsSearch from "./TagsSearch";
import ErrorPage from "./ErrorPage";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { accessToken, email, isLoggedIn } = useContext(AuthContext);
  const [label, setLabel] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [dishType, setDishType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
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

  console.log(isLoggedIn);
  if (isLoggedIn === "false") {
    return <ErrorPage code={403} message="Forbidden" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !label ||
      !calories ||
      ingredients.every((ingredient) => !ingredient.trim())
    ) {
      onErrorOpen();
      return;
    }

    const formattedIngredients = ingredients.map((ingredient) => ({
      text: ingredient.trim(),
    }));

    if (calories < 0) {
      setCalories(0);
    }

    if (calories > 15000) {
      setCalories(15000);
    }

    if (mealType === "Lunch" || mealType === "Dinner") {
      setMealType("lunch/dinner");
    }

    const recipeData = {
      label,
      dishType: dishType ? [dishType] : [],
      mealType: mealType ? [mealType] : [],
      cuisineType: cuisineType ? [cuisineType] : [],
      source: email.split("@")[0],
      image: "",
      calories,
      isApproved: false,
      isUserGenerated: true,
      ingredients: formattedIngredients,
    };

    try {
      await axios.post("http://localhost:8000/recipe", recipeData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onSuccessOpen();
    } catch (error) {
      console.error("Error creating recipe");
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
                <TagsSearch
                  type="dish"
                  inputState={dishType}
                  changeInputState={setDishType}
                />
                <TagsSearch
                  type="cuisine"
                  inputState={cuisineType}
                  changeInputState={setCuisineType}
                />
                <TagsSearch
                  type="meal"
                  inputState={mealType}
                  changeInputState={setMealType}
                />
              </Flex>
            </FormControl>

            <FormControl id="calories">
              <FormLabel>Calories</FormLabel>
              <NumberInput min={0} max={15000}>
                <NumberInputField
                  placeholder="Enter the number of calories"
                  value={calories}
                  onChange={(e) => {
                    setCalories(e.target.value);
                  }}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="ingredients">
              <FormLabel>Ingredients</FormLabel>
              {ingredients.map((ingredient, index) => (
                <Flex key={index} mb={2} align="center">
                  <Input
                    placeholder="e.g. 1 cup sugar"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    mr={2}
                  />
                  <IconButton
                    icon={<MinusIcon />}
                    onClick={() => handleRemoveIngredient(index)}
                  />
                </Flex>
              ))}
              <Button
                onClick={handleAddIngredient}
                leftIcon={<AddIcon />}
                mt={2}
              >
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
              <Button colorScheme="red" onClick={confirmRemoveIngredient}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Congrats, you submitted a recipe! Pending admin review to be
              officially uploaded.
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please fill in all required fields before submitting.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onErrorClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default CreateRecipe;

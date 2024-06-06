import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  UnorderedList,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Chatbot from "./Chatbot";
import Replies from "./Replies";
import ErrorPage from "./ErrorPage";

const RecipeDetailPage = ({ match }) => {
  const { accessToken, userID, isLoggedIn, email } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isCreatedByUser, setIsCreatedByUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/getByID/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRecipe(response.data);
        setIsApproved(response.data.isApproved);
        setIsCreatedByUser(response.data.source === email.split('@')[0]);
      } catch (error) {
        console.error("Error fetching recipe");
        console.error(error);
      }
    };

    const checkIfSaved = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/isSaved?userid=${userID}&recipeid=${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error("Error checking if recipe is saved");
        console.error(error);
      }
    };

    const loadData = async () => {
      await fetchData();
      await checkIfSaved();
      setIsLoading(false);
    };

    loadData();
  }, [accessToken, id, userID, email]);

  const handleSave = async () => {
    try {
      await axios.post(
        `http://localhost:8000/user/save?userid=${userID}&recipeid=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving recipe");
      console.error(error);
    }
  };

  const handleUnsave = async () => {
    try {
      await axios.post(
        `http://localhost:8000/user/unsave?userid=${userID}&recipeid=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsSaved(false);
    } catch (error) {
      console.error("Error unsaving recipe");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        `http://localhost:8000/admin/delete?id=${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Error deleting recipe");
      console.error(error);
    }
  };

  const handleApprove = async () => { 
    try {
      await axios.post(
        `http://localhost:8000/admin/approve?id=${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Error approving recipe");
      console.error(error);
    }
  };

  if (!isLoggedIn || (!isApproved && email !== "admin@savorytastes.org")) {
    return <ErrorPage code={403} message="Forbidden" />;
  }

  if (recipe !== null) {
    return (
      <Container maxW={"7xl"} p={10}>
        <Flex justifyContent="flex-end" mb={4}>
          <Stack gap={2} direction="row">
          {isApproved && (
            isSaved ? (
              <Button onClick={handleUnsave}>Unsave</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )
          )}
          {!isApproved && 
            <>
              <IconButton
                icon={<CheckIcon />}
                aria-label="Approve"
                onClick={handleApprove}
                mr={2}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete"
                onClick={handleDelete}
              />
            </>
          }
          {isCreatedByUser && isApproved && (
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              onClick={handleDelete}
            />
          )}
          </Stack>
        </Flex>
        {recipe && (
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"recipe image"}
                fallbackSrc="https://via.placeholder.com/550"
                src={recipe.images?.LARGE?.url || recipe.image}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {recipe.label}
                </Heading>
                <Text fontWeight={300} fontSize={"2xl"}>
                  {Math.round(recipe.calories) + " calories"}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"2xl"} fontWeight={"300"}>
                    {"Author: " + recipe.source}
                  </Text>
                </VStack>
                <Box gap={5}>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Tags
                  </Text>
                  <Tag size="lg" m={2}>
                    {recipe?.dishType[0]}
                  </Tag>
                  <Tag size="lg" m={2}>
                    {recipe?.mealType[0]}
                  </Tag>
                  <Tag size="lg" m={2}>
                    {recipe?.cuisineType[0]}
                  </Tag>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Ingredients
                  </Text>
                  <UnorderedList spacing={2}>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <ListItem key={idx}>
                        <Text as={"span"}>{ingredient.text}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        )}
        <Chatbot />
        <Replies replies={recipe.comments} />
      </Container>
    );
  } else if (isLoading) {
    return <ErrorPage message="Loading..." />;
  } else {
    return <ErrorPage code={404} message="Recipe not Found" />;
  }
};

export default RecipeDetailPage;

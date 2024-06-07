import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";
import RecipePreview from "./RecipePreview";
import {
  SimpleGrid,
  Box,
  Heading,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ErrorPage from "./ErrorPage";

const MyRecipesPage = () => {
  const { accessToken, userID, isLoggedIn, email } = useContext(AuthContext);
  const [savedRecipes, setSavedRecipes] = useState(null);
  const [myRecipes, setMyRecipes] = useState(null)

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/saved?userid=${userID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSavedRecipes(response.data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMyRecipes = async () => {
      try {
        console.log(
          `http://localhost:8000/user/create?user=${email.split("@")[0]}`
        );
        const response = await axios.get(
          `http://localhost:8000/user/created?user=${email.split("@")[0]}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMyRecipes(response.data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipes();
    fetchMyRecipes();
  }, [accessToken, userID, email]);

  if (isLoggedIn !== "true") {
    return <ErrorPage code={403} message="Unauthorized" />;
  } else if (!savedRecipes || !myRecipes) {
    return <ErrorPage message="Loading..." />;
  }

  return (
    <Box p={10}>
      <Tabs>
        <TabList>
          <Tab _selected={{color: "#ff8e3c"}}>Saved Recipes</Tab>
          <Tab _selected={{color: "#ff8e3c"}}>My Recipes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {savedRecipes && savedRecipes.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={5}
              >
                {savedRecipes.map((recipe, idx) => (
                  <Link key={idx} href={`/recipe/${recipe.id}`}>
                    <RecipePreview data={recipe} forMyRecipes={true} />
                  </Link>
                ))}
              </SimpleGrid>
            ) : (
              <Heading textAlign="center" size="lg">
                Check out the{" "}
                <Link
                  href="/discover"
                  textDecoration="underline"
                  color="orange.400"
                >
                  Discover
                </Link>{" "}
                page to save your first recipe!
              </Heading>
            )}
          </TabPanel>

          <TabPanel>
            {myRecipes && myRecipes.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={5}
              >
                {myRecipes.map((recipe, idx) => (
                  <Link key={idx} href={`/recipe/${recipe.id}`}>
                    <RecipePreview data={recipe} forMyRecipes={true} />
                  </Link>
                ))}
              </SimpleGrid>
            ) : (
              <Heading textAlign="center" size="lg">
                You haven't created any recipes yet. Start by creating your
                first recipe!
              </Heading>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyRecipesPage;

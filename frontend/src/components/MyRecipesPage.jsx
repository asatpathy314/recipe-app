import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthProvider';
import RecipePreview from "./RecipePreview";
import {
  SimpleGrid,
  Box,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import ErrorPage from './ErrorPage';

const MyRecipesPage = () => {
  const { accessToken, userID, isLoggedIn } = useContext(AuthContext);
  const [recipes, setRecipes] = useState(null); // [recipe1, recipe2, recipe3, ...
  useEffect(() => {
    const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/saved?userid=${userID}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data)
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error(error)
            }
        }
    fetchData();
  }, [accessToken, userID])
  if (recipes && recipes.length > 0 && isLoggedIn === "true") {
    return (
      <>
        {recipes && (
          <Box p={10}>
            <Heading mb={6}>Saved Recipes</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
              {recipes.map((recipe, idx) => {
                return (
                <Link key={idx} href={`/recipe/${recipe.id}`}>
                  <RecipePreview data={recipe} forMyRecipes={true} />
                </Link>
              );
              })}
            </SimpleGrid>
          </Box>
        )}
      </>
    );
  } else if (isLoggedIn === "true") {
    return (
      <>
      <Box p={10} h="80vh" display="flex" justifyContent="center" alignItems="center">
        <Heading textAlign="center" size="lg">Check out the <Link href="/discover" textDecoration="underline" color='orange.400'>Discover</Link> page to save your first recipe!</Heading>
      </Box>
      </>
    );
    
  } else {
    return <ErrorPage code={403} message="Unauthorized" />;
  }
}

export default MyRecipesPage;

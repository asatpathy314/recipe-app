import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthProvider';
import RecipePreview from "./RecipePreview";
import {
  SimpleGrid,
  Box,
  Heading,
} from "@chakra-ui/react";

const MyRecipesPage = () => {
  const { accessToken, userID } = useContext(AuthContext);
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
  return (
    <>
      {recipes && (
        <Box p={10}>
          <Heading mb={6}>Saved Recipes</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
            {recipes.map((recipe, idx) => {
              return <RecipePreview key={idx} data={recipe} forMyRecipes={true} />;
            })}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}

export default MyRecipesPage;

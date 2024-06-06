import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { SimpleGrid, Heading, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import RecipePreview from './RecipePreview';
import ErrorPage from './ErrorPage';

const AdminPage = () => {
  const { accessToken, email, userID, isLoggedIn } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/recipe/unapproved', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setRecipes(response.data);
    };
    fetchData();
  }, [accessToken]);
  if (isLoggedIn === "false" || email !== 'admin@savorytastes.org') {
    return (
        <ErrorPage code={403} message="Forbidden" />
    )
  }
  return (
    <>
      <div className='main-container'>
        <Heading mb={6}>Admin Dashboard</Heading>
        {recipes.length === 0 ? (
          <Text fontSize="xl">There are currently no recipes to verify.</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={5}>
            {recipes.map((recipe, idx) => (
              <Link key={idx} href={`/recipe/${recipe.id}`}>
                <RecipePreview data={recipe} forAdmin={true} />
              </Link>
            ))}
          </SimpleGrid>
        )}
      </div>
    </>
  );
};

export default AdminPage;

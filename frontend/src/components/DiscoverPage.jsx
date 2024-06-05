import { useState, useEffect, useContext } from 'react';
import { SimpleGrid, Input, Button, Box, Heading, Link } from '@chakra-ui/react';
import axios from 'axios';
import RecipePreview from './RecipePreview';
import TagsSearch from './TagsSearch'
import { AuthContext } from '../components/AuthProvider';
import '../styles/discover-page.css'

const DiscoverPage = () => {
    const { accessToken } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [recipes, setRecipes] = useState(null); // [recipe1, recipe2, recipe3, ...
    const [meal, setMeal] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dish, setDish] = useState('');
    const extractID = (url) => {
        // Extract the part after the hash (#)
        const id = url.split('#recipe_')[1];
        console.log(id); // Output: 9f205a876e184d3abd5965451d94931e
        return id;
    }

    useEffect(() => {
        console.log('we ball')
        const fetchData = async () => {
            if (! isSearch ) {
                try {
                    const response = await axios.get('http://localhost:8000/recipe/random',{
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setRecipes(response.data);
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchData()
    }, [isSearch, accessToken])
    const handleSubmit = () => {

    }

    return (
        <>
            <Box p={10}>
                <Heading mb={6}>Discover new recipes</Heading>
                <div className="load-recipes">
                    <form>
                        <Input
                            placeholder='Search'
                            style={{marginBottom:"15px"}}
                            _hover={{backgroundColor:"rgb(231, 231, 231)"}}
                        />
                        <SimpleGrid 
                        columns={{ sm: 1, md:2, lg:4}}
                        spacing={4}>
                            <TagsSearch type="user" inputState={user} changeInputState={setUser}/>
                            <TagsSearch type="meal" inputState={meal} changeInputState={setMeal}/>
                            <TagsSearch type="cuisine" inputState={cuisine} changeInputState={setCuisine}/>
                            <TagsSearch type="dish" inputState={dish} changeInputState={setDish}/>
                        </SimpleGrid>
                        <Button
                            style={{marginTop:"20px"}}
                            onClick={handleSubmit}
                            fontWeight={500}
                            color={"white"}
                            bg={"#ff8e3c"}
                            _hover={{
                                bg: "#ff9d56",
                            }}
                        >
                            Load more recipes
                        </Button>
                    </form>
                </div>
                {recipes &&
                <div colSpan={{base:5,md:4}} className="recipes">
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={5}>
                        {recipes.map((recipe, idx)=>{
                            return (
                            <Link key={idx} href={`/recipe/${extractID(recipe.uri)}`}>
                                <RecipePreview data={recipe} forAdmin={false}/>
                            </Link>
                        )
                        })}
                    </SimpleGrid>
                </div>
                }
            </Box>
        </>
    )
}

export default DiscoverPage

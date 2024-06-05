import { useState, useEffect, useContext } from 'react';
import { SimpleGrid, Input, Button, Box} from '@chakra-ui/react';
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
                    setRecipes(response.data.hits);
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
        // <>
        //     <div className='main-container'>
        //         <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        //             <GridItem className="sidebar">
        //                 hello
        //             </GridItem>
        //             <GridItem colSpan={{base:5,md:4}} className="recipes">
        //                 <SimpleGrid
        //                     columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        //                     spacing={5}>
        //                     {dummyData.map((recipe, idx)=>{
        //                         return <RecipePreview key={idx} data={recipe} forAdmin={false}/>
        //                     })}
        //                 </SimpleGrid>
        //             </GridItem>
        //         </Grid>
        //     </div>
        // </>
        <>
            <Box p={10}>
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
                            return <RecipePreview key={idx} data={recipe} forAdmin={false}/>
                        })}
                    </SimpleGrid>
                </div>
                }
            </Box>
        </>
    )
}

export default DiscoverPage

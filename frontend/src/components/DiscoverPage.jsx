import { useState } from 'react';
import { SimpleGrid, Input, Button, Box} from '@chakra-ui/react';
import RecipePreview from './RecipePreview';
import TagsSearch from './TagsSearch'
import '../styles/discover-page.css'

const DiscoverPage = () => {
    const [user, setUser] = useState('');
    const [meal, setMeal] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dish, setDish] = useState('');

    const dummyData = [
        {
            img:"https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
            title: "warm salad with beef with avocado mango salsa",
        },
        {
            img:"https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
            title: "fried plantains",
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
            title: "chili wontons"
        },
        {
            img:"https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
            title: "fried okra",
        },
        {
            img:"https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
            title: "fried plantains",
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
            title: "chili wontons"
        },
        {
            img:"https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
            title: "fried okra",
        },
        {
            img:"https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
            title: "fried plantains",
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
            title: "chili wontons"
        }
    ]
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
                <Heading mb={6}>Discover new recipes</Heading>
                <div className="load-recipes">
                    <form onSubmit={handleSubmit}>
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
                            type="submit"
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
                <div colSpan={{base:5,md:4}} className="recipes">
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={5}>
                        {dummyData.map((recipe, idx)=>{
                            return <RecipePreview key={idx} data={recipe} forAdmin={false}/>
                        })}
                    </SimpleGrid>
                </div>
            </Box>
        </>
    )
}

export default DiscoverPage

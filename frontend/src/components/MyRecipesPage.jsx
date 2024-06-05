import RecipePreview from './RecipePreview';
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';

const MyRecipesPage = () => {
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
  return (
    <>
      <Box p={10}>
          <Heading mb={6}>Revisit your recipes</Heading>
          <div colSpan={{base:5,md:4}} className="recipes">
              <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={5}>
                  {dummyData.map((recipe, idx)=>{
                      return <RecipePreview key={idx} data={recipe} forMyRecipes={true}/>
                  })}
              </SimpleGrid>
          </div>
      </Box>
    </>
  )
}

export default MyRecipesPage
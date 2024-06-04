import {SimpleGrid} from '@chakra-ui/react';
import RecipePreview from './RecipePreview';
const DiscoverPage = () => {
    const dummyData = [
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
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={4}
            >
                {dummyData.map((recipe)=>{
                    return <RecipePreview img={recipe.img} title = {recipe.title} forAdmin={false}/>
                })}
            </SimpleGrid>
        </>
    )
}

export default DiscoverPage

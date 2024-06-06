import RecipePreview from "./RecipePreview";
import {
  SimpleGrid,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const MyRecipesPage = () => {
  const dummyData = [
    {
      image:
        "https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
      label: "warm salad with beef with avocado mango salsa",
    },
    {
      image:
        "https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
      label: "fried plantains",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
      label: "chili wontons",
    },
    {
      image:
        "https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
      label: "fried okra",
    },
    {
      image:
        "https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
      label: "fried plantains",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
      label: "chili wontons",
    },
    {
      image:
        "https://houseofnasheats.com/wp-content/uploads/2022/12/Fried-Okra-Square-1-1.jpg",
      label: "fried okra",
    },
    {
      image:
        "https://www.simplyrecipes.com/thmb/EOMPaYatIY67uFqUXTedXJoCFic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Maduros-Serp-LEAD-Overhead-Vertical-61b72217c65b46108a09b649b7c28ae0.jpg",
      label: "fried plantains",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsuQKW_MzRBXx2OmaOCC1WUh4iQt217oc9g&s",
      label: "chili wontons",
    },
  ];
  return (
    <Box p={10}>
      <Heading mb={6}>Saved Recipes</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {dummyData.map((recipe, idx) => {
          return <RecipePreview key={idx} data={recipe} forMyRecipes={true} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default MyRecipesPage;

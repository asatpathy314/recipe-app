import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, VStack, HStack, Input, Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import Chatbot from './Chatbot';
import Slider from 'react-slick';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';


const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RecipeDetailPage = ({ match }) => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const images = recipe.images || [
    'https://via.placeholder.com/900x600?text=No+Image+Available'
  ];

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Heading as="h1">{recipe.name}</Heading>
      <Text fontSize="lg">{recipe.description}</Text>

      <Box
        position={'relative'}
        height={'600px'}
        width={'full'}
        overflow={'hidden'}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}>
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}>
          <BiRightArrowAlt />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {images.map((url, index) => (
            <Box
              key={index}
              height={'6xl'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>

      <Box>
        <Heading as="h2" size="lg">Ingredients</Heading>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </Box>

      <Box>
        <Heading as="h2" size="lg">Instructions</Heading>
        <Text>{recipe.instructions}</Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg">Comments and Ratings</Heading>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <HStack>
            <Input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <Button type="submit" colorScheme="blue">Submit</Button>
          </HStack>
        </form>
      </Box>

      <Box>
        <Heading as="h2" size="lg">Chatbot</Heading>
        <Chatbot />
      </Box>
    </VStack>
  );
};

export default RecipeDetailPage;

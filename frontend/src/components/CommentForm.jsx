import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import Ratings from './Ratings'

const CommentForm = ({ addComment }) => {
  const { id } = useParams();
  const { accessToken, email } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      user: email.split("@")[0],
      text,
      createdAt: new Date().toISOString(),
      replies: [],
      rating:rating,
    };
    const dbComment = {
      user: email.split("@")[0],
      text,
      createdAt: new Date().toISOString(),
      rating:rating,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/comment?id=${id}`,
        dbComment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data.message);
      addComment(newComment);
      setText('');
      setRating(0)
    } catch (error) {
      console.error("Error adding comment");
      console.error(error);
    }
  };

  return (
    <Box as="form" mt={4} onSubmit={handleCommentSubmit}>
      <FormControl isRequired mt={4}>
        <FormLabel>Add a rating</FormLabel>
        <Ratings rating={rating} setRating={setRating}/>
    </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Add a comment</FormLabel>
        <Textarea
          maxLength={450}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      </FormControl>
      <Button
        mb={6}
        mt={4}
        type="submit"
        color={"white"}
        fontSize={"sm"}
        fontWeight={600}
        bg={"#ff8e3c"}
        _hover={{
          bg: "#ff9d56",
        }}
      >
        Comment
      </Button>
    </Box>
  );
};

export default CommentForm;

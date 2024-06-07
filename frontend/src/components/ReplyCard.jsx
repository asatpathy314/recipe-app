import { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Text,
  IconButton,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { FaReply, FaTrash } from "react-icons/fa";
import ReplyForm from "./ReplyForm.jsx";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Ratings from './Ratings'

const ReplyCard = ({
  isComment,
  postId,
  commentId,
  replyId,
  author,
  content,
  date,
  addReply,
  deleteReply,
  deleteComment,
  rating,
  ...rest
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { accessToken, email } = useContext(AuthContext);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleDeleteClick = async () => {
    if (isComment) {
      try {
        await axios.delete(
          `http://localhost:8000/comment?recipeid=${postId}&commentid=${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        deleteComment(commentId);
      } catch (error) {
        console.error("Error deleting comment");
        console.error(error);
      }
    } else {
      try {
        await axios.delete(
          `http://localhost:8000/comment/reply?recipeid=${postId}&commentid=${commentId}&replyid=${replyId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        deleteReply(commentId, replyId);
      } catch (error) {
        console.error("Error deleting reply");
        console.error(error);
      }
    }
  };

  return (
    <Card
      border="1px solid #cacaca"
      boxShadow="none"
      borderRadius="lg"
      pb={4}
      pt={5}
      mb={4}
      {...rest}
    >
      <CardHeader pt={0} pb={0}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">{author}</Text>
          <Text fontSize="sm" color="gray.500">
            {date.slice(0, 10)}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody pt={2} pb={0}>
        <Stack>
          <Ratings submittedRating={rating}/>
          <Text>{content}</Text>
          {showReplyForm && isComment && (
            <Box mt={0} ml={4}>
              <ReplyForm
                postId={postId}
                commentId={commentId}
                addReply={addReply}
              />
            </Box>
          )}
        </Stack>
      </CardBody>
      {content !== "[This comment was deleted by the user.]" && (
        <CardFooter pt={2} pb={0}>
          {isComment && (
            <IconButton
              variant="solid"
              size="sm"
              bg="transparent"
              icon={<FaReply />}
              onClick={handleReplyClick}
            />
          )}
          {email.split("@")[0] === author && (
            <IconButton
              ml={2}
              variant="solid"
              size="sm"
              bg="transparent"
              icon={<FaTrash />}
              onClick={handleDeleteClick}
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ReplyCard;

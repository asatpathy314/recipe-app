import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Box, Text, IconButton, Flex, Stack } from '@chakra-ui/react';
import { FaReply } from "react-icons/fa";
import ReplyForm from './ReplyForm.jsx';

const ReplyCard = ({ isComment, postId, commentId, author, content, date, addReply, ...rest }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    };

    return (
        <Card borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" direction="row" mb={4} {...rest}>
            <CardHeader>
                <Flex alignItems="center">
                    <Box ml="3">
                        <Text fontWeight="bold">{author}</Text>
                        <Text fontSize="sm" color="gray.500">{date}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack>
                <Text>{content}</Text>
                {showReplyForm && isComment && (
                <Box mt={4} ml={4}>
                    <ReplyForm postId={postId} commentId={commentId} addReply={addReply} />
                </Box>
            )}
            </Stack>
            </CardBody>
            <CardFooter>
                {isComment &&
                <IconButton variant="solid" size="sm" bg="transparent" icon={<FaReply />} onClick={handleReplyClick} />
                }   
            </CardFooter>
        </Card>
    );
};

export default ReplyCard;

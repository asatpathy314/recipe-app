import { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const CommentForm = ({ addComment }) => {
    const { id } = useParams();
    const { accessToken, email } = useContext(AuthContext);
    const [text, setText] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const newComment = { user: email.split('@')[0], text, createdAt: new Date().toISOString(), replies: [] };
        const dbComment = { user: email.split('@')[0], text, createdAt: new Date().toISOString() };

        try {
            const response = await axios.post(`http://localhost:8000/comment?id=${id}`, dbComment, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            
            console.log(response.data.message);
            addComment(newComment);
            setText('');
        } catch (error) {
            console.error('Error adding comment');
            console.error(error);
        }
    };

    return (
        <Box as="form" mt={4} onSubmit={handleCommentSubmit}>
            <FormControl isRequired mt={4}>
                <FormLabel>Comment</FormLabel>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default CommentForm;

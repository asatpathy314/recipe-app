import { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const ReplyForm = ({ postId, commentId, addReply }) => {
    const { accessToken, email } = useContext(AuthContext);
    const [text, setText] = useState('');

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const newReply = { user: email.split('@')[0], text, createdAt: new Date().toISOString() };
        const dbReply = { user: email.split('@')[0], text, createdAt: new Date().toISOString() };

        try {
            const response = await axios.post(`http://localhost:8000/comment/reply?postid=${postId}&commentid=${commentId}`, dbReply, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            console.log(response.data.message);
            addReply(newReply);
            setText('');
        } catch (error) {
            console.error('Error adding reply');
            console.error(error);
        }
    };

    return (
        <Box as="form" mt={4} onSubmit={handleReplySubmit}>
            <FormControl isRequired mt={4}>
                <FormLabel>Reply</FormLabel>
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

export default ReplyForm;

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import ReplyCard from './ReplyCard'; // Adjust the import path as necessary
import { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import CommentForm from './CommentForm'; // Adjust the import path as necessary

const Replies = ({ replies }) => {
    const [localReplies, setLocalReplies] = useState(replies);
    const { id } = useParams();

    const addComment = (newComment) => {
        setLocalReplies([...localReplies, newComment]);
    };
    
    const addReply = (commentId, newReply) => {
        setLocalReplies(prevComments => 
            prevComments.map(comment => 
                comment.id === commentId 
                ? { ...comment, replies: [...comment.replies, newReply] } 
                : comment
            )
        );
    };

    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Replies
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {localReplies.map((reply, index) => (
                        <div key={index}>
                            <ReplyCard
                                isComment={true}
                                commentId={reply.id}
                                postId={id}
                                author={reply.user}
                                content={reply.text}
                                date={reply.createdAt}
                                addReply={(newReply) => addReply(reply.id, newReply)}
                            />
                            {reply.replies.map((subReply, subIndex) => (
                                <ReplyCard
                                    isComment={false}
                                    key={'reply' + subIndex}
                                    commentId={reply.id}
                                    postId={id}
                                    author={subReply.user}
                                    content={subReply.text}
                                    date={subReply.createdAt}
                                    ml={20}
                                    addReply={(newReply) => addReply(reply.id, newReply)}
                                />
                            ))}
                        </div>
                    ))}
                    <CommentForm addComment={addComment} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Replies;

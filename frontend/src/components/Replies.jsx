import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text
} from '@chakra-ui/react';
import ReplyCard from './ReplyCard'; // Adjust the import path as necessary
import { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import CommentForm from './CommentForm'; // Adjust the import path as necessary
import '../styles/comments.css'

const Replies = ({ replies }) => {
    const [localReplies, setLocalReplies] = useState(replies);
    const { id } = useParams();

    const addComment = (newComment) => {
        setLocalReplies([...localReplies, newComment]);
    };
    const deleteComment = (commentID) => {
        // let newComments = [];
        // for (let reply in localReplies){
        //     if (reply.id === commentID){
        //         if (reply.replies){
        //             newComments.push({...reply, text: "[This comment was deleted by the user.]"})
        //         }
        //     } else {
        //         newComments.push(reply)
        //     }
        // }
        // setLocalReplies(newComments);
        setLocalReplies(localReplies.filter(reply => reply.id !==commentID));
    }
    
    const addReply = (commentId, newReply) => {
        setLocalReplies(prevComments => 
            prevComments.map(comment => 
                comment.id === commentId 
                ? { ...comment, replies: [...comment.replies, newReply] } 
                : comment
            )
        );
    };
    const deleteReply = (commentID, replyID) => {
        setLocalReplies(prevComments => 
            prevComments.map(comment =>
                comment.id === commentID
                ? {...comment, replies: comment.replies.filter(reply=>reply.id !== replyID)}
                : comment
            )
        )
    }

    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton bg={"#eff0f3"}>
                        <Box as='span' flex='1' textAlign='left'>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            fontWeight={'500'}
                            textTransform={'uppercase'}>
                            Comments
                        </Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <CommentForm addComment={addComment} />
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
                                deleteReply={deleteReply}
                                deleteComment={deleteComment}
                            />
                                {reply.replies.map((subReply, subIndex) => (
                                    <ReplyCard
                                        isComment={false}
                                        key={'reply' + subIndex}
                                        replyId={subReply.id}
                                        commentId={reply.id}
                                        postId={id}
                                        author={subReply.user}
                                        content={subReply.text}
                                        date={subReply.createdAt}
                                        ml={20}
                                        addReply={(newReply) => addReply(reply.id, newReply)}
                                        deleteReply={deleteReply}
                                        deleteComment={deleteComment}
                                    />
                                ))}
                        </div>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Replies;

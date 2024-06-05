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
import CommentForm from './CommentForm'; // Adjust the import path as necessary

const Replies = ({ replies }) => {
    const [localReplies, setLocalReplies] = useState(replies);

    const addComment = (newComment) => {
        setLocalReplies([...localReplies, newComment]);
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
                                author={reply.user}
                                content={reply.text}
                                date={reply.createdAt}
                            />
                            {reply.replies.map((subReply, subIndex) => (
                                <ReplyCard
                                    key={'reply' + subIndex}
                                    author={subReply.user}
                                    content={subReply.text}
                                    date={subReply.createdAt}
                                    ml={20}
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

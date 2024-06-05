import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import ReplyCard from './ReplyCard'; // Adjust the import path as necessary

const Replies = ( {replies} ) => {
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
                    {replies.map((reply, index) => (
                        <>
                        <ReplyCard
                            key={index}
                            author={reply.user}
                            content={reply.text}
                            date={reply.createdAt}
                        />
                        {reply.replies.map((reply, index) => (
                            <ReplyCard 
                                key={'reply'+index}
                                author={reply.user}
                                content={reply.text}
                                date={reply.createdAt}
                                ml={20}
                            />
                        ))}
                        </>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Replies;

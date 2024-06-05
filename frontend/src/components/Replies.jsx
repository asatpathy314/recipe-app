import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import ReplyCard from './ReplyCard'; // Adjust the import path as necessary

const Replies = () => {
    const replies = [
        { author: 'John Doe', content: 'This is a reply.', date: '2024-06-05' },
        { author: 'Jane Smith', content: 'Another reply here.', date: '2024-06-04' },
    ];

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
                        <ReplyCard
                            key={index}
                            author={reply.author}
                            content={reply.content}
                            date={reply.date}
                        />
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Replies;

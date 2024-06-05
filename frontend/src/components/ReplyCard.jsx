import { Card, CardHeader, CardBody, CardFooter, Box, Text, IconButton, Avatar, Flex } from '@chakra-ui/react';
import { FaReply } from "react-icons/fa";

const ReplyCard = ({ author, content, date, ...rest}) => {
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
                <Text>{content}</Text>
            </CardBody>
            <CardFooter>
                <IconButton variant="solid" size="sm" bg="transparent" icon={<FaReply/>} />
            </CardFooter>
        </Card>
    );
};

export default ReplyCard;

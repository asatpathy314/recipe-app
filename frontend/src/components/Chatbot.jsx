import { useState } from 'react';
import {  Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input, Button, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/gpt', {
        messages: updatedMessages,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const assistantMessage = response.data;
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box p={4} maxW="600px" mx="auto">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Input
            placeholder="Ask a cooking question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            isDisabled={loading}
          />
          <Button type="submit" colorScheme="teal" isLoading={loading}>
            Ask GPT
          </Button>
        </VStack>
        <Accordion allowToggle mt={4}>
          {messages.map((msg, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>{msg.content}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
  );
};

export default Chatbot;

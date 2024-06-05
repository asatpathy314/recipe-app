import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Button
} from '@chakra-ui/react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you with the recipe today?', sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSend = () => {
    if (userInput.trim() === '') return;

 
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);

    const botResponse = getBotResponse(userInput);
    setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    setUserInput('');
  };

  const getBotResponse = (input) => {
   
    const responses = {
      'how to make': 'To make this recipe, follow the instructions step by step.',
      'ingredients': 'The ingredients are listed in the ingredients section above.',
      'time': 'The estimated cooking time is mentioned in the recipe details.',
      'default': 'Sorry, I did not understand that. Can you please rephrase?'
    };

    for (const key in responses) {
      if (input.toLowerCase().includes(key)) {
        return responses[key];
      }
    }

    return responses['default'];
  };

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Chat History
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Send a Message
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="chatbot-input">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              mb={2}
            />
            <Button onClick={handleSend} colorScheme="blue">
              Send
            </Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Chatbot;

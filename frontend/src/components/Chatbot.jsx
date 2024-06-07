
import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";

const Chatbot = ( {ingredients} ) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState(ingredients);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const ingredientsString = recipeIngredients.map((ingredient) => ingredient.text).toString();
    try {
      const response = await axios.post(
        "http://localhost:8000/gpt",
        {
          messages: updatedMessages,
          ingredients: ingredientsString,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const assistantMessage = response.data.message;
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      maxW="600px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      my={10}
    >
      <VStack spacing={4} as="form" onSubmit={handleSubmit}></VStack>
      <Box mt={4} maxH="300px" overflowY="scroll">
        {messages.map((msg, index) => {
          console.log(msg.content)
          const content = msg.content.split('\n').map((text, index) => (
            <React.Fragment key={index}>
              {text}
              <br />
            </React.Fragment>
          ));
          return (
          <HStack key={index} align="start" spacing={4} mt={2}>
            <Avatar name={msg.role === "user" ? "You" : "Assistant"} />
            <Box
              bg={msg.role === "user" ? "teal.100" : "gray.100"}
              p={3}
              borderRadius="md"
              maxW="80%"
            >
              <Text>{content}</Text>
            </Box>
          </HStack>
        )})}
      </Box>
      <VStack spacing={4} mt={5} as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          isDisabled={loading}
        />
        <Button mt={5} type="submit" bg="#ff8e3c" color="white" isLoading={loading}>
          Ask CookGPT
        </Button>
      </VStack>
    </Box>
  );
};

export default Chatbot;

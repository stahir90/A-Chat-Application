import React from "react";

import { Container, Box } from "@material-ui/core";

// import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message";

interface MessagesProps {
  messages: Array<{ user: String; text: String }>;
  name: String | String[] | null | undefined;
}

const Messages: React.FC<MessagesProps> = ({ messages, name }) => {
  return (
    <Container component="main" maxWidth="sm">
      <Box borderColor="primary">
        {messages.map((message, index) => (
          <Message key={index} message={message} name={name} />
        ))}
      </Box>
    </Container>
  );
};

export default Messages;

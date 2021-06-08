import React from "react";
import { Container, Typography } from "@material-ui/core";

interface MessageProps {
  message: { user: String; text: String };
  name: String | String[] | null | undefined;
}

const Message: React.FC<MessageProps> = ({ message, name }) => {
  const { user, text } = message;
  name = name?.toString().trim().toLowerCase();
  let isSentByUser = false;

  if (user === name) {
    isSentByUser = true;
  }

  return (
    <Container maxWidth="sm">
      <Container style={{ margin: "20px" }} maxWidth="sm">
        <Typography
          align={isSentByUser ? "right" : "left"}
          color={isSentByUser ? "textPrimary" : "textSecondary"}
          variant="body2"
        >
          {user}
        </Typography>
        <Typography
          align={isSentByUser ? "right" : "left"}
          color={isSentByUser ? "primary" : "secondary"}
          variant="body1"
        >
          {text}
        </Typography>
      </Container>
    </Container>
  );
};

export default Message;

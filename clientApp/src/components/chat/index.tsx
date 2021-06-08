import React, { useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Container, Button, TextField, FormControl } from "@material-ui/core";
import ChatBar from "../chatBar";
import Messages from "../messages";

interface ChatProps {
  location: any;
}

let socket: any;

const Chat: React.FC<ChatProps> = ({ location }) => {
  const ENDPOINT = "localhost:5000";
  const [name, setName] = React.useState<String | String[] | null>();
  const [room, setRoom] = React.useState<String | String[] | null>();
  const [description, setDescription] = React.useState<
    String | String[] | null
  >();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<
    Array<{ user: String; text: String }>
  >([]);

  useEffect(() => {
    const data = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(data.name);
    setRoom(data.room);
    setDescription(data.description);

    // Send Events
    socket.emit(
      "join",
      { name: data.name, room: data.room, description: data.description },
      () => {
        // alert(error);
      }
    );

    // Disconnect the socket when unmount will call
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message: any) => {
      console.log("Return Message");
      console.log([...messages, message]);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <ChatBar room={room} description={description} />
      <Messages messages={messages} name={name} />
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={message}
          fullWidth
          id="message"
          label="Enter Message"
          autoFocus
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(event) => sendMessage(event)}
        >
          Send
        </Button>
      </FormControl>
    </Container>
  );
};
export default Chat;

import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, TextField, Typography } from "@material-ui/core";

const Join: React.FC = () => {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <Container style={{ marginTop: "10%" }} component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Join The Room
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Enter Name"
        autoFocus
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="room"
        label="Enter Room"
        id="room"
        onChange={(event) => setRoom(event.target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="description"
        label="Room Description"
        autoFocus
        onChange={(event) => setDescription(event.target.value)}
      />

      <Link
        to={`/chat?name=${name}&room=${room}&description=${description}`}
        onClick={(event) => {
          if (!name || !room) {
            event.preventDefault();
          }
        }}
      >
        <Button type="submit" fullWidth variant="contained" color="primary">
          Launch!
        </Button>
      </Link>
    </Container>
  );
};
export default Join;

import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Typography, Divider } from "@material-ui/core";

interface BarProps {
  room: String | String[] | null | undefined;
  description: String | String[] | null | undefined;
}

const Bar: React.FC<BarProps> = ({ room, description }) => {
  return (
    <Container style={{ marginTop: "20%" }} component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        {room}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Divider />
      <Container style={{ textAlign: "end", marginTop: "20px" }}>
        <Link to={`/`}>
          <Button type="submit" variant="contained" color="primary">
            X
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

export default Bar;

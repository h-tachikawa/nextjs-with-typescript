import * as React from "react";
import type { NextPage, GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Switch from "@mui/material/Switch";
import axios from "axios";
import * as t from "io-ts";
import { isRight } from "fp-ts/Either";

type Props = {
  message: string;
};

const About: NextPage<Props> = ({ message }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {message}
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <Box>
          <Switch defaultChecked />
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

const TodoResponse = t.type({
  userId: t.number,
  id: t.string,
  title: t.string,
  completed: t.boolean,
});

type Todo = t.TypeOf<typeof TodoResponse>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const endpointBase = "https://jsonplaceholder.typicode.com";
  const { data } = await axios.get<Todo>(`${endpointBase}/todos/1`);
  const todo = TodoResponse.decode(data);
  const result = isRight(todo) ? todo.right : todo.left;

  return {
    props: {
      message: JSON.stringify(result),
    },
  };
};

export default About;

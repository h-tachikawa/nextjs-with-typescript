import { useQuery, gql } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import type { GetUser } from "../__generated__/GetUser";
import Button from "@mui/material/Button";
import Link from "../../src/Link";
import Box from "@mui/material/Box";
import * as React from "react";

export const GET_USER_QUERY = gql`
    query GetUser($id: ID!) {
        __typename
        user(id: $id) {
            __typename
            id
            name
        }
    }
`;

const Csr: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery<GetUser>(GET_USER_QUERY, {
    variables: {
      id
    }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const user = data?.user;

  return (
      <div>
        <p>ID: { user?.id }</p>
        <p>Name: { user?.name }</p>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
      </div>
  );
};

export default Csr;

import { useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import type { GetCountries } from './__generated__/GetCountries';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import Box from '@mui/material/Box';
import * as React from 'react';

const QUERY = gql`
  query GetCountries {
      __typename
      countries {
          __typename
          code
          name
          emoji
      }
  }
`;

const Csr: NextPage = () => {
  const { data, loading, error } = useQuery<GetCountries>(QUERY);

  if (loading) {
    return (
        <div>
          loading...
        </div>
    );
  }

  const countries = data?.countries.slice(0, 4);

  return (
      <div>
        {countries?.map(country => (
            <p key={country.code}>
              {country.code} - {country.emoji}
            </p>
        ))
        }
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
      </div>
  );
};

export default Csr;

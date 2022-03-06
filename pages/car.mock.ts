import { MockedResponse } from "@apollo/client/testing";
import { GetCountries } from "./__generated__/GetCountries";
import { GET_COUNTRIES_QUERY } from "./csr";

export const getCountriesQueryMock: ReadonlyArray<
  MockedResponse<GetCountries>
> = [
  {
    request: {
      query: GET_COUNTRIES_QUERY,
    },
    result: {
      data: {
        countries: [
          {
            __typename: "Country",
            code: "JP",
            name: "Japan",
            emoji: "🇯🇵",
          },
          {
            __typename: "Country",
            code: "US",
            name: "United States",
            emoji: "🇺🇸",
          },
        ],
      },
    },
  },
];

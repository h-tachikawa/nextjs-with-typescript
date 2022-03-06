import { graphql } from "msw";
import type { GetCountries } from "../pages/__generated__/GetCountries";

export const handlers = [
  graphql.query<GetCountries>("GetCountries", (req, res, ctx) => {
    return res(
      ctx.data({
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
      })
    );
  }),
];

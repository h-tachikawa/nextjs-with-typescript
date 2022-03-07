import Csr from "./csr";
import { render, act } from "@testing-library/react";
import { graphql, GraphQLHandler, GraphQLRequest } from "msw";
import { sleep } from "../lib/sleep";
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import { server } from "../mocks/server";
import React from "react";
import { GetCountries } from "./__generated__/GetCountries";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  pathname: "/",
}));

jest.mock("next/link", () => {
  // @ts-ignore
  return ({ children }) => {
    return children;
  };
});

export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (responseOverride) {
      server.use(responseOverride);
    }
    return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
  };

describe("Csr Component", () => {
  beforeEach(() => client.cache.reset());

  describe("ordinary", () => {
    it("renders without error", async () => {
      const render = testRenderer(<Csr />);
      const { asFragment } = render();

      await act(async () => {
        await sleep(10);
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("when empty response", () => {
    it("renders without error", async () => {
      const render = testRenderer(<Csr />);
      const { asFragment } = render(
        graphql.query<GetCountries>("GetCountries", (req, res, ctx) => {
          return res(
            ctx.data({
              countries: [],
            })
          );
        })
      );

      await act(async () => {
        await sleep(10);
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

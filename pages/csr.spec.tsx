import Csr from "./csr";
import { render, act } from "@testing-library/react";
import { graphql, GraphQLHandler, GraphQLRequest } from "msw";
import { sleep } from "../lib/sleep";
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import { server } from "../mocks/server";
import React from "react";
import { GetCountries } from "./__generated__/GetCountries";

const Router = require("next/router");
const useRouterStub = jest.spyOn(Router, "useRouter");
useRouterStub.mockImplementation(() => ({
  pathname: "/",
}));

const NextLink = require("next/link");
const LinkComponentStub = jest.spyOn(NextLink, "default")
LinkComponentStub.mockImplementation(({ children }: React.PropsWithChildren<any>) => children);

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

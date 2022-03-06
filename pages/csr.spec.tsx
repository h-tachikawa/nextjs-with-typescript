import Csr from "./csr";
import { render, act } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { getCountriesQueryMock } from "./car.mock";
import { sleep } from "../lib/sleep";

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

describe("Csr Component", () => {
  it("renders without error", async () => {
    const { asFragment } = render(
      <MockedProvider
        mocks={getCountriesQueryMock}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: "no-cache" },
          query: { fetchPolicy: "no-cache" },
        }}
      >
        <Csr />
      </MockedProvider>
    );

    await act(async () => {
      await sleep(10);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

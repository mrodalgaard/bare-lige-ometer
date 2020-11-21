import { stringify } from "query-string";
import React from "react";
import { EncodedQuery, QueryParamProvider } from "use-query-params";
import { render } from "./test-utils";

// Borrowed helper methods from https://github.com/pbeshai/use-query-params

const makeMockLocation = (query: EncodedQuery): Location => {
  const queryStr = stringify(query);
  return {
    href: "",
    search: queryStr.length ? `?${queryStr}` : "",
  } as Location;
};

const makeMockHistory = (location: any = {}) => {
  return {
    replace: jest
      .fn()
      .mockImplementation((newLocation) =>
        Object.assign(location, newLocation)
      ),
    push: jest
      .fn()
      .mockImplementation((newLocation) =>
        Object.assign(location, newLocation)
      ),
    location,
  };
};

// Setup a query parameter provider with mocked location and history
export const setupQueryParamProvider = (
  children: any,
  query: EncodedQuery = {}
) => {
  const location = makeMockLocation(query);
  const history = makeMockHistory(location);

  render(
    <QueryParamProvider history={history} location={location}>
      {children}
    </QueryParamProvider>
  );

  return { location, history };
};

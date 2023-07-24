import { mockData } from "../constants/data";
import { getGistForUser } from "../services/gistService";
import gistReducer, {
  initialState,
  fetchUserGists,
  fetchPublicGists,
} from "../store/gists/gistSlice"; // Import the slice itself as well as any reducers that you want to test.

describe("tests for gistReducer", () => {
  // A test where you check if the slice initializes with the initialState. No reducer operation took place.
  test("initialize slice with initialValue", () => {
    const listSliceInit = gistReducer(initialState, { type: "unknown" });
    expect(listSliceInit).toBe(initialState);
  });

  // A test where you use the reducer to add an element to the current slice state.
  test("testGetApi", () => {
    const afterReducerOperation = gistReducer(
      initialState,
      fetchPublicGists(mockData)
    );
    // It's expected that the slice state also contains the added testData as array element.
    expect(afterReducerOperation).toStrictEqual({
      value: [initialState.value.at(0), mockData],
    });
  });

  // Test case for fetching data using a username and storing it in the reducer.
  test("testByNameApi", async () => {
    const username = "HugsLibRecordKeeper"; // Replace with a valid username for your test case
    const mockApiResponse = {
      data: [
        /* Your mock response data here */
      ],
    }; // Replace with your mock API response

    // Mock the getState function
    const getState = jest.fn(() => ({ gists: { publicGists: [] } }));

    // Mock the getGistForUser function
    const getGistForUser = jest.fn(() => Promise.resolve(mockApiResponse));

    // Dispatch the action with the username
    const dispatch = jest.fn();
    await fetchUserGists(username, { getState, extra: { getGistForUser } })(
      dispatch
    );

    // Expect that the getGistForUser function was called with the correct username
    expect(getGistForUser).toHaveBeenCalledWith(username);

    // Expect that the dispatch was called with the correct action and payload
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchUserGists.fulfilled.type,
      payload: [mockApiResponse.data[0]], // Assuming this is how you extract the data from the API response
    });
  });
});

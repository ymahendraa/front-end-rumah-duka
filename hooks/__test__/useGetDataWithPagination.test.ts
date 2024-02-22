import { renderHook, waitFor } from "@testing-library/react";
import { useGetDataWithPagination } from "../useGetDataWithPagination";

describe("useGetDataWithPagination", () => {
  it("should fetch data successfully", async () => {
    const mockData = {
      /* mock data object */
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john@mail.com",
        },
      ],
    };
    const mockPage = 1;
    const mockLimit = 10;
    const mockUrl = "https://api.example.com/data";
    const mockFilter = "category=books";
    const mockAccessToken = "your-access-token";

    // Mock the fetcher function
    const mockFetcher = jest.fn().mockResolvedValue(mockData);

    // Render the hook
    const { result } = renderHook(() =>
      useGetDataWithPagination({
        page: mockPage,
        limit: mockLimit,
        url: mockUrl,
        filter: mockFilter,
        accessToken: mockAccessToken,
        fetcher: mockFetcher, // Pass the mockFetcher to the hook
      })
    );

    // Assert initial state
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.mutate).toBeInstanceOf(Function);

    // Assert fetcher function was called with the correct arguments
    expect(mockFetcher).toHaveBeenCalledWith(
      `${mockUrl}?page=${mockPage}&limit=${mockLimit}&${mockFilter}`,
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${mockAccessToken}`,
        },
      })
    );

    // Wait for the data to be fetched
    await waitFor(() => result.current.data);

    // Assert final state
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.mutate).toBeInstanceOf(Function);
  });

  it("should handle error when fetching data", async () => {
    const mockError = new Error("Failed to fetch data");
    const mockPage = 2;
    const mockLimit = 11;
    const mockUrl = "https://api.example.com/data";
    const mockFilter = "category=books";
    const mockAccessToken = "your-access-token";

    // Mock the fetcher function
    const mockFetcher = jest.fn().mockRejectedValue(mockError);

    // Render the hook
    const { result } = renderHook(() =>
      useGetDataWithPagination({
        page: mockPage,
        limit: mockLimit,
        url: mockUrl,
        filter: mockFilter,
        accessToken: mockAccessToken,
        fetcher: mockFetcher,
      })
    );

    // Assert initial state
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.mutate).toBeInstanceOf(Function);

    // Wait for the error to occur
    await waitFor(() => result.current.error);
    // Assert final state
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.mutate).toBeInstanceOf(Function);

    // Assert fetcher function was called with the correct arguments
    expect(mockFetcher).toHaveBeenCalledWith(
      `${mockUrl}?page=${mockPage}&limit=${mockLimit}&${mockFilter}`,
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${mockAccessToken}`,
        },
      })
    );
  });
});

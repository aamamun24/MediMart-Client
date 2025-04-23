import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get customer review
    getReview: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetReviewQuery } = reviewApi;

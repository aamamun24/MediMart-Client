
import { baseApi } from "../../api/baseApi"; // Adjust path as needed

// Define the review data structure
export type TReview = {
  _id:string;
  userName: string;
  userEmail: string;
  reviewText: string;
  orderCount: number;
  starCount: number;
};

// Define input data for creating a review
interface IReviewData {
  userEmail: string;
  userName: string;
  reviewText: string;
  orderCount: number;
  starCount: number;
}

// Define response types based on backend sendResponse
interface ReviewResponse {
  success: boolean;
  message: string;
  data: TReview;
}

interface ReviewsResponse {
  success: boolean;
  message: string;
  data: TReview[];
}

interface DeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new review (POST /reviews/)
    createReview: builder.mutation<ReviewResponse, IReviewData>({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
    }),

    // Delete a review by ID (DELETE /reviews/:id)
    deleteReviewById: builder.mutation<DeleteResponse, string>({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),

    // Get all reviews (GET /reviews/)
    getAllReviews: builder.query<ReviewsResponse, void>({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateReviewMutation,
  useDeleteReviewByIdMutation,
  useGetAllReviewsQuery,
} = reviewApi;

export default reviewApi;

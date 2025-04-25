import { baseApi } from "@/redux/api/baseApi";

const featureMedicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all medicine
    getMedicine: builder.query({
      query: () => ({
        url: `/products`,
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

export const { useGetMedicineQuery } = featureMedicineApi;

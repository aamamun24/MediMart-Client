import { TMedicine } from "@/types";
import { baseApi } from "../api/baseApi";
import { TResponseRedux } from "@/types/global.type";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedicines: builder.query<TResponseRedux<TMedicine>[], void>({
      query: () => "/products",
      providesTags: ["Medicine"],
    }),
    getSingleMedicine: builder.query<TResponseRedux<TMedicine>, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Medicine"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllMedicinesQuery, useGetSingleMedicineQuery } =
  medicineApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MCQ, Exam, User } from "@/types";

// Since we need to use mock data, we can define a custom baseQuery or use queryFn to resolve mocked data.
// For now, let's just create an empty API slice that we can inject endpoints into.

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["MCQ", "Exam", "User"],
  endpoints: (builder) => ({
    // We will inject mocked endpoints here later.
    // Example:
    /*
    getMcqs: builder.query<MCQ[], void>({
      queryFn: async () => {
        // mock delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { data: [] };
      },
      providesTags: ["MCQ"],
    }),
    */
  }),
});

// We can export hooks when we define endpoints
// export const { useGetMcqsQuery } = api;

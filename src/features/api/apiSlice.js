import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsondb-albi.vercel.app",
    }),
    tagTypes: ["Todos", "Todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (props) => {
                const { status, colors } = props || {};
                let queryString = "";

                if (colors?.length) {
                    queryString += colors
                        .map((color) => `color_like=${color}`)
                        .join("&");
                }
                if (status?.length) {
                    let statusQuery = ``;
                    if (status === "incomplete") {
                        statusQuery += `&completed_like=${false}`;
                    } else if (status === "complete") {
                        statusQuery += `&completed_like=${true}`;
                    }
                    if (statusQuery?.length) {
                        queryString += `&${statusQuery}`;
                    }
                }
                let url = `/todos?` + queryString;
                return url;
            },
            keepUnusedDataFor: 10,
            providesTags: ["Todos"],
        }),
        getTodo: builder.query({
            query: (todoId) => `/todos/${todoId}`,
            providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => {
                console.log(id, data, "ddl");
                return {
                    url: `/todos/${id}`,
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: (result, error, arg) => ["Todo", "Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos", "Todo"],
        }),
    }),
});

export const {
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
    useGetTodoQuery,
    useGetTodosQuery,
} = apiSlice;

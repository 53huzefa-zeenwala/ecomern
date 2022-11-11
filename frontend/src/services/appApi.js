import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({product_id, user_id}) => ({
        url: `/products/${product_id}`,
        method: "DELETE",
        body: {
          user_id
        },
      }),
    }),
    // adiing in cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        method: "DELETE",
        body: cartInfo,
      }),
    }),
    // rmove cart product
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        method: "DELETE",
        body,
      }),
    }),
    // increase cart product
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/increase-cart",
        method: "POST",
        body,
      }),
    }),
    // decrease cart product
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/decrease-cart",
        method: "POST",
        body,
      }),
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {useSignupMutation, useLoginMutation, useCreateProductMutation, useAddToCartMutation, useIncreaseCartProductMutation, useRemoveFromCartMutation, useDecreaseCartProductMutation, useCreateOrderMutation, useDeleteProductMutation, useUpdateProductMutation } = appApi

export default appApi
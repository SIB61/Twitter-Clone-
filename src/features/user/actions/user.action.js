import { useAsyncReducer } from "@/shared/hooks/useAsyncReducer";
import { follow, unfollow } from "../services/client/follow.client";
import { signIn } from "next-auth/react";

export const userActions = {
  UPDATE: "UPDATE",
  TOGGLE_FOLLOW: "TOGGLE_FOLLOW",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

function userReducer(state, action) {
  switch (action.type) {
    case userActions.UPDATE:
      return action.payload;
    case userActions.TOGGLE_FOLLOW:
      return action.payload
        ? {
            ...state,
            totalFollowers: state.isFollowing
              ? state.totalFollowers - 1
              : state.totalFollowers + 1,
            isFollowing: !state.isFollowing,
          }
        : state;

    default:
      return state;
  }
}

async function userReducerMiddleware(state, action, dispatch) {
  switch (action.type) {
    case userActions.TOGGLE_FOLLOW:
      const success = state.isFollowing
        ? await unfollow(state.id)
        : await follow(state.id);
      return success;

    case userActions.UPDATE:
      try {
        const formData = new FormData();
        formData.append("name", action.payload.name);
        formData.append("dateOfBirth", action.payload.dateOfBirth);
        formData.append("email", action.payload.email);
        if (action.payload.profile) {
          formData.append("image", action.payload.profile);
        }
        if (action.payload.cover)
          formData.append("cover", action.payload.cover);
        const newUserRes = await fetch("/api/user/" + state.id, {
          method: "PATCH",
          body: formData,
        });
        const newUser = await newUserRes.json();
        await signIn("credentials");
        return newUser;
      } catch (err) {
        return state;
      }
    default:
      return action.payload;
  }
}

export function useUserReducer(initialState) {
  return useAsyncReducer(userReducer, initialState, userReducerMiddleware);
}

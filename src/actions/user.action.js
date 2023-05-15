import { signIn } from "next-auth/react";
import axios from "axios";
export const UserActions = {

  REGISTER: async ( user,_,dispatch) => {
    try {
      dispatch(UserActions.LOADING)
      await axios.post("/api/user", user);
      return { success: {message:"email verification link sent."} };
    } catch (err) {
      console.log(err)
      return { error: {message:"something went wrong."} };
    }
  },


  LOADING:()=>{
     return {loading:true} 
  },


  TOGGLE_FOLLOW: async (_,state) => {
    await axios.post(`/api/follow/${state.id}`) 
    return {...state,isFollowing:!state.isFollowing}
  },

  UPDATE: async (payload, state) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("dateOfBirth", payload.dateOfBirth);
      formData.append("email", payload.email);
      if (payload.profile) {
        formData.append("image", payload.profile);
      }
      if (payload.cover) formData.append("cover", payload.cover);
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
  },
};

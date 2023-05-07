

export const AuthActions = {

  REGISTER: async (state, payload, dispatch) => {
    try {
      dispatch(UserActions.LOADING)
      const user = await axios.post("/api/user", payload);
      return { success: {message:"email verification link sent."} };
    } catch (err) {
      return { error: {message:"something went wrong."} };
    }
  },


  LOGIN: async(state,payload,dispatch)=>{

  }

}

import { userActions } from "../reducers/userReducer";

const logout = () => (dispatch) => {
  dispatch(userActions.userLogout());
  localStorage.removeItem("userInfo");
};
export { logout };

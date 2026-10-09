import { createContext, useContext } from "react";


export const AuthContext = createContext({

  user: null,

  loading: true,

  guest: false,

  continueAsGuest: () => {},

  logout: () => {}

});


export function useAuth() {

  return useContext(AuthContext);

}

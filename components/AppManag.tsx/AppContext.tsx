import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { config, GetAllUsers } from "../Api";
import { allUsers, OwnadminProp } from "./definition";

interface State {
  isLoggedIn: boolean;
  adminInfo: OwnadminProp;
  allUsers: allUsers[];
}

const initialState: State = {
  isLoggedIn: false,
  adminInfo: {
    id: undefined,
    name: "",
    family: "",
    username: "",
    email: "",
    address: "",
    token: "",
    phoneNumber: 0,
    createdAt: "",
    bio: "",
    job: "",
  },
  allUsers: [],
};

type AppContextInterface = State & {
  login: (prop: OwnadminProp) => void;
  logout: () => void;
  dispatch: React.Dispatch<Action>;
};

const initialValue: AppContextInterface = {
  ...initialState,
  login: () => {},
  logout: () => {},
  dispatch: () => {},
};

export const AppContext: React.Context<AppContextInterface> =
  createContext(initialValue);

export const AppManagerContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //usereducer
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  console.log(state);

  //login
  const login = useCallback((adminProp: OwnadminProp): void => {
    console.log(adminProp);
    const token: string = adminProp.token;
    const email: string = adminProp.email;
    localStorage.setItem("admintoken", token);
    localStorage.setItem("adminemail", email);
    console.log("email", email);

    dispatch({ type: "LOGGED IN", payload: { ...adminProp } });
  }, []);

  //logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.clear();

    dispatch({ type: "LOGGED OUT" });
  }, []);

  // reload request
  const handleReload = useCallback(() => {
    const token: string | null = localStorage.getItem("admintoken");

    if (!token || token == undefined) {
      return;
    }
    try {
      axios
        .post(
          `${config.apiUrl}/api/data/allInfo`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          if ((result?.status as number) == 200) {
            //admin info
            const adInfo: any = result?.data?.adInfo;

            dispatch({ type: "LOGGED IN", payload: adInfo });

            //list of users
            const users: allUsers[] = result?.data?.alluser;

            dispatch({ type: "LIST OF USERS", payload: users });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(state);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  return (
    <AppContext.Provider value={{ login, logout, dispatch, ...state }}>
      {children}
    </AppContext.Provider>
  );
};

type Action =
  | { type: "LOGGED IN"; payload: OwnadminProp }
  | { type: "LOGGED OUT" }
  | { type: "LIST OF USERS"; payload: allUsers[] }
  | { type: "USER INFO EDIT"; payload: allUsers }
  | { type: "DELETE USER"; payload: any };

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case "LOGGED IN":
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.payload,
      };
      break;

    case "LOGGED OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "LIST OF USERS":
      return {
        ...state,
        isLoggedIn: true,
        allUsers: action.payload,
      };
      break;

    case "USER INFO EDIT":
      const index: any = state.allUsers.findIndex(
        (user) => user.id === action.payload.id
      );

      return {
        ...state,
        isLoggedIn: true,
        allUsers: [...state.allUsers, (state.allUsers[index] = action.payload)],
      };
      break;

    case "DELETE USER":
      return {
        ...state,
        isLoggedIn: true,
        allUsers: state.allUsers.filter((user) => user.id !== action.payload),
      };
      break;

    default:
      return {
        ...state,
      };
      break;
  }
};

export const useAppContext = () => {
  return useContext(AppContext);
};

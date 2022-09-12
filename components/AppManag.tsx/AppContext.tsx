import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { config } from "../Api";
import {
  adminsPosts,
  allUsers,
  listofCategories,
  OwnadminProp,
} from "./definition";

interface State {
  isLoggedIn: boolean;
  adminInfo: OwnadminProp;
  allUsers: allUsers[];
  adminsPost: adminsPosts[];
  listofCate: listofCategories[];
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
    image: "",
  },
  allUsers: [],
  adminsPost: [],
  listofCate: [],
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
    if (typeof window == "object") {
      if (window.localStorage.getItem("$adnTK") === null) {
        const token: string = adminProp.token;

        window.localStorage.setItem("$adnTK", token);

        dispatch({ type: "LOGGED IN", payload: { ...adminProp } });
      }
    }
  }, []);

  //logout
  const logout = useCallback(() => {
    let result: boolean = false;
    if (typeof window == "object") {
      if (window.localStorage.getItem("$adnTK") === null) {
        result = true;
      } else {
        window.localStorage.removeItem("$adnTK");

        result = true;

        dispatch({ type: "LOGGED OUT" });
      }
    }
    return result;
  }, []);

  // reload request
  const handleReload = useCallback((): void => {
    const token: string | null = localStorage.getItem("$adnTK");

    console.log("token", token);

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

            const posts: adminsPosts[] = result?.data?.adInfo?.post;
            console.log("post", posts);

            // dispatch({ type: "ADMIN POST", payload: posts });
            dispatch({ type: "INITIAL DATA", payload: posts });
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
  | { type: "DELETE USER"; payload: any }
  | { type: "ADMIN POST"; payload: adminsPosts[] }
  | { type: "INITIAL DATA"; payload: adminsPosts[] }
  | { type: "LIST OF CATEGORIES"; payload: listofCategories[] };

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

      // case "ADMIN POST":
      //   const post = [...state.adminsPost, { ...action.payload }];
      //   console.log("posts", post);
      //   return {
      //     ...state,
      //     isLoggedIn: true,
      //     adminsPost: post,
      //   };
      break;
    case "INITIAL DATA":
      return {
        ...state,
        isLoggedIn: true,
        adminsPost: action.payload,
      };

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

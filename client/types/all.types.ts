import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";

// REGISTER USER
export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  profilePictureUrl: string;
  location: string;
  phoneNumber: string;
  role: string;
};

// FETCH LOCATION
export type LocationFetchResponse = {
  id: string;
  name: string;
};

// REGISTER DETAIL
export type RegisterDetail = {
  babyName: string;
  babyDOB: string;
  babyGender: string;
  bloodType: string;
  bloodRhesus: string;
  halal: boolean;
  egg: boolean;
  dairy: boolean;
  nuts: boolean;
  soy: boolean;
  seafood: boolean;
  flourOrWheat: boolean;
  readMeat: boolean;
  spicyFood: boolean;
  caffeine: boolean;
};

// CREATE NEW MILK POST
export type MilkForm = {
  totalBag: string;
  totalMl: string;
  pumpDate: string;
};

// ROOT NAVIGATION
export type RootNavigationParamList = {
  Home: undefined;
  Create: undefined;
  Chats: undefined;
};

// HOME NAVIGATION STACK
export type HomeNavigationParamList = {
  HomeScreen: undefined;
  Chat: { roomId: string };
};

// HOME PROPS
export type HomeProps = NativeStackScreenProps<
  HomeNavigationParamList,
  "HomeScreen",
  "Chat"
>;

// CHAT NAVIGATION STACK
export type ChatNavigationParamList = {
  ChatList: undefined;
  Chat: { roomId: string };
};

// CHAT PROPS
export type ChatProps = NativeStackScreenProps<
  ChatNavigationParamList,
  "ChatList",
  "Chat"
>;

//LOGIN CONTEXT
export type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

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
export type UserDetailType = {
  _id?: string;
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
  redMeat: boolean;
  spicyFood: boolean;
  caffeine: boolean;
  __v?: number;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
  role: string;
  isRegistered: boolean;
};

// MILK TYPE
export type MilkResponseType = {
  _id: string;
  UserId: string;
  totalBags: number;
  totalMl: number;
  pumpDate: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  userdetail: UserDetailType;
  user: UserType;
  score: number;
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

// CHAT NAVIGATION STACK
export type ChatNavigationParamList = {
  ChatList: undefined;
  Chat: { roomId: string };
};

// REGISTER OR LOGIN STACK
export type UnauthenticateParamList = {
  login: undefined;
  registerId: undefined;
  register: { locationId: string | undefined | null };
  detailRegister: undefined;
};

//LOGIN CONTEXT
export type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

// LOGIN FORM
export type LoginInput = {
  email: string;
  password: string;
};

//LOGIN RESPONSE
export type LoginResponse = {
  access_token: string;
  email: string;
  isRegistered: boolean;
  location: string;
  name: string;
  role: string;
  userId: string;
};

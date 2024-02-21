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
  totalBags: string;
  totalMl: string;
  pumpDate: string;
};

// ROOT NAVIGATION
export type RootNavigationParamList = {
  Home: undefined;
  Create: undefined;
  Chats: undefined;
  Profile: undefined;
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

// CHAT TYPE
export type ChatDataType = {
  [userId: string]: {
    date: {
      nanoseconds: number;
      seconds: number;
    };
    userInfo: {
      userId: string;
      userName: string;
    };
    lastMessage?: {
      text: string;
    };
  };
};

// MESSAGE TYPE
export type MessagesDataType = {
  text: string;
  id: string;
  senderId: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
}[];

// POST CARD PROPS TYPE
export type PostCardPropsType = {
  milkData: MilkResponseType;
  loggedUserId: string;
  loggedUserName: string;
  token: string;
  fetchHomeData: () => Promise<void>;
};

// RESPONSE FETCH DETAIL
export type UserDetailResponseType = {
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
  user: UserType;
};

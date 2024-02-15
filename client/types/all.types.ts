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

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  profilePictureUrl: string;
  location: string;
  phoneNumber: string;
  role: string;
};

export type LocationFetchResponse = {
  id: string;
  name: string;
};

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

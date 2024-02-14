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

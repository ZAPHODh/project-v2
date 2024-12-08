export type Account = {
  name: string;
  email: string;
  _id: string;
};

export type EditAccount = {
  key: keyof Account;
  id: string;
  value: string;
};

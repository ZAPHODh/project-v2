import { Expense, Professional, Salon, Service, User } from "@prisma/client";


type salonData = Salon & {
  professionals?: Professional[];
  services?: Service[];
  expenses?: Expense[];
};

type userData = User & {
  salons: salonData[];
};
type ExpenseData = Expense & {
  salon: Salon;
};

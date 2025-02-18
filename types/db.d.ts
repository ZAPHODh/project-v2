import {
  Appointment,
  Customer,
  Expense,
  ExpenseCategory,
  Product,
  Professional,
  Sale,
  SaleItem,
  Salon,
  Service,
  User,
} from "@prisma/client";

type salonData = Salon & {
  professionals?: Professional[];
  services?: Service[];
  expenses?: Expense[];
  sales: Sale[];
  customers: CustomerData[];
};

type AppointmentData = Appointment & {
  service: Service;
  customer: Customer;
  professional: Professional;
};
type userData = User & {
  salons: salonData[];
};
type ExpenseData = Expense & {
  salon: Salon;
  category: ExpenseCategory;
};
type ProfessionalData = Professional & {
  sales: Sale[];
};

type SalesData = Sale & {
  items: SaleItemData[];
};

type SaleItemData = SaleItem & {
  service: Service;
  product: Product;
};
type Status = "pending" | "confirmed" | "canceled" | "completed";
type CustomerData = Customer & {
  appointments: AppointmentData[];
  services: Service[];
  sales: SalesData[];
};

type TopServicesProps = {
  sales: any[];
};

export function TopServices({ sales = [] }: TopServicesProps) {
  return (
    <div className="w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded">
      {sales.map((sale) => (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          {sale.items.quantity}
        </span>
      ))}
    </div>
  );
}

export function BillingHistory() {
  const invoices = [
    { date: "2026-06-01", amount: 0, status: "Paid" },
    { date: "2026-05-01", amount: 0, status: "Paid" },
    { date: "2026-04-01", amount: 0, status: "Paid" },
    { date: "2026-03-01", amount: 0, status: "Paid" },
    { date: "2026-02-01", amount: 0, status: "Paid" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Billing History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Date</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Amount</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 text-gray-900 dark:text-gray-200">{invoice.date}</td>
                <td className="py-2 text-gray-900 dark:text-gray-200">${invoice.amount}</td>
                <td className="py-2 text-green-600 font-semibold">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

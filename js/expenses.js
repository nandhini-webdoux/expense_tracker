
export function filterExpenses(expenses, month, category) {
  return expenses.filter((expense) => {
    const matchesMonth =
      !month || expense.date.startsWith(month);

    const matchesCategory =
      !category || expense.category === category;

    return matchesMonth && matchesCategory;
  });
}

export function calculateTotal(expenses) {
  return expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}

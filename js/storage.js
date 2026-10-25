
const EXPENSES_KEY = "expenseTrackerExpenses";
const BUDGET_KEY = "expenseTrackerBudget";

export function loadExpenses() {
  try {
    const savedData = localStorage.getItem(EXPENSES_KEY);
    const parsedData = savedData ? JSON.parse(savedData) : [];

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Could not load expenses:", error);
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

export function loadBudget() {
  const savedBudget = Number(localStorage.getItem(BUDGET_KEY));
  return Number.isFinite(savedBudget) && savedBudget >= 0
    ? savedBudget
    : 0;
}

export function saveBudget(budget) {
  localStorage.setItem(BUDGET_KEY, String(budget));
}

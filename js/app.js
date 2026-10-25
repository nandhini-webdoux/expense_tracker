
import {
  loadExpenses,
  saveExpenses,
  loadBudget,
  saveBudget
} from "./storage.js";

import {
  filterExpenses,
  calculateTotal,
  formatCurrency
} from "./expenses.js";

const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const budgetInput = document.getElementById("budget");
const saveBudgetButton = document.getElementById("saveBudget");

const monthFilter = document.getElementById("monthFilter");
const categoryFilter = document.getElementById("categoryFilter");
const clearFiltersButton = document.getElementById("clearFilters");

const expenseList = document.getElementById("expenseList");
const totalExpensesElement = document.getElementById("totalExpenses");
const totalBudgetElement = document.getElementById("totalBudget");
const balanceElement = document.getElementById("balance");

const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEdit");

let expenses = loadExpenses();
let budget = loadBudget();
let editingId = null;

const today = new Date();
const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

const currentMonth = todayString.slice(0, 7);

dateInput.value = todayString;
monthFilter.value = currentMonth;
budgetInput.value = budget || "";

function showMessage(text) {
  message.textContent = text;
}

function updateSummary() {
  const selectedExpenses = filterExpenses(
    expenses,
    monthFilter.value,
    categoryFilter.value
  );

  const total = calculateTotal(selectedExpenses);

  totalExpensesElement.textContent = formatCurrency(total);
  totalBudgetElement.textContent = formatCurrency(budget);
  balanceElement.textContent = formatCurrency(budget - total);

  balanceElement.style.color =
    budget - total < 0 ? "#b13c36" : "#245b4a";
}

function createTextElement(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;

  if (className) {
    element.className = className;
  }

  return element;
}

function renderExpenses() {
  const filteredExpenses = filterExpenses(
    expenses,
    monthFilter.value,
    categoryFilter.value
  ).sort((a, b) => b.date.localeCompare(a.date));

  expenseList.replaceChildren();

  emptyMessage.hidden = filteredExpenses.length > 0;

  filteredExpenses.forEach((expense) => {
    const card = document.createElement("article");
    card.className = "expense-item";

    const details = document.createElement("div");
    details.append(
      createTextElement("h3", expense.title),
      createTextElement(
        "p",
        `${expense.category} • ${expense.date}`
      ),
      createTextElement(
        "p",
        formatCurrency(Number(expense.amount)),
        "expense-amount"
      )
    );

    const actions = document.createElement("div");
    actions.className = "expense-actions";

    const editButton = createTextElement("button", "Edit");
    editButton.type = "button";
    editButton.addEventListener("click", () => editExpense(expense.id));

    const deleteButton = createTextElement("button", "Delete");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteExpense(expense.id));

    actions.append(editButton, deleteButton);
    card.append(details, actions);
    expenseList.appendChild(card);
  });

  updateSummary();
}

function resetForm() {
  expenseForm.reset();
  dateInput.value = todayString;
  editingId = null;

  formTitle.textContent = "Add Expense";
  submitButton.textContent = "Add Expense";
  cancelEditButton.hidden = true;
}

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!title || !category || !date || !Number.isFinite(amount) || amount <= 0) {
    showMessage("Please enter valid expense details.");
    return;
  }

  const expenseData = {
    title,
    amount,
    category,
    date
  };

  if (editingId !== null) {
    expenses = expenses.map((expense) =>
      expense.id === editingId
        ? { ...expense, ...expenseData }
        : expense
    );

    showMessage("Expense updated successfully.");
  } else {
    expenses.push({
      id: crypto.randomUUID(),
      ...expenseData
    });

    showMessage("Expense added successfully.");
  }

  try {
    saveExpenses(expenses);
  } catch (error) {
    console.error("Could not save expenses:", error);
    showMessage("Could not save data. Check browser storage settings.");
    expenses = loadExpenses();
    renderExpenses();
    return;
  }

  resetForm();
  renderExpenses();
});

function editExpense(id) {
  const expense = expenses.find((item) => item.id === id);

  if (!expense) return;

  editingId = id;
  titleInput.value = expense.title;
  amountInput.value = expense.amount;
  categoryInput.value = expense.category;
  dateInput.value = expense.date;

  formTitle.textContent = "Edit Expense";
  submitButton.textContent = "Update Expense";
  cancelEditButton.hidden = false;

  showMessage("Edit the details and select Update Expense.");
  expenseForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteExpense(id) {
  const confirmed = confirm("Are you sure you want to delete this expense?");
  if (!confirmed) return;

  const previousExpenses = expenses;
  expenses = expenses.filter((expense) => expense.id !== id);

  try {
    saveExpenses(expenses);
    showMessage("Expense deleted successfully.");
    renderExpenses();

    if (editingId === id) {
      resetForm();
    }
  } catch (error) {
    console.error("Could not delete expense:", error);
    expenses = previousExpenses;
    showMessage("Could not save the deletion.");
    renderExpenses();
  }
}

cancelEditButton.addEventListener("click", resetForm);

saveBudgetButton.addEventListener("click", () => {
  const newBudget = Number(budgetInput.value);

  if (!Number.isFinite(newBudget) || newBudget < 0 || budgetInput.value.trim() === "") {
    showMessage("Please enter a valid budget of zero or more.");
    return;
  }

  try {
    saveBudget(newBudget);
    budget = newBudget;
    updateSummary();
    showMessage("Budget saved successfully.");
  } catch (error) {
    console.error("Could not save budget:", error);
    showMessage("Could not save the budget. Check browser storage settings.");
  }
});

monthFilter.addEventListener("change", renderExpenses);
categoryFilter.addEventListener("change", renderExpenses);

clearFiltersButton.addEventListener("click", () => {
  monthFilter.value = "";
  categoryFilter.value = "";
  renderExpenses();
});

renderExpenses();

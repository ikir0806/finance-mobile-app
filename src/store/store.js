import { makeAutoObservable } from 'mobx';

class ExpensesStore {
  expenses = 0;
  expensesArray = [];
  currentMonth = null;
  currentYear = null;
  categories = [];

  constructor() {
    makeAutoObservable(this);
  }

  setExpenses(value) {
    this.expenses = value;
  }

  addExpenses(value) {
    this.expenses += +value;
  }

  subExpenses(value) {
    this.expenses -= +value;
  }

  setExpensesArray(array) {
    this.expensesArray = array;
  }

  setCurrentMonth(value) {
    this.currentMonth = value;
  }

  setCurrentYear(value) {
    this.currentYear = value;
  }

  setCategories(array) {
    this.categories = array;
  }
}

const expensesStore = new ExpensesStore();
export default expensesStore;

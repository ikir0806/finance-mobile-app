import { makeAutoObservable } from 'mobx';

class ExpensesStore {
  expenses = 0;
  expensesArray = [];

  constructor() {
    makeAutoObservable(this);
  }

  setExpensesArray(array) {
    this.expensesArray = array;
  }

  setExpenses(value) {
    this.expenses = value;
  }

  addExpenses(value) {
    this.expenses += +value;
  }

  subExpenses(value) {
    this.expenses -= -value;
  }
}

const expensesStore = new ExpensesStore();
export default expensesStore;

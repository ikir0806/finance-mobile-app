import { makeAutoObservable } from 'mobx';

class ExpensesStore {
  expenses = 0;

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
    this.expenses -= -value;
  }
}

export default ExpensesStore;

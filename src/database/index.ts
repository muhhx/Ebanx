class AccountDatabase<K, V> extends Map<K, V> {
  constructor() {
    super();
  }

  getBalance(id: K) {
    const data = super.get(id);

    return data === undefined ? null : data;
  }

  updateBalance(id: K, amount: V) {
    const updatedDatabase = super.set(id, amount);
    const updatedValue = Object.fromEntries(updatedDatabase)[id];
    return { id: id, value: updatedValue };
  }

  updateOrCreateBalance(id: K, amount: V) {
    const updatedDatabase = super.set(id, amount);
    const updatedValue = Object.fromEntries(updatedDatabase)[id];
    return { id: id, value: updatedValue };
  }

  reset() {
    return super.clear();
  }
}

const databaseClient = {
  account: new AccountDatabase<string, number>(),
  // other "tables"...
};

export { databaseClient as db };

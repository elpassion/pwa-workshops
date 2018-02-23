import idb from 'idb';

const VERSION = 1;
const STORE = 'WINES';

const dbPromise = idb.open('VIVINO', VERSION, upgradeDb => {
  upgradeDb.createObjectStore(STORE, { keyPath: 'id' });
});


const db = {
  getAll() {
    return dbPromise.then(db => {
      return db.transaction(STORE)
        .objectStore(STORE).getAll();
    });
  },
  setAll(items) {
    return dbPromise.then(db => {
      const tx = db.transaction(STORE, 'readwrite');

      items.forEach((item) => {
        tx.objectStore(STORE).put(item);
      });

      return tx.complete;
    });
  },
};

export default db;

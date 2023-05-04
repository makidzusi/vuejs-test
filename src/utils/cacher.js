const DB_NAME = 'test-db';
const STORAGE_NAME = 'payments';
const DB_VERSION = 1;
let DB;

// можно все сделать синглтон классом, продумать единый интерфейс для реализаций под InMemoyCache и LocalStorage
// фолбэки, чтобы можно было в зависимости от задачи использовать разные реализации + побольше обработки ошибок :)
export default {
  async getDbAsync() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = (e) => {
        reject(new Error('Error opening db'));
      };
      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore(STORAGE_NAME, { keyPath: 'id' });
      };
      return true;
    });
  },

  async savePaymentsAsync(_data) {
    const db = await this.getDbAsync();
    return new Promise((resolve) => {
      const trans = db.transaction([STORAGE_NAME], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      const store = trans.objectStore(STORAGE_NAME);
      _data.forEach((el) => {
        store.add(el);
      });
    });
  },

  async getPaymentsListAsync() {
    const db = await this.getDbAsync();
    return new Promise((resolve) => {
      const trans = db.transaction([STORAGE_NAME], 'readonly');
      const payments = [];
      trans.oncomplete = () => {
        resolve(payments);
      };
      const store = trans.objectStore(STORAGE_NAME);
      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          payments.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async clearCacheAsync() {
    const db = await this.getDbAsync();
    // eslint-disable-next-line no-restricted-syntax
    for (const name of Object.values(db.objectStoreNames)) {
      const trans = db.transaction(name, 'readwrite');
      const store = trans.objectStore(name);
      store.clear();
    }
  },
};

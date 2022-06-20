export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return newPromise((resolve, reject) => {
    // open connection to the database 'shop-shop' with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create variables to hold reference to the database, transation (tx), and object sotre
    let db, tx, store;

    // if version has changed (or if this is the first time using thedatabase) run this method
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object sotre for each type fo data and set primary key index to be the '_id'
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // handle any errors with connection
    request.onerror = function (e) {
      console.log("There was and error");
    };

    // on database opoen success
    request.onsuccess = function (e) {
      // save a refernce of the database to the 'db' variable
      db = request.result;
      // open a tansaction do whatever we pass into 'storeName' (must match one fo the object sotre names)
      tx = db.transaction(storeName, "readwrite");
      // save a reference to that object sotre
      store = tx.objectStore(storeName);

      // if any errosrs, let us know
      db.onerror = function (e) {
        console.log("error", e);
      };
    };

    switch(method) {
      case 'put':
        store.put(object);
        resolve(object);
        break;
      case 'get': 
      const all = store.getAll();
      all.onsuccess = function () {
        resolve(all.result)
      }
      case 'delete':
        store.delete(object._id)
        break;
      default:
        console.log('NO valid method')
        break;
    }

    // when the transaction is complete, close the connection
    tx.oncomplete = function () {
      db.close();
    };
  });
}

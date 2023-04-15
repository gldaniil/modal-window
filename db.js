const addClient = (clientName, clientPhone, now, ip) => {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('./db.sqlite');

  db.serialize(() => {
    
    db.run('CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY, name TEXT NOT NULL, number TEXT NOT NULL, time TEXT, ip TEXT)');
    db.run(
      "INSERT INTO clients (name, number, time, ip) VALUES (?, ?, ?, ?)",
      clientName,
      clientPhone,
      now,
      ip,
      () => {
        db.close();
      }
    );
  });
}
module.exports = {
  addClient
}
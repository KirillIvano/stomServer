const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'lollypop1X',
    port: 5432,
    database: 'temp',
});

(async () => {
    await client.connect();

    console.log((await client.query('SELECT * FROM doctor;')).rows);
})();


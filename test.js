var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://postgres:password@localhost:5432/mydb'
});

//var knex = require('knex')({
//    client: 'mysql',
//    connection: {
//        host     : '127.0.0.1',
//        user     : 'root',
//        password : 'password',
//        database : 'myapp_test'
//    }
//});

knex('test').select().then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});

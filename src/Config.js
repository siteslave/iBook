app.factory('Config', function () {

    var config = jf.readFileSync(Config.configFile);

    return {
        getConfig: function () {
            var knex = require('knex')({
                client: 'mysql',
                connection: config
            });

            return knex;
        }
    };

});
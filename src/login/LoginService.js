app.factory('LoginService', function ($q, Config) {

    var md5 = require('MD5');
    var knex = Config.getConfig();

    return {
        login: function (username, password) {
            var q = $q.defer();

            knex('users')
                .where('username', username)
                .where('password', md5(password))
                .limit(1)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0]);
                });

            return q.promise;
        }
    };

});
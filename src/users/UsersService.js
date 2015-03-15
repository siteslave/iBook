app.factory('UsersService', function ($q, Config) {

    var md5 = require('MD5');
    var knex = Config.getConfig();

    return {

        getUsers: function () {
            var q = $q.defer();
            knex('users')
                .select('id', 'username', 'fullname', 'is_active')
                .orderBy('fullname', 'DESC')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        save: function (username, fullname, password, isActive) {
            var q = $q.defer();
            knex('users')
                .insert({
                    username: username,
                    password: md5(password),
                    fullname: fullname,
                    is_active: isActive ? 'Y' : 'N'
                })
                .returning('id')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0]);
                });

            return q.promise;
        },

        doRemove: function (id) {
            var q = $q.defer();
            knex('users')
                .where('id', id)
                .delete()
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        doUpdate: function (fullname, isActive, id) {
            var q = $q.defer();
            knex('users')
                .where('id', id)
                .update({
                    fullname: fullname,
                    is_active: isActive ? 'Y' : 'N'
                })
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        }

    };

});
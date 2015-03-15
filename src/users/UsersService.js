app.factory('UsersService', function ($q) {

    return {

        getUsers: function () {
            var q = $q.defer();

            // SELECT username, fullname, is_active FROM users ORDER BY fullname DESC
            // knex.raw('SELECT username, fullname, is_active FROM users ORDER BY fullname DESC')

            knex('users')
                .select('username', 'fullname', 'is_active')
                .orderBy('fullname', 'DESC')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        }

    };

});
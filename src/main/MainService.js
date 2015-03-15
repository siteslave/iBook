
app.factory('MainService', function ($q, $http, Config) {
    var knex = Config.getConfig();

    return {
        getUser: function () {
            var q = $q.defer();

            var options = {
                url: 'http://uifaces.com/api/v1/random',
                method: 'GET'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });


            return q.promise;
        },

        getTotal: function () {
            var q = $q.defer();

            knex('users')
                .select('is_active', knex.raw('count(*) as total'))
                .groupBy('is_active')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        }
    };

});
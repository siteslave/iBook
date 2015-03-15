// Reports controller
app.factory('UploadsService', function ($q) {
    return {
        saveFile: function (data) {
            var q = $q.defer();

            knex('files')
                .insert({
                    file_name: data.fileName,
                    file_size: data.fileSize,
                    file_data: data.fileData,
                    file_type: data.fileType
                })
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        getFile: function () {
            var q = $q.defer();

            knex('files')
                .select()
                //.where('file_name', fileName)
                .limit(1)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0]);
                });

            return q.promise;
        },

        encodeFile: function (file) {
            var q = $q.defer();

            var data = fs.readFile(file, function (err, data) {
                if (err) q.reject();
                else {
                    var stringBase64 = new Buffer(data).toString('base64');
                    //var stringBase64 = base64.encode()
                    q.resolve(stringBase64);
                }
            });

            return q.promise;
        },

        createFile: function (file, base64String) {
            var q = $q.defer();

            var data = new Buffer(base64String, 'base64');
            fs.writeFile(file, data, function (err) {
                if (err) q.reject(err);
                else q.resolve();
            });

            return q.promise;
        }
    };
});
// Main controller
app.controller('MainController', function ($scope, MainService, LxProgressService) {

    $scope.getUser = function () {
        LxProgressService.linear.show('#5fa2db', '#progress');
        MainService.getUser()
            .then(function (data) {
                $scope.username = data.username;
                //$scope.img = data.image_urls.bigger;
                $scope.img = data.image_urls.epic;
                LxProgressService.linear.hide();
            }, function (err) {
                console.log(err);
            });
    };

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'column'
            },
            tooltip: {
                style: {
                    padding: 10
                },
                pointFormat: 'คน: <b>{point.y}</b> คน'
            }
        },
        series: [{
            name: 'ผู้ใช้งาน',
            data: []
        }],
        title: {
            text: 'จำนวนผู้ใช้งาน'
        },
        subtitle: {
            text: 'Source: โปรแกรม iBook'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            categories: [],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'คน'
            },
            min: 0
        },
        useHighStocks: false
    };

    MainService.getTotal()
        .then(function (rows) {
            _.forEach(rows, function (v) {
                var status = v.is_active == 'Y' ? 'online' : v.is_active == 'N' ? 'offline' : 'no';
                $scope.chartConfig.series[0].data.push(v.total);
                $scope.chartConfig.xAxis.categories.push(status);
            });

        }, function (err) {
            console.log(err);
        });
});
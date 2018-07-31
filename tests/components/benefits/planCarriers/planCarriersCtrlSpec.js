/*Created by Jayakrishna on 3/9/2016.*/

describe('Plan Carriers Controller Testing ', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {
            "data": {
                "generalInfo": {
                    "generalMeta": [{
                        "title": "MetLife Benefits",
                        "text": "Bolster your benefits with voluntary benefits options: Annuities, Auto, Critical Illness, Home, Pet Insurance, Variable Life, and much more.",
                        "id": "1",
                        "url": null
                    }]
                },
                "docMeta": [{
                    "title": "BenefitsOverview",
                    "text": "Look at your company's contributions for each plan in your company's benefits package.",
                    "id": "1",
                    "url": null
                }, {
                    "title": "Benefits Guide Book",
                    "text": "Information you need to explore all of your benefits options.",
                    "id": "2",
                    "url": null
                }]
            }, "_statusCode": "200", "_statusText": "OK"
        },
    response1 = {
        "errorCode": null,
        "resource": {
            "medicalPlans": [
                {
                    "description": "Aetna CPOS 20 PA",
                    "employee": "$416.16",
                    "spouse": "$915.96",
                    "children": "$832.32",
                    "family": "$1,248.48"
                }
            ]
        },
        "statusCode": "200",
        "statusMessage": "Success"
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('planCarriersCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });

        var url = "/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/links";
        $httpBackend.whenGET(url).respond(200, response);
        $httpBackend.whenGET("assets/data/benefits/policiesData.json").respond(200, response1);
        $httpBackend.flush();

    });

    describe('selectTab function testing ', function () {
        it('selectTab should be defined ', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call ', function () {
            $scope.benefitsSelectedData = function (param) {
                return param;
            };
            $scope.selectTab(2);
        });

        it('selectTab function call ', function () {
            $scope.benefitsSelectedData = function (param) {
                return param;
            };
            $scope.selectTab(0);
        });
    });

    describe('isSelected function testing ', function () {
        it('isSelected should be defined ', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('isSelected function call ', function () {
            $scope.isSelected(0);
        });
    });

    describe('closePanel function testing ', function () {
        it('closePanel should be defined ', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call ', function () {
            $scope.closePanel();
        });
    });

    describe('genaralTab function testing', function () {
        it('genaralTab is defined', function () {
            expect($scope.genaralTab).toBeDefined();
        });

        it('genaralTab function call with setValue as 1', function () {
            var setValue = 1;
            $scope.genaralTab(setValue);
        });

        it('genaralTab function call with setValue as 2', function () {
            var setValue = 2;
            $scope.genaralTab(setValue);
        });
    });

    describe('isSelectedGeneral function testing', function () {
        it('isSelectedGeneral is defined', function () {
            expect($scope.isSelectedGeneral).toBeDefined();
        });

        it('isSelectedGeneral function', function () {
            var checkTab = 1;
            $scope.isSelectedGeneral(checkTab);
        });
    });

    describe('getPdfLink function testing', function () {
        it('getPdfLink is defined', function () {
            expect($scope.getPdfLink).toBeDefined();
        });

        it('getPdfLink function call', function () {
            $scope.getPdfLink();
        });
    });
});

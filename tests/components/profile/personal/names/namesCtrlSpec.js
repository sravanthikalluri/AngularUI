/*
/!**
 * Created by ganesh on 10/30/2015.
 *!/
(function () {

    "use strict";

    describe('Names Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            nameDataResponse = {
                "data": {
                    "priNamesActiveList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 4,
                            "name": "Albert",
                            "effectiveDate": "2015-10-07",
                            "effDate": "2015-10-07",
                            "endDate": "2015-10-22",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "suffix": "II",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "priNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 3,
                            "name": "Albert",
                            "effectiveDate": "2015-09-16",
                            "effDate": "2015-10-07",
                            "endDate": "2015-10-06",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "suffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "prfNamesActiveList": [],
                    "prfNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 1,
                            "name": "Albro",
                            "effectiveDate": "2003-09-25",
                            "effDate": "2015-10-07",
                            "endDate": "2015-09-14",
                            "formOfAddress": " ",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Cletus",
                            "middleName": "D",
                            "suffix": " ",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "prfNamesCurrentList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 5,
                            "name": "hfgh",
                            "effectiveDate": "2015-10-09",
                            "effDate": "2015-10-07",
                            "endDate": "2099-12-31",
                            "formOfAddress": "Mr",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "hg",
                            "middleName": "hfg",
                            "suffix": "Junior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

        var suffixesResponse =[{"key": "II", "value": "II"}, {"key": "Jr", "value": "Junior"}, {
                    "key": "III",
                    "value": "III"
                }, {"key": "Sr", "value": "Senior"}],
            titlesResponse =
                [{
                    "key": "Mr",
                    "value": "Mr"
                }, {
                    "key": "Mrs",
                    "value": "Mrs"
                }, {
                    "key": "Ms",
                    "value": "Ms"
                }, {
                    "key": "Miss",
                    "value": "Miss"
                }, {
                    "key": "Dr",
                    "value": "Dr"
                }];


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.changeDeleteLable = function(data){
                   return data;
                };
                $scope.translation = {};
                $scope.translation.shared = {};
                $injector.get('$controller')('namesCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');

            });

            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }

        });

        describe('toggleTimeline function testing', function () {

            it('toggleTimeline is defined', function () {
                expect($scope.toggleTimeline).toBeDefined();
            });

            it('toggleTimeline function call testing', function () {

                expect($scope.showTimeline).toBeTruthy();

                $scope.toggleTimeline();

                expect($scope.showTimeline).toBeFalsy();


                $scope.toggleTimeline();

                expect($scope.showTimeline).toBeTruthy();

            });

        });


        describe('togglePrimaryName function testing', function () {

            it('togglePrimaryName is defined', function () {
                expect($scope.togglePrimaryName).toBeDefined();
            });

            it('togglePrimaryName function call testing', function () {

                expect($scope.visible).toBeFalsy();
                expect($scope.visibleName).toBeFalsy();

                $scope.togglePrimaryName();

                expect($scope.visible).toBeTruthy();
                expect($scope.visibleName).toBeTruthy();


                $scope.togglePrimaryName();

                expect($scope.visible).toBeFalsy();
                expect($scope.visibleName).toBeFalsy();

            });

        });


        describe('toggleCreateNew function testing', function () {

            it('toggleCreateNew is defined', function () {
                expect($scope.toggleCreateNew).toBeDefined();
            });

            it('toggleCreateNew function call testing', function () {

                expect($scope.visible).toBeFalsy();
                expect($scope.visibleCreateNewName).toBeFalsy();

                $scope.toggleCreateNew();

                expect($scope.visible).toBeTruthy();
                expect($scope.visibleCreateNewName).toBeTruthy();


                $scope.toggleCreateNew();

                expect($scope.visible).toBeFalsy();
                expect($scope.visibleCreateNewName).toBeFalsy();

            });

        });


        describe('togglePreferredName function testing', function () {

            it('togglePreferredName is defined', function () {
                expect($scope.toggleCreateNew).toBeDefined();
            });

            it('togglePreferredName function call testing', function () {

                expect($scope.visible).toBeFalsy();
                expect($scope.visiblePreferredName).toBeFalsy();

                $scope.togglePreferredName();

                expect($scope.visible).toBeTruthy();
                expect($scope.visiblePreferredName).toBeTruthy();


                $scope.togglePreferredName();

                expect($scope.visible).toBeFalsy();
                expect($scope.visiblePreferredName).toBeFalsy();

            });

        });


        describe('dateChange function testing', function () {

            it('dateChange is defined', function () {
                expect($scope.dateChange).toBeDefined();
            });

            it('dateChange function call testing', function () {
                var label = {"effDateLabel": "Effective"};
                $scope.nameData = nameDataResponse;
                $scope.primaryNameList = [{
                    "personId": "00001005514",
                    "effDateLabel":"Effective",
                    "nameType": "PRI",
                    "uniqueId": 4,
                    "name": "Albert",
                    "effectiveDate": "2015-10-07",
                    "effDate": "2015-10-07",
                    "endDate": "2015-10-22",
                    "formOfAddress": null,
                    "personTitle": null,
                    "nameFormat": null,
                    "firstName": "Paul",
                    "middleName": "ttt",
                    "suffix": "Senior",
                    "reasonChangeCode": null,
                    "approvalStatus": "F"
                },
                    {
                        "personId": "00001005514",
                        "effDateLabel":"Effectiv",
                        "nameType": "PRI",
                        "uniqueId": 5,
                        "name": "Albert",
                        "effectiveDate": "2015-10-23",
                        "effDate": "2015-10-07",
                        "endDate": "2099-12-31",
                        "formOfAddress": "Mr",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paulhghfg",
                        "middleName": "ttt",
                        "suffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "effDateLabel":"Effectiv",
                        "nameType": "PRI",
                        "uniqueId": 6,
                        "name": "Albert",
                        "effectiveDate": "2015-11-07",
                        "effDate": "2015-10-07",
                        "endDate": "2099-12-31",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paul",
                        "middleName": "ttt",
                        "suffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }];
                $scope.primaryNameData = {"middleName": "ttt","suffix":"II"};
                $scope.primaryNameModelData = {};
                $scope.nameData = {
                    "priNamesActiveList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 4,
                            "name": "Albert",
                            "effectiveDate": "2015-10-07",
                            "oldeffectiveDate": "2015-10-07",
                            "effDate": "2015-10-07",
                            "endDate": "2015-10-22",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "suffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        },
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 5,
                            "name": "Albert",
                            "effectiveDate": "2015-10-23",
                            "effDate": "2015-10-07",
                            "endDate": "2099-12-31",
                            "formOfAddress": "Mr",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paulhghfg",
                            "middleName": "ttt",
                            "suffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ], "priNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 3,
                            "name": "Albert",
                            "effectiveDate": "2015-09-16",
                            "effDate": "2015-10-07",
                            "endDate": "2015-10-06",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "suffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }], "prfNamesCurrentList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 5,
                            "name": "hfgh",
                            "effectiveDate": "2015-10-09",
                            "effDate": "2015-10-07",
                            "endDate": "2099-12-31",
                            "formOfAddress": "Mr",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "hg",
                            "middleName": "hfg",
                            "suffix": "Junior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }], "prfNamesActiveList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 5,
                            "name": "hfgh",
                            "effectiveDate": "2015-10-09",
                            "effDate": "2015-10-07",
                            "endDate": "2099-12-31",
                            "formOfAddress": "Mr",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "hg",
                            "middleName": "hfg",
                            "suffix": "Junior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ], "prfNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 1,
                            "name": "Albro",
                            "effectiveDate": "2003-09-25",
                            "effDate": "2015-10-07",
                            "endDate": "2015-09-14",
                            "formOfAddress": " ",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Cletus",
                            "middleName": "D",
                            "suffix": " ",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ]
                };
                $scope.dateChange(label);
            });

        });

        describe('deleteConfirm function testing', function () {

            it('deleteConfirm is defined', function () {
                expect($scope.deleteConfirm).toBeDefined();
            });

            it('deleteConfirm function call testing', function () {
                expect($scope.confirmMessage).toBeUndefined();
                expect($scope.yes_btn).toBeUndefined();
                expect($scope.no_btn).toBeUndefined();


                $scope.deleteConfirm();


                expect($scope.confirmMessage).toEqual(profile.names.deleteAlert);

            });

        });


        describe('deletePreferredName function testing', function () {

            it('deletePreferredName is defined', function () {
                expect($scope.deletePreferredName).toBeDefined();
            });

            it('deletePreferredName function call testing', function () {
                $scope.translation = {};
                $scope.translation.profile_personal = {};
                $scope.translation.profile_personal.preferred_name_delete_message = 'preferred_delete_message';
                expect($scope.confirmMessage).toBeUndefined();
                expect($scope.yes_btn).toBeUndefined();
                expect($scope.no_btn).toBeUndefined();


                $scope.deletePreferredName();

            });

        });

        describe('$on function testing for togglePrefferredName', function () {
            it('$on function call', function () {
                var data = {"visible": "true", "visiblePreferredName": "John"};
                $rootScope.$broadcast('togglePrefferredName', data);
            });
        });

        describe('$on function testing for togglePrimaryName', function () {
            it('$on function call', function () {
                var data = {"visible": "true", "visibleName": "John"};
                $rootScope.$broadcast('togglePrimaryName', data);
            });
        });

        describe('editData function call',function(){
            it('editData is defined',function(){
                expect($scope.editData).toBeDefined();
            });

            it('editData function call',function(){
                $scope.primaryNameData = {};
                $scope.editData();
            });

            it('editData function call',function(){
                $scope.primaryNameData = {
                                         "personId": "00001005514",
                                         "nameType": "PRI",
                                         "uniqueId": 4,
                                         "name": "Albert",
                                         "effectiveDate": new Date("2015-10-07"),
                                         "effDate": "2015-10-07",
                                         "endDate": "2015-10-22",
                                         "formOfAddress": null,
                                         "personTitle": null,
                                         "nameFormat": null,
                                         "firstName": "Paul",
                                         "middleName": "ttt",
                                         "suffix": "II",
                                         "reasonChangeCode": null,
                                         "approvalStatus": "F"
                                     };
                $scope.formOfAddressData = {"data":{
                                                   "personId": "00001005514",
                                                   "nameType": "PRI",
                                                   "uniqueId": 4,
                                                   "name": "Albert",
                                                   "effectiveDate": "2015-10-07",
                                                   "effDate": "2015-10-07",
                                                   "endDate": "2015-10-22",
                                                   "formOfAddress": null,
                                                   "personTitle": null,
                                                   "nameFormat": null,
                                                   "firstName": "Paul",
                                                   "middleName": "ttt",
                                                   "suffix": "II",
                                                   "reasonChangeCode": null,
                                                   "approvalStatus": "F"
                                               }};
                $scope.suffixData = {
                                    "data": [{"key": "II", "value": "II"}, {"key": "Jr", "value": "Junior"}, {
                                        "key": "III",
                                        "value": "III"
                                    }, {"key": "Sr", "value": "Senior"}]};
                $scope.editData();
            });

            it('editData function call',function(){
                $scope.primaryNameData = {
                                         "personId": "00001005514",
                                         "nameType": "PRI",
                                         "uniqueId": 4,
                                         "name": "Albert",
                                         "effectiveDate": new Date("2015-10-07"),
                                         "effDate": "2015-10-07",
                                         "endDate": "2015-10-22",
                                         "formOfAddress": null,
                                         "personTitle": null,
                                         "nameFormat": null,
                                         "firstName": "Paul",
                                         "middleName": "ttt",
                                         "suffix": "II",
                                         "reasonChangeCode": null,
                                         "approvalStatus": "F"
                                     };
                $scope.formOfAddressData = {};
                $scope.suffixData = {};
                $scope.editData();
            });
        });

    });


}());
*/

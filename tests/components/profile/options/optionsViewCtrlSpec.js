/**
 * Created by Naveen on 11/30/2015.
 */
describe('Options View Controller Testing', function () {

    var $rootScope,
        $httpBackend,
        $scope,
        appConfig,
        $routeParams,
        prefrenceStatusResponse = {
            "data": [{
                "preferenceType": "SEND_EMAIL",
                "preferenceValue": "Y"
            }, {
                "preferenceType": "W2_ONLINE",
                "preferenceValue": "N"
            }, {
                "preferenceType": "WF_EMAIL",
                "preferenceValue": "Y"
            },{
                "preferenceType": "GEN_ONLINE",
                "preferenceValue": "Y"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function (data) {
                $scope.alert = data; // need to removed once new service implementation is done.
                $scope.errorAlert = data;
            };
            $injector.get('$controller')('optionsViewCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'options'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $routeParams = $injector.get('$routeParams');
        });

        var url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
            appConfig.userId + "/preferences";
        $httpBackend.whenGET(url).respond(200, prefrenceStatusResponse);
        $httpBackend.flush();
    });

    describe('presentPrefrences function testing ', function () {
        it('presentPrefrences is defined ', function () {
            expect($scope.presentPrefrences).toBeDefined();
        });

        it('presentPrefrences function call testing', function () {
            var prefrenceStatusResponse1 = {
                "data": [{
                    "preferenceType": "SEND_EMAIL",
                    "preferenceValue": "Y"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url1 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url1).respond(200, prefrenceStatusResponse1);
            $scope.presentPrefrences();
            $httpBackend.flush();


            expect($scope.emailOption).toBeDefined();
            expect($scope.emailOption).toEqual('Yes');
        });

        it('presentPrefrences function call with SEND_EMAIL testing', function () {
            var prefrenceStatusResponse2 = {
                "data": [{
                    "preferenceType": "SEND_EMAIL",
                    "preferenceValue": ""
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url2 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url2).respond(200, prefrenceStatusResponse2);
            $scope.presentPrefrences();
            $httpBackend.flush();


            expect($scope.emailOption).toBeDefined();
        });

        it('presentPrefrences function call with GEN_ONLINE and preference value yes tesing', function () {
            var prefrenceStatusResponse3 = {
                "data": [{
                    "preferenceType": "GEN_ONLINE",
                    "preferenceValue": "Y"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url3 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url3).respond(200, prefrenceStatusResponse3);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.notice).toBeDefined();
            expect($scope.noticeLabel).toBeDefined();
            expect($scope.noticeBtnLabel).toBeDefined();

        });

        it('presentPrefrences function call with GEN_ONLINE and preference value no tesing', function () {
            var prefrenceStatusResponse4 = {
                "data": [{
                    "preferenceType": "GEN_ONLINE",
                    "preferenceValue": "N"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url4 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url4).respond(200, prefrenceStatusResponse4);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.notice).toBeDefined();
            expect($scope.noticeLabel).toBeDefined();
            expect($scope.noticeBtnLabel).toBeDefined();
        });

        it('presentPrefrences function call with GEN_ONLINE and preference value null tesing', function () {
            var prefrenceStatusResponse5 = {
                "data": [{
                    "preferenceType": "GEN_ONLINE",
                    "preferenceValue": ""
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url5 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url5).respond(200, prefrenceStatusResponse5);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.notice).toBeDefined();
            expect($scope.noticeLabel).toBeDefined();
            expect($scope.noticeBtnLabel).toBeDefined();
        });

        it('presentPrefrences function call with W2_ONLINE and preference value yes testing', function () {
            var prefrenceStatusResponse6 = {
                "data": [{
                    "preferenceType": "W2_ONLINE",
                    "preferenceValue": "Y"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url6 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url6).respond(200, prefrenceStatusResponse6);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.w2value).toBeDefined();
            expect($scope.w2Label).toBeDefined();
            expect($scope.w2BtnLabel).toBeDefined();


            var prefrenceStatusResponse7 = {
                "data": [{
                    "preferenceType": "GEN_ONLINE",
                    "preferenceValue": "N"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url7 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url7).respond(200, prefrenceStatusResponse7);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.w2value).toBeDefined();
            expect($scope.w2Label).toBeDefined();
            expect($scope.w2BtnLabel).toBeDefined();

            var prefrenceStatusResponse8 = {
                "data": [{
                    "preferenceType": "GEN_ONLINE",
                    "preferenceValue": ""
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url8 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url8).respond(200, prefrenceStatusResponse8);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.w2value).toBeDefined();
            expect($scope.w2Label).toBeDefined();
            expect($scope.w2BtnLabel).toBeDefined();
        });

        it('presentPrefrences function call with WF_EMAIL and preference value yes testing', function () {
            var prefrenceStatusResponse9 = {
                "data": [{
                    "preferenceType": "WF_EMAIL",
                    "preferenceValue": "Y"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url9 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url9).respond(200, prefrenceStatusResponse9);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.pendingWorkFlow).toBeDefined();
            expect($scope.pendingWorkFlow).toEqual('Yes');

            var prefrenceStatusResponse10 = {
                "data": [{
                    "preferenceType": "WF_EMAIL",
                    "preferenceValue": "N"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            var url10 = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                appConfig.userId + "/preferences";
            $httpBackend.whenGET(url10).respond(200, prefrenceStatusResponse10);
            $scope.presentPrefrences();
            $httpBackend.flush();

            expect($scope.pendingWorkFlow).toBeDefined();

        });
    });

    describe('trinetServicesDialog function testing ', function () {
        it('trinetServicesDialog is defined ', function () {
            expect($scope.trinetServicesDialog).toBeDefined();
        });

        it('trinetServicesDialog function call with decision as YES', function () {
            var decision = 'Yes';
            $scope.trinetServicesDialog(decision);
            expect($scope.optionDescion).toBeDefined();
            expect($scope.optionDescion).toEqual('No');
        });

        it('trinetServicesDialog function call with decision as NO', function () {
            var decision = 'No';
            $scope.trinetServicesDialog(decision);
            expect($scope.optionDescion).toBeDefined();
            expect($scope.optionDescion).toEqual('Yes');
        });
    });

    describe('saveEmailOption function testing ', function () {
        it('saveEmailOption is defined ', function () {
            expect($scope.saveEmailOption).toBeDefined();
        });

        it('saveEmailOption function call with optionDescion as yes', function () {
            var optionDescion = 'Yes'
            $scope.saveEmailOption(optionDescion);
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('SEND_EMAIL');
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('N');
        });

        it('saveEmailOption function call with optionDescion as no', function () {
            var optionDescion = 'No'
            $scope.saveEmailOption(optionDescion);
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('SEND_EMAIL');
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('Y');
        });
    });

    describe('close function testing ', function () {
        it('close is defined ', function () {
            expect($scope.close).toBeDefined();
        });

        it('close function call testing', function () {
            $scope.close();
        });
    });

    describe('openNoticeDelivery function testing ', function () {
        it('openNoticeDelivery is defined ', function () {
            expect($scope.openNoticeDelivery).toBeDefined();
        });

        it('openNoticeDelivery function call with notice as N ', function () {
            $scope.notice = 'N';
            $scope.openNoticeDelivery();
        });

        it('openNoticeDelivery function call with notice as Y ', function () {
            $scope.notice = 'YYY';
            $scope.openNoticeDelivery();
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('N');
            expect($scope.notice).toBeDefined();
            expect($scope.notice).toEqual('N');
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('GEN_ONLINE');
        });
    });

    describe('saveElectronicDelivery function testing ', function () {
        it('saveElectronicDelivery is defined ', function () {
            expect($scope.saveElectronicDelivery).toBeDefined();
        });

        it('saveElectronicDelivery function call testing', function () {
            $scope.saveElectronicDelivery();
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('GEN_ONLINE');
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('Y');
        });
    });

    describe('openW2Delivery function testing ', function () {
        it('openW2Delivery is defined ', function () {
            expect($scope.openW2Delivery).toBeDefined();
        });

        it('openW2Delivery function call with w2value as Y ', function () {
            $scope.w2value = 'Y';
            $scope.openW2Delivery();
            expect($scope.preferenceType).toBeDefined();
            expect($scope.w2value).toBeDefined();
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceType).toEqual('W2_ONLINE');
            expect($scope.w2value).toEqual('N');
            expect($scope.preferenceValue).toEqual('N');
        });

        it('openW2Delivery function call with w2value as N ', function () {
            $scope.w2value = 'N';
            $scope.openW2Delivery();
            expect($scope.preferenceType).toBeDefined();
            expect($scope.w2value).toBeDefined();
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceType).toEqual('W2_ONLINE');
            expect($scope.w2value).toEqual('Y');
            expect($scope.preferenceValue).toEqual('Y');
        });
    });

    describe('pendingWorkFlowDialog function testing ', function () {
        it('pendingWorkFlowDialog is defined ', function () {
            expect($scope.pendingWorkFlowDialog).toBeDefined();
        });

        it('pendingWorkFlowDialog function call with workflow as Yes', function () {
            var workflow = 'Yes';
            $scope.pendingWorkFlowDialog(workflow);
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('WF_EMAIL');
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('Y');
        });

        it('pendingWorkFlowDialog function call with workflow as No', function () {
            var workflow = 'No';
            $scope.pendingWorkFlowDialog(workflow);
            expect($scope.preferenceType).toBeDefined();
            expect($scope.preferenceType).toEqual('WF_EMAIL');
            expect($scope.preferenceValue).toBeDefined();
            expect($scope.preferenceValue).toEqual('N');
        });
    });

    describe('savePrefrerence function testing ', function () {
        it('savePrefrerence is defined ', function () {
            expect($scope.savePrefrerence).toBeDefined();
        });

        it('savePrefrerence function call with success response and preference type as WF_EMAIL', function () {
            var preferenceType = 'WF_EMAIL',
                preferenceValue = 'N';
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            var prefrenceStatusResponse = {
                    "_statusCode": "200",
                    "_statusText": "OK"
                },

                url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                    appConfig.userId + "/preferences?enableValidation=true";
            $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

            $scope.savePrefrerence(preferenceType, preferenceValue);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();


        });

        it('savePrefrerence function call with success response and preference type as SEND_EMAIL', function () {
            var preferenceType = 'SEND_EMAIL',
                preferenceValue = 'N';
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            var prefrenceStatusResponse = {
                    "_statusCode": "200",
                    "_statusText": "OK"
                },

                url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                    appConfig.userId + "/preferences?enableValidation=true";
            $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

            $scope.savePrefrerence(preferenceType, preferenceValue);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();


        });

        it('savePrefrerence function call with success response ', function () {
            var preferenceType = 'WF_EMAILI',
                preferenceValue = '';
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            var prefrenceStatusResponse = {
                    "_statusCode": "400",
                    "_statusText": "NOT OK"
                },
                url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                    appConfig.userId + "/preferences?enableValidation=true";
            $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

            $scope.savePrefrerence(preferenceType, preferenceValue);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();


        });

        it('savePrefrerence function call with success response and preference type as W2_ONLINE and preference value as N ',
            function () {
                var preferenceType = 'W2_ONLINE',
                    preferenceValue = 'N';
                $scope.preferences = {
                    "preferenceType": preferenceType,
                    "preferenceValue": preferenceValue
                };
                var prefrenceStatusResponse = {
                        "_statusCode": "200",
                        "_statusText": "OK"
                    },

                    url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                        appConfig.userId + "/preferences?enableValidation=true";
                $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

                $scope.savePrefrerence(preferenceType, preferenceValue);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();


                expect($scope.w2Label).toBeDefined();
                expect($scope.w2Label).toEqual('Paper');
                expect($scope.w2BtnLabel).toBeDefined();
                expect($scope.w2BtnLabel).toEqual('Use Electronic Delivery');
            });

        it('savePrefrerence function call with success response and preference type as W2_ONLINE and preference value as other than N ',
            function () {
                var preferenceType = 'W2_ONLINE',
                    preferenceValue = '';
                $scope.preferences = {
                    "preferenceType": preferenceType,
                    "preferenceValue": preferenceValue
                };
                var prefrenceStatusResponse = {
                        "_statusCode": "200",
                        "_statusText": "OK"
                    },

                    url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                        appConfig.userId + "/preferences?enableValidation=true";
                $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

                $scope.savePrefrerence(preferenceType, preferenceValue);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();


                expect($scope.w2Label).toBeDefined();
                expect($scope.w2BtnLabel).toBeDefined();
            });

        it('savePrefrerence function call with success response with preference type as GEN_ONLINE and preference value as Y ',
            function () {
                var preferenceType = 'GEN_ONLINE',
                    preferenceValue = 'Y';
                $scope.preferences = {
                    "preferenceType": preferenceType,
                    "preferenceValue": preferenceValue
                };
                var prefrenceStatusResponse = {
                        "_statusCode": "200",
                        "_statusText": "OK"
                    },

                    url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                        appConfig.userId + "/preferences?enableValidation=true";
                $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

                $scope.savePrefrerence(preferenceType, preferenceValue);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();

                expect($scope.noticeLabel).toBeDefined();
                expect($scope.noticeBtnLabel).toBeDefined();
            });

        it('savePrefrerence function call with success response with preference type as GEN_ONLINE and preference value as N ',
            function () {
                var preferenceType = 'GEN_ONLINE',
                    preferenceValue = 'N';
                $scope.preferences = {
                    "preferenceType": preferenceType,
                    "preferenceValue": preferenceValue
                };
                var prefrenceStatusResponse = {
                        "_statusCode": "200",
                        "_statusText": "OK"
                    },

                    url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                        appConfig.userId + "/preferences?enableValidation=true";
                $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

                $scope.savePrefrerence(preferenceType, preferenceValue);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();


                expect($scope.noticeLabel).toBeDefined();
                expect($scope.w2Label).toEqual('Paper');
                expect($scope.noticeBtnLabel).toBeDefined();
                expect($scope.w2BtnLabel).toEqual('Use Electronic Delivery');
            });

        it('savePrefrerence function call for an else case ', function () {
            var preferenceType = 'GEN_ONLIN223',
                preferenceValue = 'N';
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            var prefrenceStatusResponse = {
                    "_statusCode": "200",
                    "_statusText": "OK"
                },

                url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                    appConfig.userId + "/preferences?enableValidation=true";
            $httpBackend.when('PUT', url, $scope.preferences).respond(200, prefrenceStatusResponse);

            $scope.savePrefrerence(preferenceType, preferenceValue);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();

        });

        it('savePrefrerence function call failure response ', function () {
            var preferenceType = 'GEN_ONLIN223',
                preferenceValue = 'N';
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            var prefrenceStatusResponse = {
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                },

                url = profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' +
                    appConfig.userId + "/preferences?enableValidation=true";
            $httpBackend.when('PUT', url, $scope.preferences).respond(400, prefrenceStatusResponse);

            $scope.savePrefrerence(preferenceType, preferenceValue);
            $httpBackend.flush();

        });

    });

});
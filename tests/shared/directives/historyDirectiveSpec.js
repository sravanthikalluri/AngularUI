/**
 * Created by Jayakrishna on 1/5/2016.
 */

/*(function () {

    "use strict";


    describe('History Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            elem,
            controller,
            scope,
            $httpBackend,
            appConfig,
            displayChnage,
            simpleHTML = '<history-timeline data="changedHistoryData" section="section"></history-timeline>';

        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
            });

            $scope.changedHistoryData = [{
                label: 'since',
                firstName: 'Ganga',
                middleName: 'k',
                name: 'Gangaiah K',
                line1: '1',
                line2: '2',
                line3: '3',
                city: 'Hyd',
                stateProvinceCode: 'TS',
                countryCode: 'IN',
                postalCode: 50072,
                birthDate: '15-09-2013',
                gender: 'Male',
                effdt: '15-09-2013',
                coverageBeginDt: '15-09-2015',
                effDate: '15-09-2013'
            }];

        });


        it('should render the directive out in the dom ', function () {
            $scope.section = 'retirementPlan';

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var wallmessages = el.find('#wallmessages');

            expect(wallmessages).toBeDefined();
            expect(wallmessages.hasClass('qa-message-list')).toBe(true);

        });


        it('should test the retirementPlan ', function () {
            $scope.section = 'retirementPlan';

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var timeLineDate = el.find('.time-line-date');
            expect(timeLineDate).toBeDefined();

            var p = el.find('p');
            expect(p.length).toEqual(1);


        });


        it('should test the name ', function () {
            $scope.section = 'name';

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var timeLineDate = el.find('.time-line-date');
            expect(timeLineDate).toBeDefined();


            var p = el.find('p');
            expect(p.length).toEqual(1);


        });


        it('should test the address ', function () {
            $scope.section = 'address';

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var timeLineDate = el.find('.time-line-date');
            expect(timeLineDate).toBeDefined();

            var p = el.find('p');
            expect(p.length).toEqual(1);


        });


        it('should test the info ', function () {
            $scope.section = 'info';

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var timeLineDate = el.find('.time-line-date');
            expect(timeLineDate).toBeDefined();

            var p = el.find('p');
            expect(p.length).toEqual(1);


        });

        it('change is defined and function call testing success response', function () {
            elem = angular.element('<history-timeline data="changedHistoryData" section="section"></history-timeline>');
            $compile(elem)($rootScope.$new());
            $rootScope.$digest();
            controller = elem.controller('history-timeline');
            scope = elem.isolateScope() || elem.scope();
            expect(scope.dateConvert).toBeDefined();
            //scope.dateConvert('05-01-2016');

            expect(scope.displayHistory).toBeDefined();

            var selectedEffectiveDate = '04/05/2016',
                res = {
                    "_statusCode": "200",
                    "data": [{key: 'value'}]
                };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                appConfig.companyId + "/" + appConfig.userId + manageEmpUrlConfig.resources.displaychange + selectedEffectiveDate).respond(200, res);

            scope.displayHistory(selectedEffectiveDate);
            $httpBackend.flush();
        });

        it('change is defined and function call testing success data is null', function () {
            elem = angular.element('<history-timeline data="changedHistoryData" section="section"></history-timeline>');
            $compile(elem)($rootScope.$new());
            $rootScope.$digest();
            controller = elem.controller('history-timeline');
            scope = elem.isolateScope() || elem.scope();
            expect(scope.dateConvert).toBeDefined();
            //scope.dateConvert('05-01-2016');

            expect(scope.displayHistory).toBeDefined();

            var selectedEffectiveDate = '04/05/2016',
                res = {
                    "_statusCode": "200",
                    "data": []
                };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                appConfig.companyId + "/" + appConfig.userId + manageEmpUrlConfig.resources.displaychange + selectedEffectiveDate).respond(200, res);

            scope.displayHistory(selectedEffectiveDate);
            $httpBackend.flush();
        });

        it('change is defined and function call testing failure response', function () {
            elem = angular.element('<history-timeline data="changedHistoryData" section="section"></history-timeline>');
            $compile(elem)($rootScope.$new());
            $rootScope.$digest();
            controller = elem.controller('history-timeline');
            scope = elem.isolateScope() || elem.scope();
            expect(scope.dateConvert).toBeDefined();
            //scope.dateConvert('05-01-2016');

            expect(scope.displayHistory).toBeDefined();

            var selectedEffectiveDate = '04/05/2016',
                res = {
                    "_statusCode": "300",
                    "data": [{key: 'value'}],
                    "_error": {"detailMessage": "error"}
                };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                appConfig.companyId + "/" + appConfig.userId + manageEmpUrlConfig.resources.displaychange + selectedEffectiveDate).respond(400, res);

            scope.displayHistory(selectedEffectiveDate);
            $httpBackend.flush();
        });

        afterEach(function () {
            $body.empty();
        });

    });


}());*/

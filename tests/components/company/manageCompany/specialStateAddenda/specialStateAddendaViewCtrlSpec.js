describe('Special State Addenda View Controller Testing', function () {

    var $rootScope,
        $scope,
        $httpBackend,
        appConfig;


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('specialStateAddendaViewCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });
    });

    describe('get call testing',function(){
        it('get call with success response and data as not null', function () {
            var successResponse = {
                "data": [{
                    "stateProvinceDesc": "Beyond the limits of any Prov.",
                    "textToken": "<ol>\n<li>This State Addendum - AZ-GA-IL-MD-NC-WY (\"Addendum\") modifies the Customer Service Agreement entered into between Customer and TriNet (\"Agreement\") with respect to Employees located in Arizona, Georgia, Illinois, Maryland, North Carolina and Wyoming.  In the event of any conflict, this Addendum shall control for Employees located in the named States.  Any references in the Agreement or this Addendum or words of similar import shall refer to the Agreement as modified by this Addendum.</li><p>\n<li>As provided in Arizona Revised Statute Section 23:614G, Georgia Unemployment Code Section 34-8-32, Illinois Unemployment Insurance Act, 820 ILCS 405/206.1, Code of Maryland Regulations Section 09.32.01.26, North Carolina Employment Security Law Section 96-8(5)(r), and Wyoming Unemployment Compensation Statute Section 27-3-501(a)(viii), TriNet:</li><p>\n<ul>\n<li>Negotiates with Customer for such matters as the time of work, the place of work, the type of work, the working conditions, the quality of services, and the price of services;</li>\n<li>Determines Employee assignments or reassignments, even though the Employee retains the right to refuse specific assignments;</li>\n<li>Retains authority to assign or reassign an Employee to other customers if an employee is determined to be unacceptable by a Customer;</li>\n<li>Assigns or reassigns Employees to perform services to Customer;</li>\n<li>Sets Employees' rate of pay, whether or not through negotiation; and</li>\n<li>Pays Employees from TriNet's accounts.</li>\n</ul>\n</ol>"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.forms + "/" + appConfig.companyId + "/" +
                appConfig.userId + companyUrlConfig.resources.specialState + "=" + appConfig.countryCode).respond(200, successResponse);

            $httpBackend.flush();

            expect($scope.countries).toEqual(successResponse.data);
        });

        it('get call with success response and data as null', function () {
            var emptyResponse = {
                data: []
            };

            $httpBackend
                .whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.forms + "/" + appConfig.companyId + "/" +
                    appConfig.userId + companyUrlConfig.resources.specialState + "=" + appConfig.countryCode)
                .respond(200, emptyResponse);

            $httpBackend.flush();


        });

        it('get call with failure response', function () {
            var emptyResponse = {
                data: [],
                "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}
            };

            $httpBackend
                .whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.forms + "/" + appConfig.companyId + "/" +
                    appConfig.userId + companyUrlConfig.resources.specialState + "=" + appConfig.countryCode)
                .respond(400, emptyResponse);

            $httpBackend.flush();


        });
    });

});
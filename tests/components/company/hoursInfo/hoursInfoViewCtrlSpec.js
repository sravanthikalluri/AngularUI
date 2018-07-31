/**
 * Created by jaya krishna on 11/5/2015.
 */
describe('Hours Info View Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var response1 = {"data":{"address":{"address1":"xyz","address2":"abc","address3":"def","address4":"pqr","city":"Central City","country":"india","county":"US","postalCode":"123456","state":"CA"},"telephone":"9876543569"},"_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};
    var response2 = {
                     "data": [{
                      "address": {
                       "address1": "tyuityui",
                       "address2": "abc",
                       "address3": "xyz",
                       "address4": "pqr",
                       "city": "Hyderabad",
                       "country": "US",
                       "county": "India",
                       "postalCode": "16151",
                       "state": "DC"
                      },
                      "locationId": "W000000S27",
                      "locationName": "agg",
                      "shortDesc": "ergweg",
                      "effectiveDate": "2015-04-16",
                      "headquarter": "true",
                      "phone": "999999999",
                      "officehour": "In line with client's office hours"
                     },{
                      "address": {
                       "address1": "tyuityui",
                       "address2": "abc",
                       "address3": "xyz",
                       "address4": "pqr",
                       "city": "Hyderabad",
                       "country": "US",
                       "county": "India",
                       "postalCode": "16151",
                       "state": "DC"
                      },
                      "locationId": "W000000S27",
                      "locationName": "agg",
                      "shortDesc": "ergweg",
                      "effectiveDate": "2015-04-16",
                      "headquarter": "false",
                      "phone": "999999999",
                      "officehour": "In line with client's office hours"
                     }],
                     "_statusCode": "200",
                     "_statusText": "OK",
                     "_statusMessage": "Success"
                    };


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('hoursInformationCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });
        $httpBackend.whenGET(companyUrlConfig.companyApi + "/api-config/v1/company/" + appConfig.companyId + '/' + appConfig.userId + "/current-location").respond(200,response1);
        $httpBackend.whenGET(companyUrlConfig.companyApi + "/api-config/v1/company/" + appConfig.companyId +"/locations?include=address").respond(200,response2);
        $httpBackend.flush();
    });


    it('initHoursInfo function is defined',function(){
        expect($scope.initHoursInfo).toBeDefined();
    });
});

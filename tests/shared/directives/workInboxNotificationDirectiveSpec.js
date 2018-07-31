/**
 * Created by Jayakrishna on 1/5/2016.
 */
describe('Work Inbox Notification Directive Testing ', function () {
    var rootScope,
        scope,
        compile,
        element,
        $httpBackend,
        appConfig,
        res = {};

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        appConfig = $injector.get('appConfig');
        $httpBackend = $injector.get('$httpBackend');
        compile = $injector.get('$compile');
        var URL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
            '/' + appConfig.companyId + '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=assignedToMe';
        $httpBackend.whenGET(URL).respond(200, res);
    }));

    it('instance creation of work-inbox-notification, compilation and digesting scope', function () {
        // Create an instance of the directive
        element = angular.element('<work-inbox-notification></work-inbox-notification>');
        compile(element)(scope); // Compile the directive
        scope.$digest(); // Update the HTML
    });

});

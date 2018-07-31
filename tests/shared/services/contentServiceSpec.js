/**
 * Created by ganesh on 10/19/2015.
 */
(function () {

    "use strict";


    describe('Content Service Testing', function () {
        var contentService,
            $httpBackend,
            appConfig;

        var username = 'admin',
            password = 'letmein1',
            url = 'http://52.27.176.63',
            loginURL = '/alfresco/service/api/login.json?u=',

            loginResponse = {
                login: 'success',
                ticket: 618009
            };

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                contentService = $injector.get('contentService');
                appConfig = $injector.get('appConfig');
                $httpBackend = $injector.get('$httpBackend');

            });

        });


        it('Content Service is defined', function () {
            expect(contentService).toBeDefined();
        });


        describe('contentService addAuthTokenToUrl testing', function () {

            it('Should be addAuthTokenToUrl defined', function () {
                expect(contentService.addAuthTokenToUrl).toBeDefined();
            });

            it('addAuthTokenToUrl is called ', function () {

                var data = contentService.addAuthTokenToUrl(url);
                expect(contentService.addAuthTokenToUrl(url)).toEqual(data)
            });

        });

        describe('contentService login testing', function () {

            it('login is defined', function () {
                expect(contentService.login).toBeDefined();
            });

            it('login function is called', function () {
                $httpBackend
                    .whenGET(loginURL + username + '&pw=' + password).respond(loginResponse);

                var data = contentService.login(username, password);
                $httpBackend.flush();

                expect(data.$$state.value.data).toEqual(loginResponse);
            });

        });


        describe('contentService getImportantNotices testing', function () {

            it('getImportantNotices is defined', function () {
                expect(contentService.getImportantNotices).toBeDefined();
            });

            it('getImportantNotices function call ', function () {
                var employeeData = {},
                    searchTags = true,
                    res = {},
                    authToken = null,
                    url = '/alfresco/service/important-notices/employee.json?alf_ticket=' + authToken + '&searchtags=' + searchTags;
                $httpBackend.whenPOST(url).respond(res);
                contentService.getImportantNotices(employeeData, searchTags);
                $httpBackend.flush();
            });

        });


        describe('contentService searchByTags testing', function () {

            it('searchByTags is defined', function () {
                expect(contentService.searchByTags).toBeDefined();
            });

            it('searchByTags function call ', function () {
                var searchTags = true,
                    site = false,
                    res = {},
                    authToken = null,
                    url = '/alfresco/service/search-by-tags/important-notices/employee.json?alf_ticket=' + authToken + '&searchtags=' + searchTags;
                $httpBackend.whenGET(url).respond(res);
                contentService.searchByTags(searchTags, site);
                $httpBackend.flush();
            });

        });


        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


    });

})();
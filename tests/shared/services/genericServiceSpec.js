/**
 * Created by ganesh on 10/19/2015.
 */

(function () {

    "use strict";


    describe('Generic Service Testing', function () {
        var genericService,
            $httpBackend;

            var dateOfBirth = 'assets/data/personal/personinfo.json',
            chooseOption = 'assets/data/global/chooseOption.json',
            response = {data: {status: 'success', ticket: 6180010}};


        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                genericService = $injector.get('genericService');
                $httpBackend = $injector.get('$httpBackend');


            });
        });


        it('genericService Service is defined', function () {
            expect(genericService).toBeDefined();
        });


        describe('genericService gender testing', function () {

            it('Should be gender defined', function () {
                expect(genericService.gender).toBeDefined();
            });

            it('when gender method is called ', function () {

                $httpBackend
                    .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/genders').respond(response);

                genericService.gender();
                $httpBackend.flush();
            });


        });


        describe('genericService addressTypes testing', function () {

            it('Should be addressTypes defined', function () {
                expect(genericService.addressTypes).toBeDefined();
            });

            it('when addressTypes method is called ', function () {

                $httpBackend
                    .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/address-types').respond(response);

                genericService.addressTypes();
                $httpBackend.flush();
            });

        });


        describe('genericService media testing', function () {

            it('Should be media defined', function () {
                expect(genericService.media).toBeDefined();
            });

            it('when media method is called ', function () {

                $httpBackend
                    .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/media-types').respond(response);

                genericService.media();
                $httpBackend.flush();
            });

        });


        describe('genericService militaryStatus testing', function () {

            it('Should be militaryStatus defined', function () {
                expect(genericService.militaryStatus).toBeDefined();
            });

            it('when militaryStatus method is called ', function () {

                $httpBackend
                    .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/IN/military-statuses').respond(response);

                genericService.militaryStatus('IN');
                $httpBackend.flush();
            });

        });

        describe('genericService ethnicity testing', function () {

            it('Should be ethnicity defined', function () {
                expect(genericService.ethnicity).toBeDefined();
            });

            it('when ethnicity method is called ', function () {

                $httpBackend
                    .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/IN/ethnicities').respond(response);

                genericService.ethnicity('IN');
                $httpBackend.flush();
            });

        });

        describe('genericService dateOfBirth testing', function () {

            it('Should be dateOfBirth defined', function () {
                expect(genericService.dateOfBirth).toBeDefined();
            });

            it('when dateOfBirth method is called ', function () {

                $httpBackend
                    .whenGET(dateOfBirth).respond(response);

                genericService.dateOfBirth();
                $httpBackend.flush();
            });


        });


        describe('genericService chooseOption testing', function () {

            it('Should be chooseOption defined', function () {
                expect(genericService.chooseOption).toBeDefined();
            });

            it('when chooseOption method is called ', function () {

                $httpBackend
                    .whenGET(chooseOption).respond(response);

                genericService.chooseOption();
                $httpBackend.flush();
            });


        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });

})();
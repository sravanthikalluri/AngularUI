/**
 * Created by ganesh on 11/5/2015.
 */


describe('Login Url Config Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('loginUrlConfig is defined', function () {
        expect(loginUrlConfig).toBeDefined();
    });

    describe('loginUrlConfig loginAPI testing', function () {

        it('Should be loginAPI defined', function () {
            expect(loginUrlConfig.loginAPI).toBeDefined();
        });
    });

    it('resources is defined', function () {
        expect(loginUrlConfig.resources).toBeDefined();
    });


    describe('loginUrlConfig loginBaseURL testing', function () {

        it('loginBaseURL is defined', function () {
            expect(loginUrlConfig.loginBaseURL).toBeDefined();
        });

        it('loginBaseURL is equal to content', function () {
            expect(loginUrlConfig.loginBaseURL).toEqual('/trinetAuth/services/v1.0/authentication/');
        });

    });


    describe('loginUrlConfig resources.signon testing', function () {

        it('loginBaseURL is defined', function () {
            expect(loginUrlConfig.resources.signon).toBeDefined();
        });

        it('loginBaseURL is equal to content', function () {
            expect(loginUrlConfig.resources.signon).toEqual('signon');
        });

    });


});
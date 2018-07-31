/**
 * Created by Jayakrishna on 3/11/2016.
 */
describe('HRP Sign on Service Testing', function () {
    var hrpSignonService;


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            hrpSignonService = $injector.get('hrpSignonService');
            $injector.get('appConfig');
            $injector.get('$httpBackend');
        });
    });

    it('hrpSignonService is defined', function () {
        expect(hrpSignonService).toBeDefined();
    });

    describe('login  function testing ', function () {
        it('login  should be defined ', function () {
            expect(hrpSignonService.login).toBeDefined();
        });

        it('login function call ', function () {
            hrpSignonService.login();
        });
    });

    describe('seekerSessionLogin  function testing ', function () {
        it('seekerSessionLogin  should be defined ', function () {
            expect(hrpSignonService.seekerSessionLogin).toBeDefined();
        });

        it('seekerSessionLogin function call ', function () {
            hrpSignonService.seekerSessionLogin();
        });
    });

    describe('gatewayLogin  function testing ', function () {
        it('gatewayLogin  should be defined ', function () {
            expect(hrpSignonService.gatewayLogin).toBeDefined();
        });

        it('gatewayLogin function call ', function () {
            hrpSignonService.gatewayLogin();
        });
    });


});
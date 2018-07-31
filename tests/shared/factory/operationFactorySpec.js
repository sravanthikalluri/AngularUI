/**
 * Created by Jayakrishna on 3/9/2016.
 */
(function () {
    "use strict";
    describe('Operation Factory Testing', function () {
        var factory = this;
        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                $injector.get('$http');
                $injector.get('utilService');
            });
        });

        describe('doExecute function testing ', function () {
            it('doExecute function should be defined ', function () {
                expect(factory.doExecute).toBeDefined();
            });

            it('doExecute function call ', function () {
                var method = 'GET',
                    restUrl = '',
                    data = null,
                    successCb = function (res) {
                        return res;
                    },
                    errorCb = function (res) {
                        return res;
                    };
                factory.doExecute(method, restUrl, data, successCb, errorCb);
            });
        });

        describe('doCallExecute function testing ', function () {
            it('doCallExecute function should be defined ', function () {
                expect(factory.doCallExecute).toBeDefined();
            });

            it('doCallExecute function call ', function () {
                var method = 'GET',
                    restUrl = '',
                    data = null,
                    successCb = function (res) {
                        return res;
                    },
                    errorCb = function (res) {
                        return res;
                    };
                factory.doCallExecute(method, restUrl, data, successCb, errorCb);
            });
        });

    });

});
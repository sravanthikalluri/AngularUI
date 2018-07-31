/**
 * Created by Jayakrishna on 3/9/2016.
 */

(function () {

    "use strict";


    describe('Crud Service Testing', function () {
        var operationFactory;

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                operationFactory = $injector.get('operationFactory');
            });
        });

        it('execute should be defined ', function () {
            expect(operationFactory.execute).toBeDefined();
        });

        it('execute function call ', function () {
            var method = 'GET',
                restUrl = '',
                data = null,
                successCb = function (res) {
                    return res;
                },
                errorCb = function (res) {
                    return res;
                };
            operationFactory.execute(method, restUrl, data, successCb, errorCb);
        });

    });

});
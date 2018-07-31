/**
 * Created by ganesh on 11/5/2015.
 */


(function () {

    "use strict";

    describe('Global Url Config Testing', function () {


        beforeEach(function () {
            module('TrinetPassport');

        });

        it('globalUrlConfig is defined', function () {
            expect(globalUrlConfig).toBeDefined();
        });

        describe('globalUrlConfig globalApi testing', function () {

            it('Should be globalApi defined', function () {
                expect(globalUrlConfig.globalApi).toBeDefined();
            });

        });


        describe('globalUrlConfig globalBase testing', function () {

            it('Should be globalBase defined', function () {
                expect(globalUrlConfig.globalBase).toBeDefined();
            });

            it('Test globalBase content', function () {
                expect(globalUrlConfig.globalBase).toEqual('/api-config/v1');
            });

        });


        it('resources is defined', function () {
            expect(globalUrlConfig.resources).toBeDefined();
        });


        describe('globalUrlConfig resources.company testing', function () {

            it('resources.company is defined', function () {
                expect(globalUrlConfig.resources.company).toBeDefined();
            });

            it('resources.company is equal to /company', function () {
                expect(globalUrlConfig.resources.company).toEqual('/company');
            });

        });

        describe('globalUrlConfig resources.global testing', function () {

            it('resources.global is defined', function () {
                expect(globalUrlConfig.resources.global).toBeDefined();
            });

            it('resources.global content is equal to /global', function () {
                expect(globalUrlConfig.resources.global).toEqual('/global');
            });

        });


        describe('globalUrlConfig resources.payFreq testing', function () {

            it('resources.payFreq is defined', function () {
                expect(globalUrlConfig.resources.payFreq).toBeDefined();
            });

            it('resources.payFreq content is equal to /pay-frequencies', function () {
                expect(globalUrlConfig.resources.payFreq).toEqual('/pay-frequencies');
            });

        });


        describe('globalUrlConfig resources.earnType testing', function () {

            it('resources.earnType is defined', function () {
                expect(globalUrlConfig.resources.earnType).toBeDefined();
            });

            it('resources.earnType content is equal to /earn-types', function () {
                expect(globalUrlConfig.resources.earnType).toEqual('/earn-types');
            });

        });


        describe('globalUrlConfig resources.transferReasons testing', function () {

            it('Should be resources.transferReasons defined', function () {
                expect(globalUrlConfig.resources.transferReasons).toBeDefined();
            });

            it('Test resources.transferReasons content', function () {
                expect(globalUrlConfig.resources.transferReasons).toEqual('/transfer-reasons');
            });

        });


        describe('globalUrlConfig resources.payChangeReasons testing', function () {

            it('resources.payChangeReasons is defined', function () {
                expect(globalUrlConfig.resources.payChangeReasons).toBeDefined();
            });

            it('resources.payChangeReasons content is equal to /paychange-reasons', function () {
                expect(globalUrlConfig.resources.payChangeReasons).toEqual('/paychange-reasons');
            });

        });

        describe('globalUrlConfig resources.jobRecReasons testing', function () {

            it('resources.jobRecReasons is defined', function () {
                expect(globalUrlConfig.resources.jobRecReasons).toBeDefined();
            });

            it('resources.jobRecReasons content is equal to /job-reclassification-reasons', function () {
                expect(globalUrlConfig.resources.jobRecReasons).toEqual('/job-reclassification-reasons');
            });

        });

        describe('globalUrlConfig resources.promotionReasons testing', function () {

            it('resources.promotionReasons is defined', function () {
                expect(globalUrlConfig.resources.promotionReasons).toBeDefined();
            });

            it('resources.promotionReasons content is equal to /promotion-reasons', function () {
                expect(globalUrlConfig.resources.promotionReasons).toEqual('/promotion-reasons');
            });

        });


        describe('globalUrlConfig resources.demotionReasons testing', function () {

            it('resources.demotionReasons is defined', function () {
                expect(globalUrlConfig.resources.demotionReasons).toBeDefined();
            });

            it('resources.demotionReasons content is equal to /demotion-reasons', function () {
                expect(globalUrlConfig.resources.demotionReasons).toEqual('/demotion-reasons');
            });

        });


        describe('globalUrlConfig resources.compensationTypes testing', function () {

            it('resources.compensationTypes is defined', function () {
                expect(globalUrlConfig.resources.compensationTypes).toBeDefined();
            });

            it('resources.compensationTypes content is equal to /compensation-types', function () {
                expect(globalUrlConfig.resources.compensationTypes).toEqual('/compensation-types');
            });

        });


        describe('globalUrlConfig resources.flsa testing', function () {

            it('resources.flsa is defined', function () {
                expect(globalUrlConfig.resources.flsa).toBeDefined();
            });

            it('resources.flsa content is equal to /flsa-codes', function () {
                expect(globalUrlConfig.resources.flsa).toEqual('/flsa-codes');
            });

        });


        describe('globalUrlConfig resources.workersCompLookUp testing', function () {

            it('resources.workersCompLookUp is defined', function () {
                expect(globalUrlConfig.resources.workersCompLookUp).toBeDefined();
            });

            it('resources.workersCompLookUp content is equal to /workers-comp', function () {
                expect(globalUrlConfig.resources.workersCompLookUp).toEqual('/workers-comp');
            });

        });

        describe('globalUrlConfig resources.locations testing', function () {

            it('resources.locations is defined', function () {
                expect(globalUrlConfig.resources.locations).toBeDefined();
            });

            it('resources.locations content is equal to /locations', function () {
                expect(globalUrlConfig.resources.locations).toEqual('/locations');
            });

        });


        describe('globalUrlConfig resources.departments testing', function () {

            it('resources.departments is defined', function () {
                expect(globalUrlConfig.resources.departments).toBeDefined();
            });

            it('resources.departments content is equal to /departments', function () {
                expect(globalUrlConfig.resources.departments).toEqual('/departments');
            });

        });

        describe('globalUrlConfig resources.countries testing', function () {

            it('resources.countries is defined', function () {
                expect(globalUrlConfig.resources.countries).toBeDefined();
            });

            it('resources.countries content is equal to /countries', function () {
                expect(globalUrlConfig.resources.countries).toEqual('/countries');
            });

        });

    });

}());
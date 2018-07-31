/**
 * Created by SEEMA on 10/14/2015.
 */

(function () {

    "use strict";

    describe('Constants Testing', function () {


        beforeEach(function () {
            module('TrinetPassport');

        });

        it('constants is defined', function () {
            expect(constants).toBeDefined();
        });

        describe('constants currentlyEffective testing', function () {

            it('Should be currentlyEffective defined', function () {
                expect(constants.currentlyEffective).toBeDefined();
            });

            it('Test currentlyEffective content', function () {
                expect(constants.currentlyEffective).toEqual('Currently Effective');
            });

        });

        describe('constants effectiveOn testing', function () {

            it('Should be effectiveOn defined', function () {
                expect(constants.effectiveOn).toBeDefined();
            });

            it('Test currentlyEffective content', function () {
                expect(constants.effectiveOn).toEqual('Effective on ');
            });

        });

        describe('constants effectiveSince testing', function () {

            it('Should be effectiveSince defined', function () {
                expect(constants.effectiveSince).toBeDefined();
            });

            it('Test effectiveSince content', function () {
                expect(constants.effectiveSince).toEqual('Effective since ');
            });

        });


        describe('constants effective testing', function () {

            it('Should be effective defined', function () {
                expect(constants.effective).toBeDefined();
            });

            it('Test effective content', function () {
                expect(constants.effective).toEqual('Effective ');
            });

        });


        describe('constants country testing', function () {

            it('Should be country defined', function () {
                expect(constants.country).toBeDefined();
            });

            it('Test country content', function () {
                expect(constants.country).toEqual('US');
            });

        });


        describe('constants endDate testing', function () {

            it('Should be endDate defined', function () {
                expect(constants.endDate).toBeDefined();
            });

            it('Test endDate content', function () {
                expect(constants.endDate).toEqual('2099-12-31');
            });

        });


        describe('constants yearStart testing', function () {

            it('Should be yearStart defined', function () {
                expect(constants.yearStart).toBeDefined();
            });

            it('Test yearStart content', function () {
                expect(constants.yearStart).toEqual(1900);
            });

        });

        describe('constants statusCode testing', function () {

            it('Should be statusCode defined', function () {
                expect(constants.statusCode).toBeDefined();
            });

            it('Test statusCode content', function () {
                expect(constants.statusCode).toEqual('200');
            });

        });


        describe('constants success testing', function () {

            it('Should be success defined', function () {
                expect(constants.success).toBeDefined();
            });

            it('Test success content', function () {
                expect(constants.success).toEqual('success');
            });

        });

        describe('constants danger testing', function () {

            it('Should be danger defined', function () {
                expect(constants.danger).toBeDefined();
            });

            it('Test danger content', function () {
                expect(constants.danger).toEqual('danger');
            });

        });


        describe('constants warning testing', function () {

            it('Should be warning defined', function () {
                expect(constants.warning).toBeDefined();
            });

            it('Test warning content', function () {
                expect(constants.warning).toEqual('warning');
            });

        });


        describe('constants on testing', function () {

            it('Should be on defined', function () {
                expect(constants.on).toBeDefined();
            });

            it('Test on content', function () {
                expect(constants.on).toEqual('on');
            });

        });


        describe('constants since testing', function () {

            it('Should be since defined', function () {
                expect(constants.since).toBeDefined();
            });

            it('Test since content', function () {
                expect(constants.since).toEqual('since');
            });

        });


        describe('constants dateFormat testing', function () {

            it('Should be dateFormat defined', function () {
                expect(constants.dateFormat).toBeDefined();
            });

            it('Test dateFormat content', function () {
                expect(constants.dateFormat).toEqual('yyyy-MM-dd');
            });

        });

        describe('constants dateFormatUS testing', function () {

            it('Should be dateFormatUS defined', function () {
                expect(constants.dateFormatUS).toBeDefined();
            });

            it('Test dateFormatUS content', function () {
                expect(constants.dateFormatUS).toEqual('MM/dd/yyyy');
            });

        });


        describe('constants sectionName testing', function () {

            it('Should be sectionName defined', function () {
                expect(constants.sectionName).toBeDefined();
            });

            it('Test sectionName content', function () {
                expect(constants.sectionName).toEqual('name');
            });

        });


        describe('constants sectionAddress testing', function () {

            it('Should be sectionAddress defined', function () {
                expect(constants.sectionAddress).toBeDefined();
            });

            it('Test sectionAddress content', function () {
                expect(constants.sectionAddress).toEqual('address');
            });

        });


        describe('constants sectionInfo testing', function () {

            it('Should be sectionInfo defined', function () {
                expect(constants.sectionInfo).toBeDefined();
            });

            it('Test sectionInfo content', function () {
                expect(constants.sectionInfo).toEqual('info');
            });

        });


        describe('constants genderMale testing', function () {

            it('Should be genderMale defined', function () {
                expect(constants.genderMale).toBeDefined();
            });

            it('Test genderMale content', function () {
                expect(constants.genderMale).toEqual('Male');
            });

        });


        describe('constants genderFemale testing', function () {

            it('Should be genderFemale defined', function () {
                expect(constants.genderFemale).toBeDefined();
            });

            it('Test genderFemale content', function () {
                expect(constants.genderFemale).toEqual('Female');
            });

        });

        describe('constants genderMaleKey testing', function () {

            it('Should be genderMaleKey defined', function () {
                expect(constants.genderMaleKey).toBeDefined();
            });

            it('Test genderMaleKey content', function () {
                expect(constants.genderMaleKey).toEqual('M');
            });

        });


        describe('constants primaryNameType testing', function () {

            it('Should be primaryNameType defined', function () {
                expect(constants.primaryNameType).toBeDefined();
            });

            it('Test primaryNameType content', function () {
                expect(constants.primaryNameType).toEqual('PRI');
            });

        });


        describe('constants preferredNameType testing', function () {

            it('Should be preferredNameType defined', function () {
                expect(constants.preferredNameType).toBeDefined();
            });

            it('Test preferredNameType content', function () {
                expect(constants.preferredNameType).toEqual('PRF');
            });

        });


        describe('constants emitName testing', function () {

            it('Should be emitName defined', function () {
                expect(constants.emitName).toBeDefined();
            });

            it('Test emitName content', function () {
                expect(constants.emitName).toEqual('name');
            });

        });

        describe('constants emitAddress testing', function () {

            it('Should be emitAddress defined', function () {
                expect(constants.emitAddress).toBeDefined();
            });

            it('Test emitAddress content', function () {
                expect(constants.emitAddress).toEqual('address');
            });

        });


        describe('constants emitEmail testing', function () {

            it('Should be emitEmail defined', function () {
                expect(constants.emitEmail).toBeDefined();
            });

            it('Test emitEmail content', function () {
                expect(constants.emitEmail).toEqual('email');
            });

        });


        describe('constants emitPhoneNumber testing', function () {

            it('Should be emitPhoneNumber defined', function () {
                expect(constants.emitPhoneNumber).toBeDefined();
            });

            it('Test emitPhoneNumber content', function () {
                expect(constants.emitPhoneNumber).toEqual('phone');
            });

        });

        describe('constants emitAlert testing', function () {

            it('Should be emitAlert defined', function () {
                expect(constants.emitAlert).toBeDefined();
            });

            it('Test emitAlert content', function () {
                expect(constants.emitAlert).toEqual('alert');
            });

        });


        describe('constants emitDDAlert testing', function () {

            it('Should be emitDDAlert defined', function () {
                expect(constants.emitDDAlert).toBeDefined();
            });

            it('Test emitDDAlert content', function () {
                expect(constants.emitDDAlert).toEqual('ddAlert');
            });

        });


        describe('constants mediaTypeEmail testing', function () {

            it('Should be mediaTypeEmail defined', function () {
                expect(constants.mediaTypeEmail).toBeDefined();
            });

            it('Test mediaTypeEmail content', function () {
                expect(constants.mediaTypeEmail).toEqual('Email');
            });

        });


        describe('constants mediaTypePhone testing', function () {

            it('Should be mediaTypePhone defined', function () {
                expect(constants.mediaTypePhone).toBeDefined();
            });

            it('Test mediaTypePhone content', function () {
                expect(constants.mediaTypePhone).toEqual('Phone');
            });

        });

        describe('constants broadcastContact testing', function () {

            it('Should be broadcastContact defined', function () {
                expect(constants.broadcastContact).toBeDefined();
            });

            it('Test broadcastContact content', function () {
                expect(constants.broadcastContact).toEqual('toggleContact');
            });

        });

        describe('constants zeroDoublePrecision testing', function () {

            it('Should be zeroDoublePrecision defined', function () {
                expect(constants.zeroDoublePrecision).toBeDefined();
            });

            it('Test zeroDoublePrecision content', function () {
                expect(constants.zeroDoublePrecision).toEqual(constants.zeroDoublePrecision);
            });

        });


        describe('constants retirementPlanGoalAmountColorCode testing', function () {

            it('Should be retirementPlanGoalAmountColorCode defined', function () {
                expect(constants.retirementPlanGoalAmountColorCode).toBeDefined();
            });

            it('Test retirementPlanGoalAmountColorCode content', function () {
                expect(constants.retirementPlanGoalAmountColorCode).toEqual('#084B8A');
            });

        });

        describe('constants retirementPlanGoalAmountLabel testing', function () {

            it('Should be retirementPlanGoalAmountLabel defined', function () {
                expect(constants.retirementPlanGoalAmountLabel).toBeDefined();
            });

            it('Test retirementPlanGoalAmountLabel content', function () {
                expect(constants.retirementPlanGoalAmountLabel).toEqual('Goal Amount');
            });

        });


        describe('constants retirementPlanYTDColorCode testing', function () {

            it('Should be retirementPlanYTDColorCode defined', function () {
                expect(constants.retirementPlanYTDColorCode).toBeDefined();
            });

            it('Test retirementPlanYTDColorCode content', function () {
                expect(constants.retirementPlanYTDColorCode).toEqual('#084B8A');
            });

        });


        describe('constants retirementPlanYTDLabel testing', function () {

            it('Should be retirementPlanYTDLabel defined', function () {
                expect(constants.retirementPlanYTDLabel).toBeDefined();
            });

            it('Test retirementPlanYTDLabel content', function () {
                expect(constants.retirementPlanYTDLabel).toEqual('Ytd Contribution');
            });

        });


        describe('constants retirementPlanGoalAmount testing', function () {

            it('Should be retirementPlanGoalAmount defined', function () {
                expect(constants.retirementPlanGoalAmount).toBeDefined();
            });

            it('Test retirementPlanGoalAmount content', function () {
                expect(constants.retirementPlanGoalAmount).toEqual(1000);
            });

        });


        describe('constants section testing', function () {

            it('Should be section defined', function () {
                expect(constants.section).toBeDefined();
            });

            it('Test section content', function () {
                expect(constants.section).toEqual('retirementPlan');
            });

        });


        describe('constants goalAmountText testing', function () {

            it('Should be goalAmountText defined', function () {
                expect(constants.goalAmountText).toBeDefined();
            });

            it('Test goalAmountText content', function () {
                expect(constants.goalAmountText).toEqual('setGoalAmt');
            });

        });


        describe('constants exemptValue testing', function () {

            it('Should be exemptValue defined', function () {
                expect(constants.exemptValue).toBeDefined();
            });

            it('Test exemptValue content', function () {
                expect(constants.exemptValue).toEqual('checked');
            });

        });


        describe('constants check_index testing', function () {

            it('Should be check_index defined', function () {
                expect(constants.check_index).toBeDefined();
            });

            it('Test check_index content', function () {
                expect(constants.check_index).toEqual('curEffDate');
            });

        });


        describe('constants modules testing', function () {

            it('Should be modules defined', function () {
                expect(constants.modules).toBeDefined();
            });

            it('Test modules content', function () {
                expect(constants.modules).toEqual('global,home,profile,money,benefits,company,manageEmp');
            });

        });


        describe('constants i18nPath testing', function () {

            it('Should be i18nPath defined', function () {
                expect(constants.i18nPath).toBeDefined();
            });

            it('Test i18nPath content', function () {
                expect(constants.i18nPath).toEqual('assets/i18n/');
            });

        });


    });

}());
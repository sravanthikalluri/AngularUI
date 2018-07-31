/*
 /!**
 * Created by ganesh on 10/28/2015.
 *!/
 (function(){

 "use strict";

 describe('Testing Sections Count Factory', function() {
 var sectionsCountFactory,
 sectionsCountData,
 $httpBackend,
 sectionsCountResponse  = [
 {
 "id":"sec_0"
 },
 {
 "id":"sec_1"
 },
 {
 "id":"sec_2"
 },{
 "id":"sec_3"
 },
 {
 "id":"sec_4"
 },
 {
 "id":"sec_5"
 },{
 "id":"sec_6"
 },
 {
 "id":"sec_7"
 },
 {
 "id":"sec_8"
 },{
 "id":"sec_9"
 },
 {
 "id":"sec_10"
 },
 {
 "id":"sec_11"
 }];

 beforeEach(function () {
 module('TrinetPassport');

 inject(function ($injector) {
 sectionsCountFactory = $injector.get('sectionsCountFactory');
 $httpBackend = $injector.get('$httpBackend');
 });
 });


 it("Test Sections Count Factory must be defined", function () {
 expect(sectionsCountFactory).toBeDefined();
 });

 it("Test Sections Count Factory sectionsCountDetails  method is defined", function () {
 expect(sectionsCountFactory.sectionsCountDetails).toBeDefined();
 });


 it("Test Sections Count Factory sectionsCountDetails data", function () {
 $httpBackend
 .whenGET('assets/data/dashboard/sectionsCount_data.json').respond(200,sectionsCountResponse);

 sectionsCountData = sectionsCountFactory.sectionsCountDetails();

 $httpBackend.flush();

 expect(sectionsCountData.$$state.value).toEqual(sectionsCountResponse);

 });





 });

 }());*/

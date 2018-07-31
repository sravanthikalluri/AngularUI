/*
 /!**
 * Created by ganesh on 10/28/2015.
 *!/
 (function(){

 "use strict";

 describe('Testing Sections Factory', function() {
 var sectionsFactory,
 sectionsData,
 $httpBackend,
 sectionsResponse  = [
 {
 "id":"1",
 "title":"My Profile",
 "directive":"profile"
 }
 ];

 beforeEach(function () {
 module('TrinetPassport');

 inject(function ($injector) {
 sectionsFactory = $injector.get('sectionsFactory');
 $httpBackend = $injector.get('$httpBackend');
 });
 });


 it("Test Sections Factory must be defined", function () {
 expect(sectionsFactory).toBeDefined();
 });

 it("Test Sections Factory sectionsCountDetails  method is defined", function () {
 expect(sectionsFactory.sectionsDetails).toBeDefined();
 });


 it("Test Sections Factory sectionsCountDetails data", function () {
 $httpBackend
 .whenGET('assets/data/dashboard/dashboard_data.json').respond(200,sectionsResponse);

 sectionsData = sectionsFactory.sectionsDetails();

 $httpBackend.flush();

 expect(sectionsData.$$state.value).toEqual(sectionsResponse);

 });





 });
 }());*/

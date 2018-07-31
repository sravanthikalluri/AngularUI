/*
 /!**
 * Created by ganesh on 10/27/2015.
 *!/
 (function(){

 "use strict";


 describe('Dashboard Sections Directive Testing', function () {
 var $scope,
 $compile,
 $body=$('body'),
 el,
 $rootScope,
 simpleHTML = '<dashboard-sections></dashboard-sections>',
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
 $rootScope = $injector.get('$rootScope');
 $scope = $rootScope.$new();
 $compile = $injector.get('$compile');
 });


 $scope.sectionsCountDetails = sectionsCountResponse;
 $scope.myVar = false;

 });

 it('Should contain main id attribute ',function(){

 el = $compile(simpleHTML)($scope);
 $body.append(el);
 $rootScope.$digest();



 var $main = el.find('div#main');

 expect($main).toBeDefined();

 });


 afterEach(function(){
 $body.empty();
 });

 });






 }());
 */

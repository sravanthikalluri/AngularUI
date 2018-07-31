/**
 * Created by ganesh on 11/27/2015.
 *//*

 (function() {

 "use strict";


 describe('Week Day Service Testing', function () {
 var weekDaysService;

 beforeEach(function () {
 module('TrinetPassport');
 inject(function ($injector) {
 weekDaysService = $injector.get('weekDaysService');
 });

 });


 it('Week Day Service is defined', function () {
 expect(weekDaysService).toBeDefined();
 });


 describe('weekDaysService weekDays testing',function() {

 it('Should be weekDays defined', function () {
 expect(weekDaysService.weekDays).toBeDefined();
 });

 it('when weekDays method is called ', function () {

 var weekday= new Array(7);
 var date = new Date();
 weekday[0]=  "Sunday";
 weekday[1] = "Monday";
 weekday[2] = "Tuesday";
 weekday[3] = "Wednesday";
 weekday[4] = "Thursday";
 weekday[5] = "Friday";
 weekday[6] = "Saturday";
 var data = weekday[date.getDay()];


 expect(weekDaysService.weekDays()).toEqual(data);



 });

 });

 });

 })();*/

/**
 * Created by Jayakrishna on 1/4/2016.
 */
/*
 describe('Slick Slider Directive Testing ', function () {
 var rootScope,
 scope,
 compile,
 directiveElem,
 directiveElem1;

 beforeEach(function () {
 module('TrinetPassport');
 inject(function ($injector) {
 rootScope = $injector.get('$rootScope');
 scope = rootScope.$new();
 compile = $injector.get('$compile');
 scope.data = {
 prop: 'value'
 };
 scope.value = 'newString'
 });
 directiveElem = getCompiledElement();
 directiveElem1 = getCompiledElement1();
 });

 function getCompiledElement() {
 var compiledDirective = compile(angular.element('<input slick-slider slickSlider="String" data="data" />'))(scope);
 scope.$digest();
 return compiledDirective;
 }

 function getCompiledElement1() {
 var compiledDirective = compile(angular.element('<input slick-slider slickSlider="newString" data="data" />'))(scope);
 scope.$digest();
 return compiledDirective;
 }

 it('data on isolated scope should be two-way bound', function(){
 var isolatedScope = directiveElem.isolateScope();

 isolatedScope.data.prop = "value2";

 expect(scope.data.prop).toEqual('value2');
 });

 it('data on isolated scope should be two-way bound', function(){
 var isolatedScope = directiveElem1.isolateScope();

 isolatedScope.data.prop = "value2";

 expect(scope.data.prop).toEqual('value2');

 scope.input = 'someData';
 var e = compile('<input slick-slider data="input" />')(scope);
 });

 });
 */

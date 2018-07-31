/**
 * Created by jaya krishna on 10/28/2015.
 */
describe('money controller testing', function () {
    var $rootScope;
    var $scope;
    var $httpBackend;
    var $compile,$body = $('body');

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function(data){
                return data;
            };
            $injector.get('$controller')('moneyCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'money'}
            });
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
        });
    });

    describe('estimateAlert function testing',function(){
        it('estimateAlert is defined',function(){
            expect($scope.estimateAlert).toBeDefined();
        });

        it('estimateAlert function call',function(){
            $scope.translation = {"moneyTab":{"payroll_est":"payroll estimates"}};
            var value = 1;
            var evt = {"target": "#id1"};
            var html = "<div class='panel-heading'>"+"<p>"+"<span id='id1'>"+"</span>"+"</p>"+"</div>";
            var element1 = $compile(html)($scope);
            $body.append(element1);
            $rootScope.$digest();
            $scope.estimateAlert(value,evt);
        });
    });

    afterEach(function () {
        $body.empty();
    });


});

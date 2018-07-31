describe('immigration controller testing', function () {
    var $rootScope;
    var $scope;
    var $httpBackend;
    var ProjectsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            };
    var $compile,$body = $('body');

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function(data){
                return data;
            };
            $injector.get('$controller')('immigrationCtrl', {
                $scope: $scope,
                // $routeParams: {selectedTab: 'immigration'}
            });
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
        });
        $httpBackend.whenGET('https://teleborder-staging.herokuapp.com/api/v1/projects').respond(200, ProjectsResponse);
    });

    describe('initImmigrationProjects function testing',function(){
        it('initImmigrationProjects is defined',function(){
            expect($scope.initImmigrationProjects).toBeDefined();
        });

        it('initImmigrationProjects function call',function(){
            $scope.initImmigrationProjects();
        });

    });

    afterEach(function () {
        $body.empty();
    });

});

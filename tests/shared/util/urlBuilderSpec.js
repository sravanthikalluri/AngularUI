describe('Url Builder Testing', function () {
    var $scope, ctrl, $timeout;

    /* declare our mocks out here
     * so we can use them through the scope 
     * of this describe block.
     */
    var urlBuilder, trinetApp;

    beforeEach(module('TrinetPassport'));


    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        // Create a "spy object" for our someService.
        // This will isolate the controller we're testing from
        // any other code.
        // we'll set up the returns for this later 
        // someServiceMock = jasmine.createSpyObj('someService', ['someAsyncCall']);

        //trinetApp = module('TrinetPassport');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // _urlBuilder - injected the service we are wanting to test.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function ($rootScope, $controller, $q, _$timeout_, _urlBuilder_) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            urlBuilder = _urlBuilder_;
            // set up the returns for our someServiceMock
            // $q.when('weee') creates a resolved promise to "weee".
            // this is important since our service is async and returns
            // a promise.
            // someServiceMock.someAsyncCall.andReturn($q.when('weee'));

            // assign $timeout to a scoped variable so we can use 
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            // ctrl = $controller('taxWithHoldingCtrl', {
            //   $scope: $scope
            //   //someService: someServiceMock
            // });
        });
    });


    /* Test 1: The simplest of the simple.
     * here we're going to test that person i9
     * value is coming from data base that should be Y or N. */
    it('payrollschedule url with params testing', function () {
        $scope.employee = {};
        $scope.employee.userId = '2253271';
        $scope.employee.userCompany = '001';
        $scope.employee.userPosition = '2253271';
        $scope.employee.logonTimeStamp = Date.now();
        // Not sure where this comes from.
        $scope.employee.logonTimeStamp = '08/14/2015 06:19:45';
        $scope.params = {
            'USERID': $scope.employee.userId,
            'USER_COMPANY': $scope.employee.userCompany,
            'USER_POSITION': $scope.employee.userPosition,
            'LOGON_TIMESTAMP': $scope.employee.logonTimeStamp
        };

        var url = urlBuilder('ui/PayrollPolicy/PayrollSchedule.htm', $scope.params);

        expect(url).toEqual('ui/PayrollPolicy/PayrollSchedule.htm?LOGON_TIMESTAMP=08%2F14%2F2015%2006%3A19%3A45&USERID=2253271&USER_COMPANY=001&USER_POSITION=2253271');

    });

});
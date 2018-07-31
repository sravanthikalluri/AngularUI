/**
 * Created by SEEMA on 10/12/2015.
 */

describe('Date Picker Controller Testing', function () {

    var $rootScope,
        $scope;
    var $compile,$body = $('body');

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('datePickerCtrl', {$scope: $scope});
            $compile = $injector.get('$compile');
        });
    });


    describe('today function testing', function () {

        it('today is defined', function () {
            expect($scope.today).toBeDefined();
        });

        it('today function call', function () {
            $scope.today();
        });

    });


    it('clear is defined', function () {

        expect($scope.clear).toBeDefined();
    });

    it('disabled is defined', function () {

        expect($scope.disabled).toBeDefined();
    });

    it('maxDate is defined', function () {

        expect($scope.maxDate).toBeDefined();
    });

    it('toggleMin is defined', function () {

        expect($scope.toggleMin).toBeDefined();
    });

    it('toggleMax is defined', function () {

        expect($scope.toggleMax).toBeDefined();
    });

    it('getDayClass is defined', function () {

        expect($scope.getDayClass).toBeDefined();
    });

    it('selectedValueIs is defined', function () {

        expect($scope.selectedValueIs).toBeDefined();
    });

    it('runCustStmt is defined', function () {

        expect($scope.runCustStmt).toBeDefined();
    });

    it('when clear method is called', function () {
        $scope.clear();
        $scope.effectiveDate = null;
        expect($scope.effectiveDate).toBe(null);
    });

    it('when disabled method is called for sunday as date', function () {
        var date = new Date('October 18, 2015 23:15:30');
        var mode = 'day';
        expect($scope.disabled(date, mode)).toBe(true);
    });

    it('when disabled method is called for other than sunday or saturday as date', function () {
        var date = new Date('October 19, 2015 23:15:30');
        var mode = 'day';
        expect($scope.disabled(date, mode)).toBe(false);
    });

    it('when open method is called', function () {
        var event = jQuery.Event('open');
        $scope.open(event);
        event.preventDefault();
        event.stopPropagation();
        expect($scope.opened).toBe(true);
    });

    it('dateOptions', function () {
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        expect($scope.dateOptions.formatYear).toEqual('yy');
        expect($scope.dateOptions.startingDay).toEqual(1);
    });

    it('when dateRange method is called', function () {
        var event = jQuery.Event('open');
        var which = which;
        $scope.dateRange(event, which);
        event.preventDefault();
        event.stopPropagation();
        expect($scope.datepicker[which]).toBe(true);
    });

    it('format and earning format', function () {
        $scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy',
            'yyyy/MM/dd', 'yyyy-MM-dd', 'dd.MM.yyyy',
            'shortDate'];
        expect($scope.format).toEqual($scope.formats[0]);
        expect($scope.earnignformat).toEqual($scope.formats[3]);
    });

    it('when getDayClass method is called', function () {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];
        expect($scope.getDayClass(afterTomorrow, 'day')).toEqual('partially');
        expect($scope.getDayClass(tomorrow, 'day')).toEqual('full');
        expect($scope.getDayClass(tomorrow, 'evening')).toEqual('');
    });

    it('when selectedValueIs method is called', function () {
        $scope.selectedValueIs();
        expect($scope.effectiveDate).toBe(null);
        expect($scope.effectiveSecDate).toBe(null);
    });

    it('when runCustStmt method is called', function () {
        $rootScope.runCustStmt();
        expect($scope.chooseOption).toEqual({name: 'Date Range', value: 'date'});
    });

    describe('checkErrorClass function testing',function(){
        it('checkErrorClass is defined',function(){
            expect($scope.checkErrorClass).toBeDefined();
        });

        it('checkErrorClass function call',function(){
            var name = "error";
            var html = '< type="text" name="error" class="error-warning" />';
            var element = $compile(html)($scope);
                          $body.append(element);
                          $rootScope.$digest();
            $scope.checkErrorClass(name);
        });
    });

    describe('checkDateSixtyDates function testing',function(){
        it('checkDateSixtyDates is defined',function(){
            expect($scope.checkDateSixtyDates).toBeDefined();
        });

        it('checkDateSixtyDates function call with true',function(){
            var date = new Date('2016-10-22');
            $scope.checkDateSixtyDates(date);
        });

        it('checkDateSixtyDates function call with false',function(){
            var date = new Date();
            $scope.checkDateSixtyDates(date);
        });
    });

    describe('checkDateThirtyDates function testing',function(){
        it('checkDateThirtyDates is defined',function(){
            expect($scope.checkDateThirtyDates).toBeDefined();
        });

        it('checkDateThirtyDates function call with true',function(){
            var date = new Date('2016-05-22');
            $scope.checkDateThirtyDates(date);
        });

        it('checkDateThirtyDates function call with false',function(){
            var date = new Date();
            $scope.checkDateThirtyDates(date);
        });
    });

    afterEach(function(){
        $body.empty();
    });
});

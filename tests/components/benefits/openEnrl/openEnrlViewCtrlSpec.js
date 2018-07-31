/**
 * Created by Krishnam Raju on 4/14/2016.
 */
describe('Open Enrollment Controller Testing ', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {"data":{"enrollment":{"basPartic":null,"employee":null,"enrollmentDeadlineData":{"emplId":"00001606157","emplRcd":0,"enrollStatus":0,"schedId":null,"benefitRcd":null,"eventId":null,"benProgram":null,"eventClass":null,"eventDt":"1900-01-01","eventStatus":null,"covrgBeginDt":"1900-01-01","enrollBeginDt":"1900-01-01","enrollEndDt":"1900-01-01","planYearBeginDt":"1900-01-01","planYearEndDt":"1900-01-01","confirmId":null,"confirmDt":"1900-01-01","systemDefaultedElection":"N","currentDate":null},"curBenefits":{"currentBenefits":[],"dependentDetails":[]},"uidependents":null,"benefits":null,"options":null,"healthcosts":null,"lifecosts":null,"disabilitycosts":null,"stdWaiveLtdPlans":null,"fsacosts":null,"hsacosts":null,"cureeplans":null,"histeeplans":null,"histdpplans":null,"legends":null,"content":{"company":null,"effDt":null,"benefit_program":null,"company_name":null,"hq_state":null,"hq_country":null,"product_line":null,"company_hsa_contribution":null,"medical_waiver_credit":null,"t2_funding_optn":null,"cobra_eligible":false,"confirm_id":null,"confirm_dt":null,"dp_existence":false,"spouse_existence":false,"event_class":null,"supp_life_enrolled":false,"supp_life_flat_dollar":null,"med_waiver_credit":null,"event_class_descr":null,"timestamp":"2016-02-02T07:19:48+0000","disability_taxiable":false,"definition":null,"plan_comparison_den":"http://www.hrpassport.com/","plan_comparison_med":"http://www.hrpassport.com/","base_url":"http://www.hrpassport.com/","period_end_dt":null,"event_dt":null},"selections":null,"ages":null,"providers":null,"curLifeBenPlans":null,"uiErrorMsgs":null,"histexcreditplans":null,"countries":null,"states":null,"authoriaServer":null,"dualCoverage":null}},"_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};



    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('openEnrlViewCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'current-benefits').respond(200,response);
        $httpBackend.flush();


    });

    describe('openEnrollWindow function testing',function(){
        it('openEnrollWindow is defined',function(){
            expect($scope.openEnrollWindow).toBeDefined();
        });

        it('openEnrollWindow function call',function(){
            $scope.openEnrollWindow();
        });
    });
});

//    describe('sso Directive Tests', function () {
//        var rootScope,
//            scope,
//            compile,
//            element,
//            elmentHtml = '<ssowidget url-params={"employeeId":"00001000483","companyId":"31T","ssoId":"askbenefits"}> </ssowidget>',
//            $parse,
//            postResponse = '{"data": {"ssoId": "askbenefits","ssoName": "Ask Benefits",'+
//            '"postParams": "username=000010004840&password=trinet&command=showpage",'+
//            '"ssoServerURL": "https://askbenefitsqeb.hrpassport.com/profile_trinet_51/'+
//            'cgi-bin/athiis.dll","httpMethod": "POST"},"_requestId": "76266","_statusCode":'+
//            '"200","_statusText": "OK","_statusMessage": "Success"}',
//            
////            className = "'spinner-loader'",
//            
////            ssoTemplateView = '<div layout="row" layout-xs="column" layout-align="center center" > <alert-view></alert-view> <div ng-class="{'+className+': spinnerClass}"></div> {{postUrl}} <form method="POST" action="" class="ssopost" novalidate> <P data-ng-repeat="param in postParams"> <input type="text" name="{{param.name}}" value="{{param.value}}"></P> </form></div>',
//            $httpBackend,
//            controller,
//            scope1;
//
//
//        beforeEach(function () {
//            module('TrinetPassport');
//
//            inject(function ($compile, $rootScope, $httpBackend) {
//                //$httpBackend = $injector.get('$httpBackend');
////$httpBackend.whenGET('app/shared/directives/sso/ssoTemplateView.html').respond(200, ssoTemplateView);
//                $httpBackend.whenGET('app/shared/views/alertView.html').respond(200,{});
//                $httpBackend.whenGET('app/components/dashboard/dashboardView.html').respond(200,{});
//                $httpBackend.whenGET("/api-sso/v1/31T/00001000483/sso-artifacts/askbenefits")
//                .respond(200, postResponse);
//                
//                //$rootScope = $injector.get('$rootScope');
//                $scope = $rootScope.$new();
//                rootScope = $rootScope;
//                scope = $scope;
//                element = angular.element(elmentHtml);
//                //$compile = $injector.get('$compile');
//                
//                $compile(element)($scope);
//                $rootScope.$digest();
//
//                controller = element.controller("ssowidget");
//                scope1 = element.isolateScope() || element.scope();
//
//            });
//        });
//
//        it("should create the Form with Post Data", function () {
//            
//            expect(scope1.spinnerClass).toBeDefined();
//            scope1.processServerResponse(angular.fromJson(postResponse),"resourceURL");
//            scope.$digest();
//            console.log(element);
//            
//             expect(element.find('input[name="username"]').length).toBe(1);
//            
//            //$scope.processServerResponse("","resourceURL");
//            
//            //var form = element.find('form.ssopost');
//            //expect(form.length).toBe(1);
//            //expect($scope).toBeDefined();
//            //$scope.processServerResponse(angular.fromJson(postResponse),"resourceURL");
////            $$scope.$digest();
//            
//            //console.log(element);
//           
//            
//        });
//
//    });
//

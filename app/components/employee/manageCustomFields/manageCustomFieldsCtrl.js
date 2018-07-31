/**
 * Created by Nikitha Jayam on 09-05-2017.
 */
'use strict';
trinetApp.controller('manageCustomFieldsCtrl',['$scope', 'gso','$routeParams','$http','$timeout','$location','$filter','$rootScope', '$route','$stateParams','SharedDataService',
    function($scope, gso, $routeParams,$http, $timeout, $location, $filter,$rootScope,$route,$stateParams,SharedDataService) {

        $scope.saveAndAdd = false;
        $rootScope.fileValue = true;
        $scope.customFieldsShow = false;
        $scope.save = false;
        $scope.customData = false;
        $scope.customSave = true;
        $scope.saveUpdate = false;
        $scope.invalid = true;
        $scope.delete_success_message = false;
        $scope.edit_success_message=false;
        $scope.success_message = false;
        $scope.editData = false;
        $scope.editMode = true;
        $scope.editLabelConf = false;
        $scope.editAnswerChoicesConf = false;
        $scope.editTypeLabelConf = false;
        $scope.editTypeConf = false;
        $scope.isLabelChange = false;
        $scope.isFieldChange = false;
        $scope.div1 = false;
        $scope.editShow = false;
        $scope.maxLength = 250;
        $scope.contentChange = 0;
        $scope.items = [];
        $scope.removedChoice='';
        $scope.itemslength = 0;
        $scope.checkLabel=false;
        $scope.checkType=false;
        $scope.checkAnswerChoices=false;
        $scope.initial=true;
        $scope.befSubmit=true;
        $scope.csaShow=false;
        $scope.manageEditCancel = false;
        $scope.manageEditCancelShow = false;
        $scope.editCancel = false;
        $scope.delConf = false;
        $scope.duplicate_label=false;
        $scope.EmployeeStatus = false;
        $rootScope.BulkUploadSection = false;
        $rootScope.progressPopup = false;
        $rootScope.importFile= false;
        $scope.format = "DD/MM/YYYY";
        $scope.manage_save_success_message=false;
        $scope.manage_update_success_message=false;
        $scope.savePage = true;
        $scope.isAnswered = false;
        $scope.customUpdate = false;
        $scope.items = [];
        $scope.fileResponse = $rootScope.fileResponse;
        $scope.payloadObj=[];
        $scope.company = gso.getAppConfig().companyId;
        $scope.isPassportUser = $stateParams.isPassport;
        $scope.csaUser = false;
        SharedDataService.getAppSharedData().selectedCompany = gso.getAppConfig().companyId;

        // To fetch the Companies for CSA User's
        $scope.getCompaniesForCSAUsers = function(){
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + $scope.company + "/" + manageEmpUrlConfig.resources.customFields ,null,
                function (response) {
                    $scope.companies= response;
                }
            );

        };

        $scope.goToManageCustomFields = function(cid) {
            if(angular.isUndefined(cid)){
                $scope.errorAlert = '';
                var data = {
                    _statusMessage: 'Please select any one company',
                    _statusCode: '400'
                };
                $scope.childParentAlertMsg(data);
                return;
            }else{
                $scope.company=cid;
                $scope.init();
                $scope.csaUser = false;
            }
        };

        $scope.init = function() {
            if(gso.getAppConfig().companyId !==''){
                gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                    manageEmpUrlConfig.resources.employee + "/" + $scope.company + "/" + $scope.employeeID + "/" + manageEmpUrlConfig.resources.customFields, null,
                    function (response) {
                        angular.forEach(response, function (item) {
                            if (item.fieldType === 'date') {
                                item.status = true;
                                if ($scope.customType === "custom") {
                                    $scope.emplid = '';
                                    $scope.success_message = false;
                                    $scope.import_success_message=false;
                                    $scope.edit_success_message=false;
                                    $scope.delete_success_message=false;
                                    if(item.fieldAnswer === ''){
                                    } else {
                                        $scope.editMode = false;
                                        $scope.editData = true;
                                    }
                                }
                                if(item.fieldAnswer !== null && item.fieldType === 'date'){
                                    $scope.newDate = new Date(item.fieldAnswer);
                                    item.fieldAnswer = filterDate($scope.newDate, 'yyyy-MM-dd');
                                }
                            } else {
                                if ($scope.customType === "custom") {
                                    if(item.fieldAnswer === ''){
                                    } else {
                                        $scope.editMode = false;
                                        $scope.editData = true;
                                    }
                                }
                            }
                        });
                        $scope.items = response;
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].fieldAnswer) {
                                $scope.showSave = true;
                                $scope.savePage = false;
                                break;
                            }
                        }
                        if($scope.items.length === 0){
                            $scope.EmployeeStatus = true;
                        }
                        if ($scope.customType === "custom") {
                            $scope.items.map(function (obj) {
                                if (obj.answerChoices !== '') {
                                    obj.answerChoices = JSON.parse(obj.answerChoices);
                                }
                            });
                        }
                        $scope.itemslength = $scope.items.length;
                    }
                );
            } else {
                $scope.csaShow=true;
            }
        };

        $scope.getCustomFieldsValue = function() {
            if ($scope.isPassportUser === 'true') {
                $scope.csaUser = true;
                $scope.preferece.topWindow = true;
                $scope.getCompaniesForCSAUsers();
            }else if($scope.isPassportUser === 'false'){
                $scope.preferece.topWindow = true;
                $scope.company = $stateParams.companyID;
                SharedDataService.getAppSharedData().selectedCompany = $stateParams.companyID;
                $scope.init();
            }
            if (gso.getRouteParams().selectedTab === "customFields" && angular.isUndefined($scope.isPassportUser)) {
                $scope.preferece.topWindow = false;
                $scope.customType = "custom";
                $scope.employeeID = $scope.appUserId;
                $scope.csaUser = false;
                $scope.init();
            }else{
            	if($scope.isPassportUser === 'false'){
            		$scope.preferece.topWindow = true;
            	} else {
            		$scope.preferece.topWindow = false;
            	}
                $scope.employeeID = gso.getAppConfig().userId;
                $scope.customType = "manage";
                $scope.init();
            }
        };

        $scope.getCustomFieldsValue();

        $scope.customCancelButton = function() {
            $scope.savePage=false;
            $scope.showSave =false;
            var content = $scope.contentChange;
            if(content === 1)
            {
                $scope.savePage=true;
                gso.getNGDialog().open({
                    templateUrl: "app/shared/views/customFieldsView.html",
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: false,
                    className: 'tn-confirm-delete'
                });
                $scope.contentChange = 0;
            } else {
                $scope.customFieldsShow = false;
                $scope.editPage = true;
                $scope.apply;
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].fieldAnswer) {
                        $scope.showSave = true;
                        $scope.savePage = false;
                        break;
                    }
                }
                $scope.editData = true;
            }
        };

	     $scope.childParentAlertMsg = function (data) {
		     if(data && data._statusCode  && data._statusCode !== '404'){
		     $scope.errorAlert = data;
		     }else{
		     $scope.noRecordsAlert = data;
		     }

	     };

	     $scope.closeAlert = function () {
	         $scope.errorAlert = null;
	     };

        $scope.textBoxChange = function(value) {
            $scope.fieldLabel = value;
            $scope.selectedIndex = 1;
            if(value === undefined || value === ""){
                $scope.initial=true;
            } else {
                $scope.initial=false;
            }
        };

        $scope.manageEditPage = function() {
            $scope.editPage = false;
            $scope.savePage=true;
            $scope.contentChange = 0;
            $scope.customFieldsShow = true;
            $scope.showSave = false;
        };

        $scope.discardChanges = function() {
            gso.getNGDialog().closeAll();
            $scope.manageEditCancel = false;
            $scope.apply;
            $scope.init();
            $scope.editData = true;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].fieldAnswer) {
                    $scope.showSave = true;
                    $scope.savePage = false;
                    break;
                }
            }
        };

        $scope.manageCancelRevert = function() {
            gso.getNGDialog().closeAll();
            $scope.editPage = false;
            $scope.savePage=true;
            $scope.manageEditCancel = false;
            $scope.contentChange = 1;
            $scope.editData = false;
            $scope.befSubmit=false;
        };

        $scope.addBulkUpload = function() {
            gso.getNGDialog().open({
                templateUrl: "app/shared/views/uploadCustomFields.html",
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                showClose: false,
                className: 'tn-confirm-delete'
            });
            setTimeout(function () {
                var input = document.getElementById('file_id');
                input.onclick = function () {
                    this.value = null;
                };
                input.onchange = function () {
                    $scope.BulkUploadSection = false;
                    $rootScope.progressPopup = !$rootScope.progressPopup;
                    gso.getNGDialog().open({
                        templateUrl: "app/shared/views/uploadFilePopup.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: false,
                        className: 'tn-confirm-delete'
                    });

                    $scope.$broadcast('uploadFile');
                };
            }, 1000);
        };

        $scope.addCutomField = function() {
            $scope.saveAndCreateAlert = [];
            gso.getNGDialog().open({
                templateUrl: "app/shared/views/addCustomField.html",
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                showClose: false,
                className: 'ngdialog-theme-default  tn-confirm-manageCustom-delete'
            });
            $scope.isAnswerDropdown = false;
            $scope.selectedIndex = undefined;
            $scope.closemessage();
            $scope.div1 = true;
            $scope.saveAndAdd = true;
            $scope.save = true;
            $scope.saveUpdate =false;
        };

        $scope.fieldTypeChange = function(value) {
            $scope.answerChoice = '';
            $scope.isAnswerText = false;
            $scope.isAnswerDropdown = false;
            $scope.editShow = true;
            $scope.fieldTypes = value;
            var label = $scope.fieldLabel;
            var type = $scope.fieldTypes;
            if(label !== undefined && label !== ''){
                $scope.initial=false;
                $scope.selectedIndex = 1;
            }
            if (type === 'currency' || type === 'number') {
                $scope.inputType = 'number';
            } else if (type === 'date') {
                $scope.inputType = 'date';
            } else if (type === 'text' || type === 'note'){
                $scope.inputType = 'text';
            } else{
                $scope.editShow = false;
                $scope.initial=true;
            }
        };

        $scope.textBoxChange = function(value) {
            $scope.fieldLabel = value;
            $scope.selectedIndex = 1;
            if(value === undefined || value === ""){
                $scope.initial=true;
            } else {
                $scope.initial=false;
            }
        };

        $scope.changeAnswerChoice = function (answerChoice) {
            $scope.isAnswerDropdown = false;
            $scope.answerChoice = answerChoice;
            $scope.answerChoicesList = [{}];
            if(answerChoice === 'freetext'){
                $scope.isAnswerText = true;
                $scope.isAnswerDropdown = false;
            } else if (answerChoice === 'dropdown'){
                $scope.isAnswerDropdown = true;
                $scope.isAnswerText = false;
            } else {
                $scope.isAnswerText = true;
                $scope.isAnswerDropdown = false;
            }
        };

        $scope.answers = {};
        $scope.answerChoicesList = [{}];
        $scope.answerChoicesList.map(function (obj, index) {
            obj.name = 'answerChoice' + index;
            obj.modelName = 'answerChoice' + index;
        });

        $scope.addNewAnswer = function () {
            $scope.answerChoicesList.push({
                name: 'answerChoice' + $scope.answerChoicesList.length,
                modelName: ''
            });
        };

        $scope.removeAnswer = function (item, index) {
            $scope.answerChoicesList.splice(index, 1);
        };

        $scope.cancelButton = function(value) {
            $scope.apply;
            $scope.editShow = false;
            $scope.saveUpdate = false;
            $scope.saveAndAdd = true;
            $scope.save = true;
            $scope.fieldTypes = "";
            $scope.fieldLabel = "";
            gso.getNGDialog().closeAll();
        };

        $scope.saveAndAddAnother = function() {
            var answerChoice = $scope.answerChoice;
            if(answerChoice === 'dropdown'){
                $scope.convertAnswerChoicesToJson();
            } else {
                $scope.answers = '';
            }
            $scope.initial=true;
            var fieldType = $scope.fieldTypes;
            var fieldLabel = $scope.fieldLabel;
            if(fieldType !== undefined && fieldLabel !== undefined){
                $scope.editData = true;
            }
            $scope.data = [ {companyId: $scope.company, fType: fieldType, fLabel: fieldLabel, answerChoices:$scope.answers} ];
            var data = $scope.data;
            $scope.errorAlert = '';

            gso.getCrudService().execute(constants.post, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.manageCompany + "/" + $scope.company + "/" + manageEmpUrlConfig.resources.customFields, data,
                function (response) {
                    if(response === 'FAILURE'){
                        var data = {
                            _statusMessage: 'This field label already exists. Please enter a new label.',
                            _statusCode: '400'
                        };
                        $scope.childParentAlertMsg(data);
                    } else {
                        $scope.init();
                        $scope.cancelButton();
                        gso.getNGDialog().closeAll();
                        gso.getNGDialog().open({
                            templateUrl: "app/shared/views/addCustomField.html",
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false,
                            showClose: false,
                            className: 'ngdialog-theme-default tn-confirm-manageCustom-delete'
                        });

                    }

                    $scope.isAnswerDropdown = false;
                    $scope.answerChoicesList = [];
                    $scope.init();
                    $scope.saveAndCreateAlert = {
                        _statusMessage: 'Custom field successfully created.',
                        _statusCode: '200'
                    };
                });
        };

        $scope.convertAnswerChoicesToJson = function (){

            var answer=$scope.answerChoicesList;
            var quote='"';
            var json="[";
            var value="answerChoice";
            var name="name";
            var modelName="modelName";
            var last=Object.keys(answer).length;
            var count=0;

            for (var x in answer) {
                if (x) {
                    json += "{" + quote + name + quote + ":" + quote + value + count + quote + "," + quote + modelName + quote + ":" + quote + answer[x].modelName + quote + "}";
                    count++;
                    if (count < last) {
                        json += ",";
                    }
                }
            }
            json+="]";
            $scope.answers = json;
        };

        $scope.saveButton = function() {
            var answerChoice = $scope.answerChoice;
            if(answerChoice === 'dropdown'){
                $scope.convertAnswerChoicesToJson();
            } else {
                $scope.answers = '';
            }
            $scope.duplicate_label=false;
            $scope.initial=true;
            var fieldType = $scope.fieldTypes;
            var fieldLabel = $scope.fieldLabel;
            if(fieldType !== undefined && fieldLabel !== undefined){
                $scope.editData = true;
            }
            $scope.data = [ {companyId: $scope.company, fType: fieldType, fLabel: fieldLabel, answerChoices:$scope.answers} ];
            var data = $scope.data;
            $scope.errorAlert = '';

            gso.getCrudService().execute(constants.post, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.manageCompany +
                "/" + $scope.company + "/" + manageEmpUrlConfig.resources.customFields, data,
                function (response) {
                    if(response === 'FAILURE'){
                        var data = {
                            _statusMessage: 'This field label already exists. Please enter a new label.',
                            _statusCode: '400'
                        };
                        $scope.childParentAlertMsg(data);
                    } else{
                        gso.getNGDialog().closeAll();
                        $scope.init();
                        $scope.cancelButton();
                        var data = {
                            _statusMessage: 'Custom field successfully created.',
                            _statusCode: '200'
                        };
                        $scope.childParentAlertMsg(data);
                    }
                });
        };

        $scope.closemessage = function() {
            $scope.duplicate_label=false;
            $rootScope.importFile = false;
            gso.getNGDialog().closeAll();
        };


        $scope.editCustomField = function() {
            var oldType = $scope.typeValue;
            var oldAnswerChoices = $scope.oldAnswers;
            var answers = $scope.answerChoicesList;
            var answerChoice = $scope.answerChoice;
            $scope.checkAnswerChoices = false;
            $scope.temp = $scope.answerUrl+$scope.cid;
            $scope.isCustomChangeAnsweredForEdit();
            var removedChoice='';
            if((answers !== null || answers.length > 0) && (answerChoice === 'dropdown')){
                $scope.convertAnswerChoicesToJson();
                var newAnswerChoices=$scope.answerChoicesList;
                var oldAnswerChoices = 0;
                if($scope.oldAnswers !== null){
                    oldAnswerChoices=$scope.oldAnswers;
                }
                var oldChoices = angular.fromJson(oldAnswerChoices);
                var answer = angular.equals(newAnswerChoices, oldAnswerChoices);
                var count = 0;
                for (var x in oldChoices) {
                    if (x) {
                        var equal = 0;
                        var oldChoice = oldChoices[x].modelName;
                        for (var y in newAnswerChoices) {
                            if(y) {
                                var newChoice = newAnswerChoices[y].modelName;
                                if (oldChoice === newChoice) {
                                    count = count + 1;
                                    equal = equal + 1;
                                }
                            }
                        }
                        if (equal === 0 && $scope.oldAnswers !== null) {
                            removedChoice = removedChoice + oldChoice + ',';
                        }
                    }
                }
                if(count === oldChoices.length){
                    $scope.checkAnswerChoices = true;
                } else {
                    $scope.checkAnswerChoices  = false;
                }
                $scope.removedChoice = removedChoice;
            } else {
                $scope.answers = '';
            }
            var oldLabel = $scope.labelValue;
            var ftype = $scope.fieldTypes;
            var flabel = $scope.fieldLabel;
            var fanswer = $scope.isAnswered;
            $scope.fieldTypes = ftype;
            $scope.fieldLabel = flabel;
            $scope.cidValue = $scope.cidValue;
            $scope.companyValue = $scope.companyValue;
            $scope.checkLabel = angular.equals(oldLabel, flabel);
            $scope.checkType = angular.equals(oldType, ftype);
            if(!$scope.checkLabel && !$scope.checkType && fanswer !== false){
                $scope.isFieldChange = true;
                $scope.isLabelChange =true;
                $scope.div1 = false;
                $scope.apply;
                $scope.saveAndAdd = false;
                $scope.save = false;
                $scope.editTypeLabelConf = true;
                $scope.answerValue = '';
            } else if(!$scope.checkLabel && fanswer !== false){
                $scope.isLabelChange = true;
                $scope.isFieldChange = false;
                $scope.div1 = false;
                $scope.apply;
                $scope.saveAndAdd = false;
                $scope.save = false;
                $scope.editLabelConf = true;
                $scope.answerValue = '';
            } else if(!$scope.checkType && fanswer !== false) {
                $scope.isFieldChange =true;
                $scope.isLabelChange=false;
                $scope.div1 = false;
                $scope.apply;
                $scope.saveAndAdd = false;
                $scope.save = false;
                $scope.editTypeConf = true;
                $scope.answerValue = '';
            } else if(!$scope.checkAnswerChoices && fanswer !== false) {
                $scope.isLabelChange=false;
                $scope.div1 = false;
                $scope.apply;
                $scope.saveAndAdd = false;
                $scope.save = false;
                $scope.editAnswerChoicesConf = true;
                $scope.answerValue = '';
            } else {
                $scope.isFieldChange = false;
                if(!$scope.checkLabel){
                    $scope.isLabelChange = true;
                }
                if(!$scope.checkType){
                    $scope.isFieldChange = true;
                }
                $scope.editTypeConf = false;
                $scope.editLabelConf = false;
                $scope.editAnswerChoicesConf = false;
                $scope.answerValue = '';
                $scope.saveUpdateButton();
            }
            if($scope.isAnswered === true){
                if($scope.isLabelChange && $scope.isFieldChange){
                    gso.getNGDialog().open({
                        templateUrl: "app/shared/views/labelTypeChangePopUp.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                } else if($scope.isLabelChange){
                    gso.getNGDialog().open({
                        templateUrl: "app/shared/views/labelChangePopUp.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                } else if($scope.isFieldChange){
                    gso.getNGDialog().open({
                        templateUrl: "app/shared/views/fieldChangePopUp.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                }else if ($scope.editAnswerChoicesConf){
                    gso.getNGDialog().open({
                        templateUrl: "app/shared/views/answerChoiceChangePopUp.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                }
            }
        };

        $scope.manageTextBoxChange = function(value) {
            $scope.contentChange = 1;
            $scope.befSubmit=false;
            if(value ===0){
                value = 0.00;
            }
        };

        $scope.saveUpdateButton = function() {
            var answers = $scope.answerChoicesList;
            var answerChoice = $scope.answerChoice;
            if((answers !== null || answers.length > 0) && (answerChoice === 'dropdown')){
                $scope.convertAnswerChoicesToJson();
            } else {
                $scope.answers='';
            }
            $scope.editLabelConf = false;
            $scope.editTypeConf = false;
            $scope.editTypeLabelConf = false;
            $scope.editAnswerChoicesConf = false;
            $scope.div1 = false;
            $scope.saveAndAdd = false;
            $scope.save = false;
            var ftype = $scope.fieldTypes;
            var flabel = $scope.fieldLabel;
            var cid = $scope.cidValue;
            var isLabelChange = $scope.isLabelChange;
            var isFieldChange = $scope.isFieldChange;
            $scope.errorAlert = '';

            gso.getCrudService().execute(constants.put, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.manageCompany +
                "/" + $scope.company + "/" + manageEmpUrlConfig.resources.customFields + "/" + cid + '/?fType=' + ftype +
                '&fLabel=' + flabel + '&cid=' + cid  +'&isLabelChange='+isLabelChange +
                '&isFieldChange='+isFieldChange +'&answers='+$scope.answers+'&removedChoice='+$scope.removedChoice , null,
                function (response) {
                    gso.getNGDialog().closeAll();
                    var data = {
                        _statusMessage: 'Custom field successfully Updated.',
                        _statusCode: '200'
                    };
                    $scope.childParentAlertMsg(data);
                    $scope.init();
                }
            );
        };

        $scope.deleteRecord = function(cid) {
            $scope.cid = cid;
            $scope.isCustomChangeAnswered();
        };

        $scope.editCustomRecord = function(cid, ftype, flabel, company, fanswer, answerChoices) {
            $scope.cid = cid;
            $scope.temp = $scope.answerUrl+cid;
            $scope.isCustomChangeAnsweredForEdit();
            $scope.selectedIndex = undefined;
            $scope.cidValue = cid;
            $scope.typeValue = ftype;
            $scope.labelValue = flabel;
            $scope.oldAnswers = answerChoices;
            $scope.companyValue = company;
            $scope.answerValue = fanswer;
            $scope.saveAndCreateAlert = null;

            if(answerChoices !== null && answerChoices.length > 0){
                $scope.answerChoice = 'dropdown';
                $scope.isAnswerDropdown = true;
                var myObj = JSON.parse(answerChoices);
                $scope.Length = myObj.length;
                $scope.answerChoicesList = myObj;

            } else {
                $scope.isAnswerDropdown = false;
                $scope.answerChoice = 'freetext';
                $scope.answerChoicesList = '';
            }

            $scope.saveUpdate = true;
            $scope.fieldTypes = ftype;
            $scope.fieldLabel = flabel;
            $scope.saveAndAdd = false;
            $scope.save = false;
            $scope.saveUpdate = true;
            $scope.editShow = true;
            gso.getNGDialog().open({
                templateUrl: "app/shared/views/addCustomField.html",
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                showClose: false,
                className: 'ngdialog-theme-default tn-confirm-manageCustom-delete'
            });
            window.scrollTo(0, top);
        };

        $scope.okDelete = function(){
            gso.getNGDialog().closeAll();
            $scope.deleteCustomRecord($scope.cidValue);
        };

        $scope.deleteCustomRecord = function(cid) {
            $scope.errorAlert = '';
            gso.getCrudService().execute(constants.remove,  companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +  companyUrlConfig.resources.manageCompany +
                "/" + $scope.company + "/" + manageEmpUrlConfig.resources.customFields +  "/" + cid , null,
                function (response) {
                    var data = {
                        _statusMessage: 'Custom field successfully deleted.',
                        _statusCode: '200'
                    };
                    $scope.childParentAlertMsg(data);
                    $scope.init();
                }
            );
        };

        $scope.isCustomChangeAnswered = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" +manageEmpUrlConfig.resources.customFields + "/" + $scope.cid + "/" + manageEmpUrlConfig.resources.isCustomChangeAnswered, null,
                function (response) {
                    if(response){
                        gso.getNGDialog().open({
                            templateUrl: "app/shared/views/deleteManageCutomField.html",
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false
                        });
                    } else {
                        gso.getNGDialog().open({
                            templateUrl: "app/shared/views/deleteFirstManageField.html",
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false
                        });
                    }
                    $scope.cidValue = $scope.cid;
                    $scope.closemessage();
                }
            );
        };

        $scope.isCustomChangeAnsweredForEdit = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId +  "/" +manageEmpUrlConfig.resources.customFields + "/" + $scope.cid + "/" + manageEmpUrlConfig.resources.isCustomChangeAnswered, null,
                function (response) {
                    if(response){
                        $scope.isAnswered = true;
                    } else {
                        $scope.isAnswered = false;
                    }
                    $scope.cidValue = $scope.cid;
                }
            );
        };

        $scope.cancelUpdateLabel = function() {
            gso.getNGDialog().closeAll();
        };

        $scope.cancelDelConfWithData = function() {
            gso.getNGDialog().closeAll();
        };

        function filterDate(date, format) {
            return $filter('date')(date, format);
        }

        $scope.updateContent = function(items) {
            $scope.customFieldsShow = false;
            $scope.contentChange = 0;
            $scope.apply;
            angular.forEach(items, function (item) {
                if(item.answerChoices != null) {
                    $scope.answerChoicesList = item.answerChoices;
                    $scope.convertAnswerChoicesToJson();
                    item.answerChoices = $scope.answers;
                }
                if (item.fieldType ==='date') {
                    item.fieldAnswer = filterDate(item.fieldAnswer, 'yyyy-MM-dd');
                }
                if (item.fieldType !=='text') {
                    item.answerChoices = null;
                }
            });
            $scope.items = items;
            angular.forEach(items,function (value) {
                var customFieldsData;
                customFieldsData = {
                    "fieldId":  value.cid,
                    "fieldValue": value.fieldAnswer
                };
                $scope.payloadObj.push(customFieldsData);
            });
            $scope.errorAlert = '';

            gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/"+ $scope.appUserId + "/" + manageEmpUrlConfig.resources.customFields , $scope.payloadObj,
                function (response) {
                    var data = {
                        _statusMessage: 'Custom field successfully Updated.',
                        _statusCode: '200'
                    };
                    $scope.childParentAlertMsg(data);
                    var isUpdate = $scope.customUpdate;
                    $scope.init();
                    $timeout( function(){
                        $scope.manage_save_success_message=false;
                        $scope.manage_update_success_message=false;
                    }, 20000);
                    $scope.editData = true;
                    $scope.customFieldsShow = false;
                    $scope.apply;
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].fieldAnswer) {
                            $scope.showSave = true;
                            $scope.savePage = false;
                            break;
                        }
                    }
                }
            );
        };
    }]);

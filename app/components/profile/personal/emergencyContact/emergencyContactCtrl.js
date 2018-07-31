/**
 Description: This is controller used to fetch/delete emergency details of employee
 Author:Seema
 **/
'use strict';
trinetApp.controller('emergencyContactCtrl', ['$scope', 'genericService', 'gso', '$routeParams', '$timeout','SharedDataService', function ($scope, genericService, gso, $routeParams, $timeout,SharedDataService) {
        $scope.isEmergencyContactFormSubmitted = false;
        $scope.createEmergencyContact = {};
        $scope.isEditEmergencyContact = false;
        if (SharedDataService.getAppSharedData().countryCode === 'US') {
            $scope.isUSCountry = true;
        } else if (SharedDataService.getAppSharedData().countryCode === 'CA') {
            $scope.isCACountry = true;
        }
        var appUserId = $scope.appUserId,
            companyId = gso.getAppConfig().companyId;

        var getEmergencyContacts = function () {
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                companyId + '/' + appUserId + profileUrlConfig.resources.emergencyContact, null, function (emergencyContactData) {
                $scope.emergencyContactData = emergencyContactData;
                angular.forEach($scope.emergencyContactData, function (input) {
                    if (input.telephoneNumbers.telephoneNumber1 && input.telephoneNumbers.telephoneNumber1.indexOf('-') === -1) {
                        input.telephoneNumbers.telephoneNumber1 = gso.getUtilService().changePhoneFormat(input.telephoneNumbers.telephoneNumber1);
                    }
                });
            }, function (data) {
                $scope.isCreateVisible = false;
                $scope.emergencyContactsSection = true;
                $scope.childParentAlertMsg(data);
            });
        };

        var getRelationShips = function () {
            gso.getAPIConfigDataService().getRelationShips().then(function (response) {
                $scope.relationShipsData = response;
                angular.forEach(response, function (key) {
                    angular.forEach($scope.emergencyContactData, function (input) {
                        if (key.key === input.designeeRelation) {
                            input.designeeRelation = key;
                        }
                    });
                });
            });
        };

        var states = function (country) {
            if (typeof country === 'object') {
                genericService.states(country.key).then(function (data) {
                    $scope.statesData = data.data.data;
                });
            } else {
                genericService.states(country).then(function (data) {
                    $scope.statesData = data.data.data;
                });
            }

        };

        var countries = function () {
            gso.getAPIConfigDataService().getCountries().then(function (response) {
                $scope.countriesData = response;
                states($scope.countriesData[0]);
            });
        };

        $scope.init = function () {
            getEmergencyContacts();
            getRelationShips();
            countries();
        };

        $scope.init();

        $scope.addNewEmergencyContact = function () {
            $scope.createEmergencyContact = {};
            $scope.isEmergencyContactFormSubmitted = false;
            $scope.isEditEmergencyContact = false;
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/personal/emergencyContact/emergencyModelView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            $scope.sameAsAddress = false;
            $scope.createEmergencyContact.star = false;
            $scope.checked = false;
            // $scope.emergencyContactsSection = false;
            $scope.notes='';
            if (!$scope.emergencyContactData) {
                $scope.createEmergencyContact.star = true;
            }

            if ($scope.emergencyContactData && $scope.emergencyContactData.length === 10) {
                var emergencyNotMoreAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: profile.emergencyContact.emergencyContactsMoreAlert
                };
                $scope.childParentAlertMsg(emergencyNotMoreAlert);
            }

            if ((SharedDataService.getAppSharedData().countryCode === 'US') || (SharedDataService.getAppSharedData().countryCode === 'CA')) {
                angular.forEach($scope.countriesData, function (obj) {
                    if (obj.key === SharedDataService.getAppSharedData().countryCode) {
                        $scope.createEmergencyContact.county = obj;
                        states(obj);
                        return;
                    }
                });
            }
        };

        $scope.saveData = function (formName) {
            $scope.isEmergencyContactFormSubmitted = true;
            if (!formName.$valid) {
                gso.getUtilService().focusInvalidElement('form#emergency_create_form');
                $scope.onFocus('emergencyCreate', $scope.validationPatterns.emergencyCreate.focus);
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
                $scope.childParentAlertMsg(customIdAlert);
                return;
            }
            var saveData = {};
            saveData.name = {};
            saveData.address = {};
            saveData.address.address1 = $scope.createEmergencyContact.address1;
            saveData.address.address2 = $scope.createEmergencyContact.address2 ? $scope.createEmergencyContact.address2 : null;
            saveData.address.address3 = $scope.createEmergencyContact.address3 ? $scope.createEmergencyContact.address3 : null;
            saveData.address.address4 = $scope.createEmergencyContact.address4 ? $scope.createEmergencyContact.address4 : null;
            saveData.address.city = $scope.createEmergencyContact.city;
            saveData.address.postalCode = $scope.createEmergencyContact.postalCode;
            saveData.telephoneNumbers = {};
            //saveData.address.county = $scope.createEmergencyContact.county.key;
            saveData.address.country = $scope.createEmergencyContact.county.key;
            saveData.address.state = $scope.createEmergencyContact.state.key;
            saveData.contactRelationship = $scope.createEmergencyContact.designeeRelation.key;
            saveData.samePhonePerson = "N";
            saveData.name.middleName = null;
            saveData.telephoneNumbers.telephoneNumber1 = $scope.createEmergencyContact.telephoneNumber1;
            saveData.telephoneNumbers.telephoneNumber2 = null;
            saveData.telephoneNumbers.telephoneNumber3 = null;
            saveData.telephoneNumbers.telephoneNumber4 = null;
            saveData.notes = $scope.createEmergencyContact.notes;
            if (!$scope.isEditEmergencyContact) {
                saveData.name.fullName = $scope.createEmergencyContact.contactName;
            } else {
                saveData.name.fullName = $scope.duplicateContact.name.fullName;
            }

            //saveData.name.lastName = $scope.createEmergencyContact.contactName;
            //saveData.name.firstName = $scope.createEmergencyContact.contactName;

            saveData.uniqueId = $scope.isEditEmergencyContact ? saveData.uniqueId : 1;
            saveData.employeeId = appUserId;
            saveData.sameAddressPerson = $scope.checked ? 'Y' : 'N';
            if ($scope.starFn("star", $scope.createEmergencyContact.star)) {
                saveData.primaryContactFlag = "Y";
            } else {
                saveData.primaryContactFlag = "N";
            }
            gso.getCrudService().execute($scope.isEditEmergencyContact ? constants.put : constants.post, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                companyId + '/' + appUserId + profileUrlConfig.resources.emergencyContact, saveData, function (response) {
                gso.getNGDialog().closeAll();
                SharedDataService.getAppSharedData().sMessage= JSON.stringify(response);

                gso.getUtilService().routeReloadTimeOut();

            }, function (data) {
                $scope.childParentAlertMsg(data);
            });

        };

        var setCountryStatus = function (country) {
            if (country === 'US') {
                $scope.isUSCountry = true;
                $scope.isCACountry = false;
            } else if (country === 'CA') {
                $scope.isCACountry = true;
                $scope.isUSCountry = false;
            }
        };

        var setCountryStates = function (input) {
            $scope.createEmergencyContact.county = input;
            genericService.states(input.key).then(function (data) {
                $scope.statesData = data.data.data;
                angular.forEach($scope.statesData, function (input) {
                    if (input.key === $scope.addressData.activeAddressList[0].state) {
                        $scope.createEmergencyContact.state = input;
                        return;
                    }
                });
            });
        };

        $scope.sameAsAddressFn = function (checked) {
            $scope.checked = checked;
            if (!checked) {
                if ($scope.isEditEmergencyContact) {
                    $scope.sameAsAddress = false;
                    $scope.createEmergencyContact = $scope.duplicateContact;
                    $scope.createEmergencyContact.address1 = $scope.duplicateContact.address.address1;
                    $scope.createEmergencyContact.address2 = $scope.duplicateContact.address.address2;
                    $scope.createEmergencyContact.address3 = $scope.duplicateContact.address.address3;
                    $scope.createEmergencyContact.address4 = $scope.duplicateContact.address.address4;
                    $scope.createEmergencyContact.city = $scope.duplicateContact.address.city;
                    $scope.createEmergencyContact.postalCode = $scope.duplicateContact.address.postalCode;
                    $scope.createEmergencyContact.contactName = $scope.duplicateContact.name.firstName ? $scope.duplicateContact.name.firstName : $scope.duplicateContact.name.fullName;
                    $scope.createEmergencyContact.telephoneNumber1 = $scope.duplicateContact.telephoneNumbers.telephoneNumber1;

                    if ($scope.duplicateContact.address.country !== null && typeof $scope.duplicateContact.address.country === 'object') {
                        setCountryStatus($scope.duplicateContact.address.country.key);
                    } else {
                        setCountryStatus($scope.duplicateContact.address.country);
                    }

                    angular.forEach($scope.countriesData, function (country) {
                        if (country.key === (($scope.duplicateContact.address.country !== null && typeof $scope.duplicateContact.address.country === 'object') ? $scope.duplicateContact.address.country.key : $scope.duplicateContact.address.country)) {
                            $scope.createEmergencyContact.county = country;
                            return;
                        }
                    });

                    if ($scope.duplicateContact.address.country !== null && typeof $scope.duplicateContact.address.country === 'object') {
                        genericService.states($scope.duplicateContact.address.country.key).then(function (data) {
                            $scope.statesData = data.data.data;
                            angular.forEach($scope.statesData, function (state) {
                                if (state.key === $scope.duplicateContact.address.state) {
                                    $scope.createEmergencyContact.state = state;
                                    return;
                                }
                            });
                        });
                    } else {
                        genericService.states($scope.duplicateContact.address.country).then(function (data) {
                            $scope.statesData = data.data.data;
                            angular.forEach($scope.statesData, function (state) {
                                if (state.key === $scope.duplicateContact.address.state) {
                                    $scope.createEmergencyContact.state = state;
                                    return;
                                }
                            });
                        });
                    }


                    angular.forEach($scope.relationShipsData, function (relation) {
                        if (relation.key === $scope.duplicateContact.contactRelationship) {
                            $scope.createEmergencyContact.designeeRelation = relation;
                            return;
                        }
                    });

                } else {
                    $scope.sameAsAddress = false;
                    $scope.createEmergencyContact.address1 = "";
                    $scope.createEmergencyContact.address2 = "";
                    $scope.createEmergencyContact.address3 = "";
                    $scope.createEmergencyContact.address4 = "";
                    $scope.createEmergencyContact.city = "";
                    $scope.createEmergencyContact.postalCode = "";
                    var emptyObject = [{"key": "", "value": ""}];
                    $scope.createEmergencyContact.county = emptyObject;
                    $scope.createEmergencyContact.state = emptyObject;
                    $scope.isUSCountry = true;
                    $scope.isCACountry = false;
                }
            } else {
                $scope.sameAsAddress = true;

                var length = $scope.addressData.activeAddressList.length;
                if (length !== 0) {
                    $scope.createEmergencyContact.address1 = $scope.addressData.activeAddressList[0].address1;
                    $scope.createEmergencyContact.address2 = $scope.addressData.activeAddressList[0].address2;
                    $scope.createEmergencyContact.address3 = $scope.addressData.activeAddressList[0].address3;
                    $scope.createEmergencyContact.address4 = $scope.addressData.activeAddressList[0].address4;
                    $scope.createEmergencyContact.city = $scope.addressData.activeAddressList[0].city;
                    $scope.createEmergencyContact.postalCode = $scope.addressData.activeAddressList[0].postalCode;

                    if ($scope.isEditEmergencyContact) {
                        $scope.createEmergencyContact.telephoneNumber1 = $scope.duplicateContact.telephoneNumbers.telephoneNumber1;
                        angular.forEach($scope.relationShipsData, function (relation) {
                            if (relation.key === $scope.duplicateContact.contactRelationship) {
                                $scope.createEmergencyContact.designeeRelation = relation;
                                return;
                            }
                        });
                    }

                    /*if (data) {
                        data.address.address1 = $scope.createEmergencyContact.address1;
                        data.address.city = $scope.createEmergencyContact.city;
                        data.address.postalCode = $scope.createEmergencyContact.postalCode;
                        data.address.state = $scope.addressData.activeAddressList[0].state;
                        data.address.country = $scope.addressData.activeAddressList[0].country;
                    }*/

                    if (typeof $scope.addressData.activeAddressList[0].country === 'object') {
                        setCountryStatus($scope.addressData.activeAddressList[0].country.key);
                    } else {
                        setCountryStatus($scope.addressData.activeAddressList[0].country);
                    }

                    angular.forEach($scope.countriesData, function (input) {
                        if (typeof $scope.addressData.activeAddressList[0].country === 'object') {
                            if (input.key === $scope.addressData.activeAddressList[0].country.key) {
                                setCountryStates(input);
                            }
                        } else {
                            if (input.key === $scope.addressData.activeAddressList[0].country) {
                                setCountryStates(input);
                            }
                        }

                    });
                }
            }
        };

        $scope.starFn = function (type, value) {
            if (type === "star") {
                if (value === "Y" || value === true) {
                    $scope.createEmergencyContact.star = true;
                    return $scope.createEmergencyContact.star;
                } else {
                    $scope.createEmergencyContact.star = false;
                    return $scope.createEmergencyContact.star;
                }
            }
            else {
                if (value === "Y") {
                    $scope.editSameAsAddress = true;
                    return $scope.editSameAsAddress;
                } else {
                    $scope.editSameAsAddress = false;
                    return $scope.editSameAsAddress;
                }
            }
        };

        $scope.setPrimaryContact = function (value) {
            if (value) {
                var count = 0;
                angular.forEach($scope.emergencyContactData, function (contact) {
                    if (contact.primaryContactFlag === 'Y') {
                        count++;
                    }
                });
                if (count >= 1) {
                    $scope.confirmMessage = $scope.translation.profile_personal.emergency_confirmMessage;
                    $scope.yes_btn = $scope.translation.profile_personal.emergency_yes_text;
                    $scope.no_btn = $scope.translation.no;
                    $scope.confirm = {
                        "title": $scope.translation.shared.Confirmation,
                        "confirmMessage": $scope.translation.profile_personal.emergency_confirmMessage
                    };
                    gso.getNGDialog().openConfirm(
                        {
                            template: 'app/shared/views/confirmAlert.html',
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false
                        }).then(
                        function () {
                            $scope.createEmergencyContact.star = value;
                        },
                        function () {
                            $scope.createEmergencyContact.star = false;
                        }
                    );
                } else {
                    $scope.createEmergencyContact.star = value;
                }
            } else {
                if ($scope.isEditEmergencyContact) {
                    $scope.changePrimaryContact(value);
                } else {
                    $scope.createEmergencyContact.star = !$scope.createEmergencyContact.star;
                }
            }

        };

        $scope.changePrimaryContact = function (value) {
            var count = 0;
            angular.forEach($scope.emergencyContactData, function (contact) {
                if (contact.primaryContactFlag === 'Y') {
                    count++;
                }
            });
            if ((count >= 1 && $scope.createEmergencyContact.primaryContactFlag === 'N') || (count === 0)) {
                $scope.createEmergencyContact.star = !value;
                $scope.starTemp = $scope.createEmergencyContact.star;
            } else if (count >= 1 && $scope.createEmergencyContact.primaryContactFlag === 'Y') {
                $scope.createEmergencyContact.star = value;
                $scope.starTemp = $scope.createEmergencyContact.star;
                var starEmitAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: $scope.translation.profile_personal.emergency_primary_contact_message
                };
                $scope.childParentAlertMsg(starEmitAlert);
            }
        };

        $scope.populateStates = function (country) {
            $scope.createEmergencyContact.postalCode = '';
            if (angular.isObject(country)) {
                states(country);
            }

            if (country === undefined || (country && country.key === 'US')) {
                $scope.isUSCountry = true;
                $scope.isCACountry = false;
            } else if (country && country.key === 'CA') {
                $scope.isCACountry = true;
                $scope.isUSCountry = false;
            }
        };

        $scope.showHideAddress = function (type, index, data) {
            gso.getAPIConfigDataService().getCountries().then(function (response) {
                angular.forEach(response, function (input) {
                    if (typeof $scope.emergencyContactData[index].address.country === 'object') {
                        if (input.key === $scope.emergencyContactData[index].address.country.key) {
                            $scope.emergencyContactData[index].county = input;
                            $scope.populateStates(input, index);
                        }
                    } else {
                        if (input.key === $scope.emergencyContactData[index].address.country) {
                            $scope.emergencyContactData[index].county = input;
                            $scope.populateStates(input, index);
                        }
                    }

                });
            });

            var addr = angular.element("#showAddress_" + index);
            var prof = angular.element("#profile_" + index);
            var show = angular.element("#showView_" + index);
            var hide = angular.element("#hideView_" + index);

            if (type === "show") {
                addr.addClass("view_show ");
                prof.removeClass("default-emerg-block");
                show.addClass("hide");
                hide.addClass("view_show");
            } else {
                addr.removeClass("view_show");
                show.removeClass("hide");
                prof.addClass("default-emerg-block");
                hide.removeClass("view_show");
            }

            if (data && data.sameAddressPerson === "Y") {
                if (data) {
                    data.address.address1 = $scope.addressData.activeAddressList[0].address1;
                    data.address.city = $scope.addressData.activeAddressList[0].city;
                    data.address.postalCode = $scope.addressData.activeAddressList[0].postalCode;
                    data.address.state = $scope.addressData.activeAddressList[0].state;
                    data.address.country = $scope.addressData.activeAddressList[0].country;
                }
            }
        };

        $scope.editEmergencyContact = function (index, contact) {
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/personal/emergencyContact/emergencyModelView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            $scope.isEditEmergencyContact = true;
            $scope.editedEmergencyContactIndex = index;
            $scope.duplicateContact = angular.copy(contact);
            $scope.createEmergencyContact = contact;
            $scope.createEmergencyContact.contactName = contact.name.firstName ? contact.name.firstName : contact.name.fullName;
            $scope.createEmergencyContact.star = contact.primaryContactFlag === 'Y' ? true : false;
            $scope.checked = contact.sameAddressPerson === 'Y' ? true : false;
            $scope.sameAsAddress = contact.sameAddressPerson === 'Y' ? true : false;
            $scope.createEmergencyContact.notes = contact.notes;

            if (contact.address.country === 'US') {
                $scope.isUSCountry = true;
                $scope.isCACountry = false;
            } else if (contact.address.country === 'CA') {
                $scope.isCACountry = true;
                $scope.isUSCountry = false;
            }

            if (contact.sameAddressPerson === 'Y') {
                $scope.sameAsAddressFn(true);
            } else {
                if (contact.address.country !== null) {
                    $scope.createEmergencyContact.address1 = contact.address.address1;
                    $scope.createEmergencyContact.address2 = contact.address.address2;
                    $scope.createEmergencyContact.address3 = contact.address.address3;
                    $scope.createEmergencyContact.address4 = contact.address.address4;
                    $scope.createEmergencyContact.city = contact.address.city;
                    $scope.createEmergencyContact.postalCode = contact.address.postalCode;
                    $scope.createEmergencyContact.telephoneNumber1 = contact.telephoneNumbers.telephoneNumber1;
                    angular.forEach($scope.countriesData, function (country) {
                        if (typeof contact.address.country === 'object') {
                            if (country.key === contact.address.country.key) {
                                $scope.createEmergencyContact.county = country;
                                return;
                            }
                        } else {
                            if (country.key === contact.address.country) {
                                $scope.createEmergencyContact.county = country;
                                return;
                            }
                        }

                    });

                    if (typeof contact.address.country === 'object') {
                        genericService.states(contact.address.country.key).then(function (data) {
                            $scope.statesData = data.data.data;
                            angular.forEach($scope.statesData, function (state) {
                                if (state.key === (typeof contact.address.state === 'string'? contact.address.state : contact.address.state.key)) {
                                    $scope.createEmergencyContact.state = state;
                                    return;
                                }
                            });
                        });
                    } else {
                        genericService.states(contact.address.country).then(function (data) {
                            $scope.statesData = data.data.data;
                            angular.forEach($scope.statesData, function (state) {
                                if (state.key === (typeof contact.address.state === 'string'? contact.address.state : contact.address.state.key)) {
                                    $scope.createEmergencyContact.state = state;
                                    return;
                                }
                            });
                        });
                    }

                }
            }




            angular.forEach($scope.relationShipsData, function (relation) {
                if (relation.key === contact.contactRelationship) {
                    $scope.createEmergencyContact.designeeRelation = relation;
                    return;
                }
            });
        };

        $scope.deleteEmergencyContact = function (index) {
            $scope.confirmMessage = profile.emergencyContact.deleteAlert;
            $scope.yes_btn = 'Delete';
            $scope.no_btn = 'Cancel';
            $scope.confirm = {
                "title": "Confirmation",
                "confirmMessage": profile.emergencyContact.deleteAlert
            };
            if (index === 0 && $scope.emergencyContactData[index].primaryContactFlag === 'Y') {
                var constantEmitAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: profile.emergencyContact.primaryContactDelete
                };
                $scope.childParentAlertMsg(constantEmitAlert);
            } else {
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                        gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                            companyId + '/' + appUserId + profileUrlConfig.resources.emergencyContact + "/" + $scope.emergencyContactData[index].name.fullName + "/" + $scope.emergencyContactData[index].uniqueId, null, function (response) {
                            SharedDataService.getAppSharedData().sMessage= JSON.stringify(response);
                            gso.getUtilService().routeReloadTimeOut();
                        }, function (data) {
                            $scope.childParentAlertMsg(data);
                            gso.getUtilService().routeReloadTimeOut();
                        });
                    }
                );
            }
        };
        $scope.cancel = function () {
            $scope.isEditEmergencyContact = false;
            $scope.isEmergencyContactFormSubmitted = false;
            if ($scope.emergencyContactData) {
                $scope.emergencyContactsSection = false;
            } else {
                $scope.emergencyContactsSection = true;
            }
            $scope.createEmergencyContact = {};
            gso.getNGDialog().closeAll();
        };
        //validations logic.
        $scope.validationPatterns = {
            emergencyCreate: {
                focus: {
                    emergencyCreateFormNamesRequired: null,
                    mergencyCreateFormpreferredPhoneRequired: null,
                    emergencyCreateFormpreferredPhonePattern: null,
                    emergencyCreateFormrelationshipRequired: null,
                    emergencyCreateFormemailRequired: null,
                    emergencyCreateFormline1Required: null,
                    emergencyCreateFormcityRequired: null,
                    emergencyCreateFormstatepRequired: null,
                    emergencyCreateFormpostalRequired: null,
                    emergencyCreateFormcountryRequired: null,
                    emergencyCreateFormpostalPattern: null,
                    postalminlength: null,
                    postalmaxlength: null
                },
                blur: {
                    emergencyCreateFormNamesRequired: null,
                    mergencyCreateFormpreferredPhoneRequired: null,
                    emergencyCreateFormpreferredPhonePattern: null,
                    emergencyCreateFormrelationshipRequired: null,
                    emergencyCreateFormemailRequired: null,
                    emergencyCreateFormline1Required: null,
                    emergencyCreateFormcityRequired: null,
                    emergencyCreateFormstatepRequired: null,
                    emergencyCreateFormpostalRequired: null,
                    emergencyCreateFormcountryRequired: null,
                    emergencyCreateFormpostalPattern: null,
                    postalminlength: null,
                    postalmaxlength: null
                }
            }
        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'emergencyCreate') {
                $scope.validationPatterns.emergencyCreate.focus = temp;
            }
        };

}]);

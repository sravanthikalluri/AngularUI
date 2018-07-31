/**
 Description: This is directive for group of check boxes
 Author:Raghavendra Kumar Bonthala
 **/

/*
 'use strict';
 trinetApp.directive("checkboxGroup", function() {
 return {
 restrict: "A",
 link: function(scope, elem) {
 setTimeout(function(){
 if (scope.array.indexOf(scope.item.role) !== -1) {
 elem[0].checked = true;
 }

 // Update array on click
 elem.bind('click', function() {
 var index = scope.array.indexOf(scope.item.role);
 // Add if checked
 if (elem[0].checked) {
 if (index === -1) {
 scope.array.push(scope.item.role);
 }
 }
 // Remove if unchecked
 else {
 if (index !== -1){
 scope.array.splice(index, 1);
 }
 }
 // Sort and update DOM display
 scope.$apply(scope.array.sort(function(a, b) {
 return a - b;
 }));
 });
 },200);
 }
 };
 });*/

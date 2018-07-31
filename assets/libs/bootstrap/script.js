// JavaScript Document
$(document).ready(function(){
	
	$("#nameedit").click(function(){
		$("#details").attr('class', 'myfield-content hide');
		$("#edit").attr('class', ' myfield-content show');
		});
		
	$("#cancel").click(function(){
		$("#edit").attr('class', 'myfield-content hide');
		$("#details").attr('class', ' myfield-content show');
		});
	});
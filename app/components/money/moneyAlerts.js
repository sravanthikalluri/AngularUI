var money = {
    defaultMessages: {
        mandatoryFields: 'Please enter goal/limited amount.',
        confirmNoChanges: 'You did not make any changes do you want to save it?',
        enterEffectiveDate: 'Please enter effective date.',
        noRecordsFound: 'No records found for this user.',
        pleaseEnterAllFields: 'Please  enter all mandatory fields',
        nameValidation: 'Name allows characters only.',
        percentageValidation: 'Percentage should not be more than 100.',
        copyMsg: 'u pressed ctrl+c',
        cancelChanges: 'If you continue, any unsaved changes will be discarded. Do you want to continue?'
    },
    taxWithHoldings: {
        creationFail: 'Tax Withholding creation has been failed.',
        successSaveMsg: 'Your change has been successfully saved and can take up to 24 hours to become effective.',
        residentConfirmationMsg: 'Upon penalty of perjury, I represent that I have been authorized by the employee affected hereby to make and/or implement the election(s) or change(s) set forth above, and that I am otherwise authorized by my Company to do so.',
        NonResidentConfirmationMsg: 'Further, based on my visa status, I acknowledge that my withholding will initially be set at the IRS-established rate for nonresident aliens. This rate is calculated as if you are making $51 more a week in pay and you are claiming single and entitled to one allowance. I acknowledge that I am not authorized to change this unless and until I satisfy the substantial presence test of the IRS. By making any changes to my withholding, I am certifying, under penalties of perjury, that I have satisfied the ' + '<a class="substantial ng-scope" href="javascript:void(0)" ng-click="openSPTest();">substantial presence test</a>' + ' in accordance with the requirements of the IRS.',
        i9StatusCheckingMsg: 'The tax withholding You cannot change your tax withholding at this time because we do not have your completed I-9 on file. You will be able to update your withholding once your I-9 is finalized.',
        defaultMsg: 'Edit your tax withholding below. If you do not make any changes, your tax withholding will automatically be set to the default amount shown below.',
        dateFieldValidationMsg: 'The tax withholding may or may not take effect on the date selected as it is before the first day of the next pay period ',
        rangeWarningMsg: 'You must use the same number of allowances for your local and state tax withholding. Any change you make to your state allowance will also be applied to your local tax.',
        lockedMsg: 'The IRS has established a maximum of 99 for your federal withholding.',
        stateLockedMsg: 'The IRS has established a maximum of 99 for your state withholding.',
        getDataFail: 'Data fetching failed',
        wantToClose: "You have made changes. Do you want cancel those ? ",
        countryNoPDF: 'PDF is not available for this country',
        localStateWarnMsg: 'You must use the same number of allowances for your local and state tax withholding. Any change you make to your state allowance will also be applied to your local tax.',
        marriedFillingSingleMsg:'Please select marital status of "Single" when the "married but withholding at single rate" checkbox is selected.',
        warnStateMsg :{
             'IN':'Indiana Counties require State withholding allowances to equal Local withholding allowances. Any change you make to these Exemptions will also be applied to your local taxes for Indiana.',
             'OH':'Ohio School District Localities require State withholding allowances to equal Local withholding allowances. Any change you make to these Exemptions will also be applied to your local taxes for Ohio school districts.',
             'MD':'Maryland Local Tax Withholding Allowances must equal State Withholding Allowances. Any change you make to these Exemptions will also be applied to your local taxes for Maryland.'
        }


    },
    retirementPlan: {
        creationFail: 'Retirement Plan creation has been failed.',
        successSaveMsg: 'Retirement Plan details are saved successfully',
        dataExistsValidation: 'Data is not available for this employeeId',
        dataExceptionMsg: 'Data base server is busy unable to fetch the data.',
        validationMsg: 'Please enter goal/limited amount.'
    },
    directDeposit: {
        accountSaveSuccess: 'Accounts have been updated successfully.',
        accountSaveFailure: 'Error occurred while updating accounts.',
        reimbursementAccountSaveSucess: 'Your changes has been successfully saved and can take up to 24 hours  to become effective',
        validationMsg: 'No changes done.',
        errorMsg: 'Could not Fetch Work Country Code of the employee.',
        errorSaveMsg: 'You should not save negative values.',
        addAccountLimit: 'You should not add more than 10 accounts.',
        addAccountFSATitle: 'Add Account for Flexible Spending Account',
        addAccountApTitle: 'Add Account for Expenses',
        noChange: 'There is no change, do you want to continue?',
        effectiveDateValidation: 'Effective Date must be at least one business day ahead of current Date',
        noReimbursementFacility: 'Please create direct deposit account in earnings to avail reimbursement facility',
        noPreviousChecks: 'No previous paychecks available to estimate net pay.',
        calcEstimate: 'Your deposits have been calculated based on the estimate you entered. \n You can revert back to your last paycheck or change your estimate at any time.',
        checkPercentages: 'Please check your amount and percentages, you entered',
        exceedingPackageLimit: 'You are exceeding your Paycheck limit. Please enter valid number.',
        confDelete: 'Are you sure you want to delete it?',
        confFSA: 'This account is currently used for FSA. If you continue, you will receive a check for FSA reimbursements. Are you sure you want to delete this account?',
        confAP: 'This account is currently used for AP. If you continue, you will receive a check for AP reimbursements. Are you sure you want to delete this account?',
        accountNumberExist: 'Account Number already exists.',
        successSaveMsg: 'Change successfully saved. It may take up to three business days to take effect.',
        invalidPercentage: 'Percentage cannot exceed 100%',
        exceedLastPayCheck :'This exceeds your last paycheck or estimate. Deposits will be made in the order you specify. You may want to review the deposit order and amounts.'

    },
    workInbox: {
        workInboxSaveSuccess: 'Approved successfully.',
        workInboxSaveFailure: 'Could not access Notifications.Please contact system admin.',
        workInboxValidation: 'Please select action records.'
    }
};
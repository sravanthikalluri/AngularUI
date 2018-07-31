var fileConfig = {
    "benefits":{
        currBenDetails:'app/components/benefits/currentBenefits/currentBenefitsDetails.html',
        askBenefits:'app/components/benefits/policies/aflacBenefits/aflacBenefitsView.html',
        metLifeBenefits:'app/components/benefits/policies/metlifeBenefits/metlifeBenefitsView.html',
        benefitsGuide:'app/components/benefits/policies/benefitsGuideBook/benefitsGuideBookView.html',
        summaryDesc:'app/components/benefits/policies/summaryPlanDescription/summaryPlanDescriptionView.html',
        acaMarket:'app/components/company/policies/acaMarketPlace/acaMarketPlaceView.html',
        stateFederal:'app/components/benefits/policies/stateFederalNotices/stateFederalNoticesView.html',
        summaryModal:'app/components/benefits/policies/summaryPlanDescription/summaryPlanModalView.html',
        stateBuild:'app/components/benefits/policies/benefitsSummary/buildMaintainStates/statesBuildData/statesBuildDataView.html',
        policiesData:"assets/data/benefits/policiesData.json",
        summaryPlanLinks:'assets/data/benefits/policiesBenefitsSummaryLinks.json'
    },
    "company":{
        addLoc:'app/components/company/manageDeptAndLoc/location/addLocation.html',
        editLoc:'app/components/company/manageDeptAndLoc/location/editLocation.html',
        addDept:'app/components/company/manageDeptAndLoc/department/addDepartment.html',
        editDept:'app/components/company/manageDeptAndLoc/department/editDepartment.html',
        inactiveDept:'app/components/company/manageDeptAndLoc/department/inactiveDept.html',
        assignToAnother:'app/components/company/manageDeptAndLoc/department/assignToAnother.html',
        assignToAnotherConfirmation: 'app/components/company/manageDeptAndLoc/department/confirmationpage.html'

    },
    "onboarding":{
        viewOnboardingOptions: 'app/shared/views/onboardingOptionsView.html',
        viewUnsubmitted:'app/shared/views/unsubmittedView.html'
    },
    // Contains cookiename and passport urls
    "microservices" :{
        config :'/microservices-config/config.json'
    },
    "mfa" : {
        personSecurityUrl : '/trinetgateway/api/mfa/services/v1.0/user/'
    },
    "gatewayRedirect" : {
        proxyUrl : '/trinetGateway/services/v1.0/redirect/companyId/personId?path='
    }

};

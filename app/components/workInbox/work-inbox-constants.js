/**
 * Created by ganesh on 2/15/2017.
 */
var workInboxConstants = {
    assignedToMe : {
        electronic_i9_entries : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Status',
            actions : ''

        },
        newhire_rehireentry : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Status',
            actions : ''
        },
        manager_assignments : {
            subjectName : 'Employee Name',
            effectiveDate : 'Effective Date',
            actorName : 'Manager Name',
            status : 'Type',
            actions : ''
        },
        employment_change_request : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            type : 'Type',
            actions : ''
        },
        time_off_requests : {
            initiatorName : 'Name',
            effectiveDate : 'Date',
            subjectName : 'Subject Name',
            type : 'Process Description',
            //totalHours : 'Total Hours',
            actions : ''

        },
        electronic_i9_entries_actions:['i9-authorization','History','Details'],
        newhire_rehireentry_actions:['new-hire-authorization','History','Details'],
        manager_assignments_actions:['Approve','Decline','History','Details'],
        employment_change_request_actions:['Approve','Decline','History','Details'],
        time_off_requests_actions:['leave-request-notification','History','Details']
    },
    assignedToOthers : {
        electronic_i9_entries : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actorName : 'Waiting For',
            actions : ''

        },
        newhire_rehireentry : {
            subjectName: 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Status',
            actorName : 'Waiting For',
            actions : ''
        },
        manager_assignments : {
            subjectName : 'Employee Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Type',
            actorName : 'Completed By',
            actions : ''
        },
        employment_change_request : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            type : 'Type',
            actorName : 'Waiting For',
            actions : ''
        },
        time_off_requests : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actorName : 'Waiting For',
            actions : ''

        },
        electronic_i9_entries_actions:['History','Details'],
        newhire_rehireentry_actions:['History','Details'],
        manager_assignments_actions:['History','Details'],
        employment_change_request_actions:['History','Details'],
        time_off_requests_actions:['History','Details']
    },
    UnAssigned : {
        electronic_i9_entries : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Status',
            actions : ''

        },
        newhire_rehireentry : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Status',
            actions : ''
        },
        manager_assignments : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            actorName : 'Manager Name',
            status : 'Type',
            actions : ''
        },
        employment_change_request : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            status : 'Required Action',
            actions : ''
        },
        time_off_requests : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''

        },
        electronic_i9_entries_actions:['History','Details'],
        newhire_rehireentry_actions:['History','Details'],
        manager_assignments_actions:['History','Details'],
        employment_change_request_actions:['History','Details'],
        time_off_requests_actions:['History','Details']
    },
    Completed : {
        electronic_i9_entries : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''

        },
        newhire_rehireentry : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''
        },
        manager_assignments : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''
        },
        employment_change_request : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''
        },
        time_off_requests : {
            subjectName : 'Name',
            effectiveDate : 'Effective Date',
            initiatorName : 'Created By',
            actions : ''
        },
        electronic_i9_entries_actions:['Archive','History','Details'],
        newhire_rehireentry_actions:['Archive','History','Details'],
        manager_assignments_actions:['Archive','History','Details'],
        employment_change_request_actions:['Archive','History','Details'],
        time_off_requests_actions:['Archive','History','Details']
    },
    work_flow_details : {
        headerNames : {
            subjectName : 'Action',
            dateEntered : 'Date Entered',
            lastAction : 'Last Action',
            effectiveDate : 'Effective Date',
            completedBy : 'Completed By',
            role : 'Role',
            waitingFor : 'Waiting For',
            status : 'Status',
            result : 'Result'
        }
    },
    display_order : {
        electronic_i9_entries : 0,
        newhire_rehireentry : 1,
        manager_assignments : 2,
        employment_change_request : 3,
        time_off_requests : 4



    }
};

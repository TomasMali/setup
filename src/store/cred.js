export default {
    prod: {
        url_login: 'https://tomasmali.it/myapi/login',
        url_register: 'https://tomasmali.it/myapi/register',
        url_reset_password: 'https://tomasmali.it/myapi/resetPassword',
        url_change_password: 'https://tomasmali.it/myapi/changePassword',
        url_event_delete: 'https://tomasmali.it/myapi/event/deleteEvent',
        url_event_get: 'https://tomasmali.it/myapi/event/getEvent',
        url_event_add: 'https://tomasmali.it/myapi/event/addEvent',
        url_competition_get: 'https://tomasmali.it/myapi/relation/getRelations',
        url_myCompetition_get: 'https://tomasmali.it/myapi/relation/getMyRelations/?license=FREE',
        url_tabs: 'https://tomasmali.it/myapi/tab/',
        url_relation_add: 'https://tomasmali.it/myapi/relation/addRelation',
        url_relation_delete: 'https://tomasmali.it/myapi/relation/deleteRelation',

    },
    dev: {
        url_login: 'https://tomasmali.it/myapi/login',
        url_register: 'https://tomasmali.it/myapi/register',
        url_reset_password: 'https://tomasmali.it/myapi/resetPassword',
        url_change_password: 'https://tomasmali.it/myapi/changePassword',
        url_event_delete: 'https://tomasmali.it/myapi/event/deleteEvent',
        url_event_get: 'https://tomasmali.it/myapi/event/getEvent',
        url_event_add: 'https://tomasmali.it/myapi/event/addEvent',
        url_competition_get: 'https://tomasmali.it/myapi/relation/getRelations',
        url_myCompetition_get: 'http://localhost:3100/relation/getMyRelations/?license=FREE',
        url_tabs: 'https://tomasmali.it/myapi/tab/',
        url_relation_add: 'http://localhost:3100/relation/addRelation',
        url_relation_delete: 'http://localhost:3100/relation/deleteRelation',
    }
}
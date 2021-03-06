export default {
    prod: {
        url_login: "https://tomasmali.it/myapi/login",
        url_register: "https://tomasmali.it/myapi/register",
        url_reset_password: "https://tomasmali.it/myapi/resetPassword",
        url_change_password: "https://tomasmali.it/myapi/changePassword",
        url_get_users: "https://tomasmali.it/myapi/user/getUsers",
        url_upload_pic: "https://tomasmali.it/myapi/user/uploadProfilePic",

        url_get_pic: "https://tomasmali.it/myapi/uploadsresized",

        url_update_users: "https://tomasmali.it/myapi/user/updateUser",
        url_delete_users: "https://tomasmali.it/myapi/user/deleteUser",
        url_event_delete: "https://tomasmali.it/myapi/event/deleteEvent",
        url_event_get: "https://tomasmali.it/myapi/event/getEvent",
        url_event_add: "https://tomasmali.it/myapi/event/addEvent",
        url_fids_competition_get: "https://tomasmali.it/myapi/relation/getRelationsFIDS",
        url_myCompetition_get: "https://tomasmali.it/myapi/relation/getMyRelations",
        url_tabs: "https://tomasmali.it/myapi/tab/",
        url_my_competition_add: "https://tomasmali.it/myapi/relation/addMyRelation",
        url_my_competition_update: "https://tomasmali.it/myapi/relation/updateMyRelation",
        url_my_competition_delete: "https://tomasmali.it/myapi/relation/deleteMyRelation",
        url_insert_from_fids_competitions: "https://tomasmali.it/myapi/relation/insertFromFidsCompetitions",
    },
    dev: {
        url_login: "http://localhost:3100/login",
        url_register: "http://localhost:3100/register",
        url_reset_password: "http://localhost:3100/resetPassword",
        url_change_password: "http://localhost:3100/changePassword",
        url_get_users: "http://localhost:3100/user/getUsers",
        url_upload_pic: "http://localhost:3100/uploadProfilePic",

        url_get_pic: "http://localhost:3100/uploadsresized",

        url_update_users: "http://localhost:3100/user/updateUser",
        url_delete_users: "http://localhost:3100/user/deleteUser",
        url_event_delete: "http://localhost:3100/event/deleteEvent",
        url_event_get: "http://localhost:3100/event/getEvent",
        url_event_add: "http://localhost:3100/event/addEvent",
        url_fids_competition_get: "http://localhost:3100/relation/getRelationsFIDS",
        url_myCompetition_get: "http://localhost:3100/relation/getMyRelations",
        url_tabs: "http://localhost:3100/tab/",
        url_my_competition_add: "http://localhost:3100/relation/addMyRelation",
        url_my_competition_update: "http://localhost:3100/relation/updateMyRelation",
        url_my_competition_delete: "http://localhost:3100/relation/deleteMyRelation",
        url_insert_from_fids_competitions: "http://localhost:3100/relation/insertFromFidsCompetitions",
    },

    getLinkType() {
        return this.prod;
    },
};
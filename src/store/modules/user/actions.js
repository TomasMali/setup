import cred from "../../cred.js";

export default {
    /**Login method
     *
     * @param {*} context
     * @param {*} payload
     */
    async fetchUsers(context) {
        let url = cred.getLinkType().url_get_users;

        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
        //  console.log(responseData)
        context.commit("setUsers", {
            usersObj: responseData,
        });
    },

    /**
     * register method
     * @param {*} _
     * @param {*} payload
     */
    async updateUser(_, payload) {
        let url = cred.getLinkType().url_update_users;
        //console.log(payload);

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                user: payload,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error(
                    "Request failed with error code: " +
                    response.status +
                    " Message error from server: " +
                    responseData.message
                );
        }
    },
};
import cred from "../../cred.js";

export default {
    async getEventsFromDb(context, payload) {
        let url = cred.getLinkType().url_event_get + "?user=" + payload.user;

        //console.log(url);
        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
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
        context.commit("setEvent", {
            eventObj: responseData,
        });
    },

    async addEvent(_, payload) {
        let url = cred.getLinkType().url_event_add;
        // console.log(payload);

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
                user: payload.user,
                name: payload.name,
                beginDate: payload.beginDate,
                endDate: payload.endDate,
                beginDateRegistration: payload.beginDateRegistration,
                endDateRegistration: payload.endDateRegistration,
                place: payload.place,
                organizerName: payload.organizerName,
                organizerMail: payload.organizerMail,
                organizerPhone: payload.organizerPhone,
                responsableName: payload.responsableName,
                responsableMail: payload.responsableMail,
                responsablePhone: payload.responsablePhone,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },

    async deleteEvent(_, payload) {
        let url = cred.getLinkType().url_event_delete;
        //  console.log(payload);

        const response = await fetch(url, {
            method: "DELETE",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                name: payload.name,
                user: payload.user,
                idEvent: payload.idEvent,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },
};
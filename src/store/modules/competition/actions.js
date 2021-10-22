import cred from "../../cred.js";

export default {
    async updateMyCompetition(_, payload) {
        let url = cred.getLinkType().url_my_competition_update;
        //   console.log(payload);

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
                competition: payload,
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

    async getFidsCompetitions(context) {
        let url = cred.getLinkType().url_fids_competition_get;
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
        context.commit("setFidsCompetitions", {
            fidsCompetitionObj: responseData,
        });
    },

    async getMyCompetitions(context, payload) {
        let url =
            cred.getLinkType().url_myCompetition_get + "?user=" + payload.user;
        //  "&event=" +
        // payload.event;

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

        context.commit("setMyCompetitions", {
            myCompetitionObj: responseData,
        });
        return;
    },

    async addMyCompetition(_, payload) {
        let url = cred.getLinkType().url_my_competition_add;

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
                competition: payload,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            }
            //   throw new Error("Request failed with error code: " + response.status)
            else
                throw new Error("Work in progress..... Please submit all the fields ");
        }
    },

    async deleteMyCompetition(_, payload) {
        let url = cred.getLinkType().url_my_competition_delete;
        //  console.log(payload)

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
                id: payload.id,
                license: payload.license,
                user: payload.user,
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

    async insertFromFidsCompetitions(_, payload) {
        let url = cred.getLinkType().url_insert_from_fids_competitions;

        //  console.log(payload)

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
                start_dat: payload.start_dat,
                end_dat: payload.end_dat,
                competitionsIdArray: payload.competitionsIdArray,
                event: payload.event,
                user: payload.user,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            }
            //   throw new Error("Request failed with error code: " + response.status)
            else
                throw new Error("Work in progress..... Please submit all the fields ");
        }
    },
};
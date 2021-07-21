import cred from "../../cred.js";

export default {
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
        // console.log("Ciao")
        context.commit("setMyCompetitions", {
            myCompetitionObj: responseData,
        });
    },

    async addMyCompetition(_, payload) {
        let url = cred.getLinkType().url_my_competition_add;

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
                license: payload.license,
                events: payload.events,
                dances: payload.dances,
                disciplines: payload.disciplines,
                judges_disciplines: payload.judges_disciplines,
                judges_licenses: payload.judges_licenses,
                officials_licenses: payload.officials_licenses,
                officials_roles: payload.officials_roles,
                sectors_discipline: payload.sectors_discipline,
                unit_type: payload.unit_type,
                classe: payload.classe,
                age_category: payload.age_category,
                competition_type: payload.competition_type,
                judging_systems: payload.judging_systems,
                rounds: payload.rounds,

                age_group: "8/9",
                judging_system_preliminary: "test",
                judging_system_final: "RTTT",
                calculation_type: "sdf",
                first_age_min: 23,
                first_age_max: 34,
                second_age_min: 23,
                second_age_max: 45,
                alternative_age_group: 45,
                perc_fq_age: "sd",
                perc_fq_class: "df",
                members_min: "34",
                members_max: "33",
                exclusive_gender: "F",
                music_required: "No",
                alias: "al",
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
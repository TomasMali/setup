import cred from '../../cred.js'



export default {

    async getEvents(context) {
        let url = cred.prod.url_event_get
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            enctype: 'mutipart/form-data'
        });

        const responseData = await response.json()

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message)
            } else
                throw new Error("Request failed with error code: " + response.status)

        }
        //  console.log(responseData)
        context.commit('setEvent', {
            eventObj: responseData
        })
    },


    async addEvent(_, payload) {

        let url = cred.prod.url_event_add
        console.log(payload)

        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            enctype: 'mutipart/form-data',
            body: JSON.stringify({
                name: payload.name,
                date: payload.date
            })
        });

        const responseData = await response.json()

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message)
            } else
                throw new Error("Request failed with error code: " + response.status)

        }


    },

    async deleteEvent(_, payload) {

        let url = cred.prod.url_event_delete
        console.log(payload)

        const response = await fetch(url, {
            method: 'DELETE',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            enctype: 'mutipart/form-data',
            body: JSON.stringify({
                name: payload.name
            })
        });

        const responseData = await response.json()

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message)
            } else
                throw new Error("Request failed with error code: " + response.status)

        }


    },


}
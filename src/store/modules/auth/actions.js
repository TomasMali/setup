import cred from '../../cred.js'

let timer

export default {
    /**Login method
     * 
     * @param {*} context 
     * @param {*} payload 
     */
    async login(context, payload) {

        let url = cred.prod.url_login

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            })
        });
        const responseData = await response.json()

        if (!response.ok) {
            if (responseData.code === 401) {
                throw new Error(responseData.message)
            } else
                throw new Error("Request failed with error code: " + response.status)

        }
        // qui tutto ok 


        // responseData.expiresIn = 3600 ,,, è in secondi [* 100 per ottenere millisecondi]
        const expiresIn = +responseData.expiresIn * 1000
            //  const expiresIn = 5000
            // gets the time in milliseconds
        const expirationDate = new Date().getTime() + expiresIn


        localStorage.setItem('token', responseData.token)
        localStorage.setItem('userId', responseData.email)
        localStorage.setItem('tokenExpiration', expirationDate)


        // dopo questo tempo 'expiresIn', la funzione viene eseguita
        // Una volta logout, pulisco il timer con clearTimeout
        timer = setTimeout(() => {
            context.dispatch('autoLogOut')
        }, expiresIn);


        context.commit('setUser', {
            token: responseData.token,
            userId: responseData.email,
        })


    },


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



    /**
     * register method
     * @param {*} _ 
     * @param {*} payload 
     */
    async register(_, payload) {

        let url = cred.prod.url_register
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
                surname: payload.surname,
                email: payload.email,
                password: payload.password
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





    async resetPassword(_, payload) {

        let url = cred.prod.url_reset_password

        console.log(payload)
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            enctype: 'mutipart/form-data',

            body: JSON.stringify({
                email: payload.email,
            })
        });
        const responseData = await response.json()

        if (!response.ok) {
            throw new Error(responseData.message)
        }
    },
    async changePassword(_, payload) {


        let url = cred.prod.url_change_password

        console.log(payload)
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            enctype: 'mutipart/form-data',

            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            })
        });

        if (!response.ok) {
            throw new Error("Request failed with error code: " + response.status)
        }


    },





    /**
     * Get calls in every page riload
     * @param {*} _ 
     * @param {*} payload 
     */
    async tryLogin(context) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        // prendo la differenza per capire se il token è scaduto
        const expiredIn = +tokenExpiration - new Date().getTime();

        if (expiredIn < 0) {
            return
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogOut')
        }, expiredIn)

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            })
        }
    },

    /**
     * Logs the user out
     * @param {*} context 
     */
    logout(context) {

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null

        })

    },
    autoLogOut(context) {
        // chiama il metodo qui sopra 'logout
        context.dispatch('logout')
            // mette didAutoLogout = true nel index.js
        context.commit('setAutoLogout')
    }



}
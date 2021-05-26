import cred from '../../cred.js'



export default {


    async getTabs(context, tabname) {
        let url = cred.prod.url_tabs + tabname

        console.log(tabname)

        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
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
        context.commit('set' + tabname, {
            obj: responseData
        })
    },

}
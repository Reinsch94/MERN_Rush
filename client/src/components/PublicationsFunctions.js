import axios from "axios"
const HOST = "http://localhost:8080";


export const createPublication = newPub => {
    return axios
        .post(HOST+'/publications/create', {
            content: newPub.content,
            creator_id: newPub.creator_id,
        })
        .then(response => {
            console.log('Registered')
        })
}


export const showPub = () => {
    return axios
        .get(HOST+'/publications')
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePub = userID => {
    return axios
        .delete(HOST+'/users/'+userID+'/delete')
        .then(response => {
            console.log('Deleted')
        })
}
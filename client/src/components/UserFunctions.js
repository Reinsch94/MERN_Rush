import axios from "axios"
const HOST = "http://localhost:8080";


export const register = newUser => {
    return axios
        .post(HOST+'/users/create', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log('Registered')
        })
}

export const login = user => {
    return axios
        .post(HOST+'/users/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const showUsers = () => {
    return axios
        .get(HOST+'/users')
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteUser = userID => {
    return axios
        .delete(HOST+'/users/'+userID+'/delete')
        .then(response => {
            console.log('Deleted')
        })
}

// export const putUser = user => {
//     return axios
//         .put(HOST+'/users/'+user._id+'/update')
//         .then(response => {
//             console.log('Deleted')
//         })
// }
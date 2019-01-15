import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { deleteUser,showUsers } from './UserFunctions'
import { Link } from 'react-router-dom'

// composant qui affiche la liste des utilisateurs 

class Socios extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            users: [], // user est utilisé pour stocker la liste des users 
            errors: {}
        }
    }

    componentWillMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.username,
            email: decoded.email
        })
    }

    componentDidMount() {
        this.usersList(); // le mettre en didmount plutôt qu'en render pour éviter un double chargement de l'objet users. 
    }

    clickDelete(event) {
        var id = event.target.id;
        var index = event.target.index;
        deleteUser(id); 
        window.location.reload(); // pas trouvé d'autre moyen que de refresh hélas... 
        // var array = this.state.users; // autre méthode qui marche pas... 
        // array.splice(index, 1);
        // this.setState({ users: array }); // Le setState doit refresh la page pour ne plus afficher le user supprimé mais ça merde... pou
    }

    clickUpdate(event) {
        let id = event.target.id;
        let value = event.target.value;
        console.log(value)
        console.log(id)
    }

    async usersList() {
        let usersRaw = await showUsers();
        let usersArray = usersRaw.data;
        this.setState({
            users: usersArray.map((value, i) => (
                <tr key={"tableLine " + i}>
                    <td key={"idtype " + i}>{value._id}</td>
                    <td key={"usernametype " + i}>{value.username}</td>
                    <td key={"emailtype " + i}>{value.email}</td>
                    <td key={"buttonDelete " + i}><button index={i} id={value._id} onClick={this.clickDelete.bind(this)}>Delete</button></td>
                    <td key={"deletetype " + i}><button id={value._id} onClick={this.clickUpdate} >Modify</button></td>
                    <td key={"followtype " + i}><button>Follow</button></td>
                </tr>
            ))
        });
    }

    render() {
        return (
            <div className='users_list'>
                <table className="table col-md-6 mx-auto">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>email</th>
                            <th>delete</th>
                            <th>modify</th>
                            <th>follow</th>
                        </tr>
                        {this.state.users}
                    </tbody>
                </table>
                <br/>
                <Link to="/create_user">
                    => CREATE NEW USER
                </Link>
            </div>
        )
    }
}



export default Socios


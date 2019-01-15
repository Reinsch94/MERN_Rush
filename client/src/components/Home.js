import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { showPub, deletePub } from './PublicationsFunctions'
import { Well } from 'react-bootstrap';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            userId: '',
            username: '',
            publications: [], // user est utilisé pour stocker la liste des tweets
        }
    }

    componentWillMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.username,
            userId: decoded._id
        })
    }

    componentDidMount() {
        this.publicationsList(); // le mettre en didmount plutôt qu'en render pour éviter un double chargement de l'objet users. 
    }

    clickDelete(event) {
        var id = event.target.id;
        var index = event.target.index;
        deletePub(id);
        window.location.reload(); // pas trouvé d'autre moyen que de refresh hélas... 
    }

    async publicationsList() {
        let pubRaw = await showPub();
        let pubArray = pubRaw.data;
        this.setState({
            publications: pubArray.map((value, i) => (
                <p key={"Line " + i}>
                    <Well bsSize="small" key={"title " + i}><strong>TWEET de {value.creator_id}</strong></Well>
                    <Well bsSize="large" key={"content " + i}>Look I'm in a large well!</Well><br/>
                    <span key={"buttonDelete " + i}><button index={i} id={value._id} onClick={this.clickDelete.bind(this)}>Delete</button></span>
                    <span key={"deletetype " + i}><button id={value._id} onClick={this.clickUpdate} >Modify</button></span>
                    <span key={"commenttype " + i}><button>Comment</button></span>
                </p>

                // <p key={"Line " + i}>
                // <strong> TWEET de {value.creator_id}</strong><br/>
                //     <span key={"contenttype " + i}>{value.content}</span><br/>
                //     
                // </p>
            ))
        });
    }


    render() {
        return (
            <div className="container">
                <div className="static-modal">

                </div>;




                <div className="jumborton mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Welcome to your feed news</h1>
                    </div>
                    {this.state.publications}
                </div>
                <br />
                <div>

                </div>
            </div>
        )
    }
}

export default Home;
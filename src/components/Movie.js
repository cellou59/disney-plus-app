import React, { Component } from 'react';
import { Spin } from 'antd';
import { MovieDisplay } from './MovieDisplay'
import 'antd/dist/antd.css';

import logo from '../logo.png';
import '../stylesheets/App.scss';

export default class Movie extends Component {

    state = {
        movie: {},
        loading: true,
        modalVisible: false
    }

    goToHome = () => {
        this.props.history.push(`/`);
    }

    playMovie = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleCancel = () => {

        // Arrêter la video à la fermeture de la popin
        const iframe = document.querySelector('iframe');
        console.log(iframe);
        if (iframe) {
            let iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }

        this.setState({
            modalVisible: false,
        });
    }

    async getMovie(id) {
        const movie = await fetch(`http://api.elorri.fr/disney-plus/movie/${id}`)
            .then(res => res.json());
        this.setState({ movie, loading: false });
    }

    componentDidMount = () => {
        const id = Number(this.props.match.params.id);
        this.getMovie(id);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.state.loading ? <Spin /> : null}
                    <img src={logo} className="App-logo" alt="logo" onClick={() => this.goToHome()} />
                </header>

                <div className="App-container">
                    <MovieDisplay loading={this.state.loading} movie={this.state.movie} modalVisible={this.state.modalVisible} playMovie={() => this.playMovie()} handleCancel={() => this.handleCancel()} />
                </div>
            </div>
        );
    }
}

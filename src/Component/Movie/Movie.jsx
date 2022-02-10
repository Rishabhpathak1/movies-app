import React, { Component } from 'react';
import {API_KEY, API_URL, IMG_URL} from "../..//API/secrets";
import "./Movie.css";
import {Link} from "react-router-dom";
import axios from 'axios';
class Movie extends Component {
    state = { 
        detailedMovieObj:{},
     }

    async componentDidMount(){
// get movie by id
        let response = await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
        // console.log(response);
        let detailedMovieObj=response.data;
        let posterPath = IMG_URL+detailedMovieObj.poster_path;
        this.setState({
            detailedMovieObj: {...detailedMovieObj,poster_path:posterPath },
        });
    }

    render() { 
        let { poster_path, title, vote_average } = this.props.movie;
        let posterPath = IMG_URL + poster_path;
        return (
            <div className="movie-item">
                <div className="movie-poster">
                    <Link to={{pathname:"/moviepage" , state:this.state.detailedMovieObj}}>
                         <img src={posterPath} alt="" />
                    </Link>
                </div>
                <div className="movie-info">
                    <div className="movie-title">{title}</div>
                    <div className="movie-rating">{vote_average}IMDB</div>
                </div>
            </div>
        );
    }
}
 
export default Movie;
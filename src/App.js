import React, { Component } from 'react';
import Header from "./Component/Header/Header.jsx";
import Movies from './Component/Movies/Movies.jsx';
import Pagination from './Component/Pagination/Pagination.jsx';
import Favourite from './Component/Favourite/Favourite.jsx';
import MoviePage from './Component/MoviePage/MoviePage.jsx';
import axios from 'axios';
import {API_URL,API_KEY} from "./API/secrets.js";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


class App extends Component {
  state = { 
    moviesData : [],
    currentMovie : "Rocky",
    pages:[],
    currPage:1,
   };

   async componentDidMount(){
    // API call using fetch or axios
    // Parameters :api_key,query,page
    // https://api.themoviedb.org/3/search/movie?api_key=1086741c3e4aabeb8bca4aff659cf85b&query=avengers&page=1&include_adult=false

    let data = await axios.get(API_URL+"/search/movie",{
      params: {api_key: API_KEY, query: this.state.currentMovie, page:1 }
    });
      let dataOfMovies = data.data.results;
      // console.log(dataOfMovies);
      let pageCount = data.data.total_pages;
      let pages=[]; 
      for(let i=1; i<=pageCount;i++){
           pages.push(i);
      }
      this.setState ({ 
        pages: pages,
        moviesData: dataOfMovies});       
  }

   setMovie = async(newMoviename)=>{
    let data = await axios.get(API_URL+"/search/movie",{
      params: {api_key: API_KEY, query: newMoviename, page:1 }
    });
      let dataOfMovies = data.data.results;
      let pageCount = data.data.total_pages;
      let pages=[]; 
      for(let i=1; i<=pageCount;i++){
           pages.push(i);
      }
      this.setState ({
        pages: pages,
         currentMovie : newMoviename,
         moviesData: dataOfMovies});       
   }

   previousPage = async()=>{
    let data = await axios.get(API_URL+"/search/movie",{
      params: {api_key: API_KEY, query: this.state.currentMovie, page:this.state.currPage-1 }
    });
      let dataOfMovies = data.data.results;
      this.setState ({ 
        moviesData: dataOfMovies,
        currPage: this.state.currPage-1,
      });      
   };
   nextPage = async()=>{
    let data = await axios.get(API_URL+"/search/movie",{
      params: {api_key: API_KEY, query: this.state.currentMovie, page:this.state.currPage+1 }
    });
      let dataOfMovies = data.data.results;
      this.setState ({ 
        moviesData: dataOfMovies,
        currPage: this.state.currPage+1,
      });    
   }
   setPage = async(pageCount)=>{
    let data = await axios.get(API_URL+"/search/movie",{
      params: {api_key: API_KEY, query: this.state.currentMovie, page:pageCount }
    });
      let dataOfMovies = data.data.results;
      this.setState ({ 
        moviesData: dataOfMovies,
        currPage: pageCount,
      });       
  };


  render() { 
    return ( 
      <Router>
       <div className="App">
           <Header  setMovie = {this.setMovie}> </Header>

        <Switch>
          <Route path="/" exact>
           {/* Conditional Rendering */}
           {this.state.moviesData.length?(
             <React.Fragment>
             <Movies movies = {this.state.moviesData}> </Movies>
           <Pagination pages={this.state.pages} currPage={this.state.currPage}
           previousPage={this.previousPage} nextPage={this.nextPage} setPage={this.setPage}></Pagination>
             </React.Fragment>
           ):(<h1>OOPS,NO MOVIES FOUND</h1>)}
        </Route>

        <Route path="/fav" exact>
            <Favourite></Favourite>
        </Route>

        <Route path="/moviepage" exact component={MoviePage}>
        </Route>

       </Switch>
           </div>
     </Router>
     );
  }
}
 
export default App;

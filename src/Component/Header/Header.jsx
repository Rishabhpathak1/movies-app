import React, { Component } from 'react';
import "./Header.css";
import {Link} from "react-router-dom";

class Header extends Component {
    state = { 
        newMovieName:""
     }

     handleOnChange =(e)=>{
        let value = e.target.value;
         this.setState({
             newMovieName:value,
         });
     };

     onKeyPress =(e)=>{
         if(e.key === "Enter"){
           this.props.setMovie(this.state.newMovieName);
         }
     };

    render() { 
        return ( 
            <div className="header">
                <div className="logo">
                    <img src="logo.svg" alt="" />
                </div>
                <div className="search-bar">
                    <input className="search" value ={this.state.newMovieName} onChange={this.handleOnChange} onKeyPress={this.onKeyPress} type="text" placeholder="Search" />
                </div>

                <div className="header-links">
                    <div className="header-link">
                        <Link to="/">Home</Link>
                    </div>

                    <div className="header-link">
                        <Link to="/fav">Favourites</Link>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Header;
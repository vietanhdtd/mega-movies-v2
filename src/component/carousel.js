import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      direction: null,
      randomMovie: {backdrop_path: "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg", title: "Avenger: End Game", id: 299536},
    };
  }


  randomMovieImage = () => {
    if(this.props.allMovies === undefined) return ""
    else {
    let movie = this.props.allMovies[Math.floor(Math.random() * this.props.allMovies.length)]
    console.log(movie)
    this.setState({ randomMovie: movie })
  }}


  handleSelect(selectedIndex, e) {
    this.randomMovieImage()
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }


  movieDetails(id) {
    this.props.movieDetails(id)
  }


  render() {
    const { index, direction, randomMovie } = this.state;
    console.log(this.state.randomMovie)
    return (
      <Carousel className="m-3 w-100"
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        indicators="false"
        slide="false"
      >
        <Carousel.Item>
          <div className="d-flex justify-content-center">
          <Link to={`/View/Movies/${randomMovie.id}`} onClick={() => this.movieDetails(randomMovie.id)}>
            <img
            style={{width: 1000, height:"100%"}}
            className="d-block"
            src={"https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path}
            alt="First slide"
          />
          </Link>
          </div>
          <Carousel.Caption>
            <h4>
              {randomMovie.title} ({moment(randomMovie.release_date).format('YYYY')})
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="d-flex justify-content-center">
        <Link to={`/View/Movies/${randomMovie.id}`} onClick={() => this.movieDetails(randomMovie.id)}>
        <img
            style={{width: 1000, height:"100%"}}
            className="d-block"
            src={"https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path}
            alt="Third slide"
          />
        </Link>
        </div>
          <Carousel.Caption>
            <h4>{randomMovie.title} ({moment(randomMovie.release_date).format('YYYY')})</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="d-flex justify-content-center">
        <Link to={`/View/Movies/${randomMovie.id}`} onClick={() => this.movieDetails(randomMovie.id)}>
          <img
            style={{width: 1000, height:"100%"}}
            className="d-block"
            src={"https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path}
            alt="Third slide"
          />
          </Link>
        </div>
          <Carousel.Caption>
            <h4>{randomMovie.title} ({moment(randomMovie.release_date).format('YYYY')})</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="d-flex justify-content-center"> 
        <Link to={`/View/Movies/${randomMovie.id}`} onClick={() => this.movieDetails(randomMovie.id)}>
          <img
            style={{width: 1000, height:"100%"}}
            className="d-block"
            src={"https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path}
            alt="Third slide"
          />
          </Link>
        </div>
          <Carousel.Caption>
            <h4>{randomMovie.title} ({moment(randomMovie.release_date).format('YYYY')})</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="d-flex justify-content-center"> 
        <Link to={`/View/Movies/${randomMovie.id}`} onClick={() => this.movieDetails(randomMovie.id)}>
          <img
            style={{width: 1000, height:"100%"}}
            className="d-block"
            src={"https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path}
            alt="Third slide"
          />
          </Link>
        </div>
          <Carousel.Caption>
            <h4>{randomMovie.title} ({moment(randomMovie.release_date).format('YYYY')})</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default ControlledCarousel;
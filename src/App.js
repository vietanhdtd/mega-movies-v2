import React from 'react';
import './App.css';
import moment from 'moment';
import {
  Button, Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Card, CardImg, Badge,
  Row, ButtonGroup, UncontrolledTooltip
} from "reactstrap";
import { notEqual } from 'assert';
import Modal from 'react-modal';
import YouTube from '@u-wave/react-youtube';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      genres: [],
      search: [],
      pageNumber: 1,
      updateAPI: "/discover/movie",
      query: "",
      allMovies: [],
      movies: [],
      yearRange: { min: 1990, max: 2019 },
      genre_ids: [],
      actionMovies: [],
      comedyMovies: [],
      animationMovies: [],
      horrorMovies: [],
      fantasyMovies: [],
      popoverOpen: false,
      isOpen: false,
      videoKey: "",
      movieId: ''
    }
  }
  componentDidMount() {
    this.getMoviesData()
  }

  updateQuery(evt) {

    this.setState({
      query: evt.target.value,
      updateAPI: "/search/movie",
      pageNumber: 1,
      movies: []
    });
  }

  getNowPlayingMovies = () => {
    this.setState({
      updateAPI: "/movie/now_playing",
      query: "",
      pageNumber: 1,
      movies: []
    })
    console.log("nowplaying", this.state.pageNumber)
    this.getMoviesData()
    return this.renderMovies()
  }
  getTopRatedMovies = () => {
    this.setState({
      updateAPI: "/movie/top_rated",
      query: "",
      pageNumber: 1,
      movies: []
    })
    console.log("getTopRatedMovies", this.state.pageNumber)
    this.getMoviesData()
  }

  getUpcomingMovies = () => {
    this.setState({
      updateAPI: "/movie/upcoming",
      query: "",
      pageNumber: 1,
      movies: []
    })
    return this.getMoviesData()
  }

  selectGenresAction = () => {
    const actionMovies = this.state.allMovies.filter(movie => {
      return movie.genre_ids.some(idx => idx === 28) === true
    })
    this.setState({
      movies: actionMovies,
      actionMovies: actionMovies
    })
    return this.renderMovies()
  }
  selectGenresComedy = () => {
    const comedyMovies = this.state.allMovies.filter(movie => {
      return movie.genre_ids.some(idx => idx === 35) === true
    })
    this.setState({
      movies: comedyMovies,
      comedyMovies: comedyMovies
    })
    return this.renderMovies()
  }
  selectGenresAnimation = () => {
    const animationMovies = this.state.allMovies.filter(movie => {
      return movie.genre_ids.some(idx => idx === 16) === true
    })
    this.setState({
      movies: animationMovies,
      animationMovies: animationMovies
    })
    return this.renderMovies()
  }
  selectGenresFantasy = () => {
    const fantasyMovies = this.state.allMovies.filter(movie => {
      return movie.genre_ids.some(idx => idx === 14) === true
    })
    this.setState({
      movies: fantasyMovies,
      fantasyMovies: fantasyMovies
    })
    return this.renderMovies()
  }
  selectGenresHorror = () => {
    const horrorMovies = this.state.allMovies.filter(movie => {
      return movie.genre_ids.some(idx => idx === 27) === true
    })
    this.setState({
      movies: horrorMovies,
      horrorMovies: horrorMovies
    })
    return this.renderMovies()
  }
  showAllMovies = () => {
    const { allMovies } = this.state
    this.setState({
      movies: allMovies
    })
    return this.renderMovies()
  }
  sortMostRated = () => {
    const newMovies = this.state.movies.sort((a, b) => {
      return b.vote_average - a.vote_average
    })
    console.log("data", this.state.movies)
    this.setState({
      movies: newMovies
    })
    return this.renderMovies()
  }
  loadMoreBtn = () => {
    const { pageNumber } = this.state
    this.setState({
      pageNumber: pageNumber + 1
    })
    return this.getMoviesData()
  }

  getMoviesData = async () => {
    const API_KEY = "eb80f0da925cba79d538d53b7ca005cc";
    const { pageNumber, updateAPI, query } = this.state
    const url = `https://api.themoviedb.org/3${updateAPI}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&query=${query}`
    let response = await fetch(url);
    let data = await response.json();
    let newState = data.results
    this.setState({
      movies: this.state.movies.concat(newState),
      allMovies: this.state.allMovies.concat(newState)
    })
    // console.log("pageNumber", this.state.pageNumber)
    // console.log("data", this.state.movies)
  }




  getPosterImgUrl(poster_path) {
    return poster_path === null ? `https://previews.123rf.com/images/mousemd/mousemd1710/mousemd171000009/87405336-404-not-found-concept-glitch-style-vector.jpg` : `https://image.tmdb.org/t/p/w500${poster_path}`
  }

  getMoviesVideos = async (movieId) => {
    const API_KEY = "eb80f0da925cba79d538d53b7ca005cc";
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US    `
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      videoKey: data.results[Math.floor(Math.random()*data.results.length)].key,
    })
  }




  renderModal = (movieId) => {
    this.getMoviesVideos(movieId)
  }
  handleCloseModal = () => {
    this.setState({ isOpen: false });
  }



  renderMovies() {
    console.log("thisstate", this.state)
    return this.state.movies.map(({ title, poster_path, release_date, backdrop_path, vote_average, id }) => {
      return (
        <Card style={{ width: '15rem', height: '34rem', margin: 15, backgroundColor: "black", display: "flex", paddingBottom: 40 }}>
          <CardImg src={this.getPosterImgUrl(poster_path, backdrop_path)} alt="Card image cap" />
          <div className="text-white pt-3"><h5>{title}</h5></div>
          <div className="h-100 d-flex">
            <Row className="align-self-end w-100">
              <Col md={10}><p className="text-white-50">{moment(release_date).format('LL')}</p></Col>
              <Col md={2}><Badge color="warning">{vote_average}</Badge></Col>
            </Row>
          </div>
          <Row>
            <button onClick={() => this.setState({ isOpen: true, movieId: id }, () => this.renderModal(id))}>Watch Trailer</button>
          </Row>
        </Card>
      )
    })
  }

  render() {
    return (


      <div style={{ backgroundColor: "black" }}>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay:{
              backgroundColor:"rgba(0, 0, 0, 0)",
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              marginRight: '-10%',
            },
            content : {
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
              marginRight: '0%',
              backgroundColor:"rgba(0, 0, 0, 0)",
              border:"none",
            }
          }}
            >
          <YouTube video={this.state.videoKey} 
          height="90%"
          width="90%"
          />
        </Modal>

        <Navbar style={{ backgroundColor: 'rgba(52, 52, 52, 0.7)' }} dark expand="md" sticky="top">
          <NavbarBrand className="align-center" href="/"> <img src="https://img.icons8.com/cotton/64/000000/the-oscars.png" width="40" height="40" />Movie Time</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink href="#" onClick={this.getNowPlayingMovies} className="text-warning">Now Playing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.getTopRatedMovies} className="text-warning">Top Rated</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.getUpcomingMovies} className="text-warning">Upcoming</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <InputGroup>
                <Input placeholder="Find a movie" value={this.state.query} onChange={evt => this.updateQuery(evt)} />
                <InputGroupAddon addonType="prepend">
                  <Button color="warning"
                    className="search-button" onClick={this.getMoviesData}>
                    Search
                                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
          </Nav>
        </Navbar>
        {/*The fetched list of movies*/}
        <div className="m-0 w-100">
          <Row className="w-100">
            <Col md={2} className="p-5">
              <Row>
                <ButtonGroup vertical>
                  <div>
                    <p>Genres<span style={{ color: "white" }} id="UncontrolledTooltipExample">Genres</span>.</p>
                    <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                      Hello world!
                        </UncontrolledTooltip>
                  </div>
                  <Button outline color="warning" onClick={this.showAllMovies}>All Movies {this.state.allMovies.length === 0 ? null : <Badge color="warning">{this.state.allMovies.length}</Badge>}</Button>
                  <Button outline color="warning" onClick={this.selectGenresAction}>Action {this.state.actionMovies.length === 0 ? null : <Badge color="warning">{this.state.actionMovies.length}</Badge>}</Button>
                  <Button outline color="warning" onClick={this.selectGenresComedy}>Comedy {this.state.comedyMovies.length === 0 ? null : <Badge color="warning">{this.state.comedyMovies.length}</Badge>}</Button>
                  <Button outline color="warning" onClick={this.selectGenresAnimation}>Animation {this.state.animationMovies.length === 0 ? null : <Badge color="warning">{this.state.animationMovies.length}</Badge>}</Button>
                  <Button outline color="warning" onClick={this.selectGenresFantasy}>Fantasy {this.state.fantasyMovies.length === 0 ? null : <Badge color="warning">{this.state.fantasyMovies.length}</Badge>}</Button>
                  <Button outline color="warning" onClick={this.selectGenresHorror}>Horror {this.state.horrorMovies.length === 0 ? null : <Badge color="warning">{this.state.horrorMovies.length}</Badge>}</Button>
                </ButtonGroup>
              </Row>
              <Row>
                <Button href="#" onClick={this.sortMostRated}>Most Vote</Button>
              </Row>
            </Col>

            <Col className="content">
              <Container style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {this.renderMovies()}
              </Container>
            </Col>
          </Row>
        </div>
        <div className="h-50 pb-4 d-flex justify-content-center">
          <Button color="warning" size="lg" onClick={this.loadMoreBtn}>Load More</Button>
        </div>
      </div>
    )
  }
}

export default App;

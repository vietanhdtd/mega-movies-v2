import React from 'react';
import Modal from 'react-modal';
import YouTube from '@u-wave/react-youtube';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            videoKey:""
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.getMoviesVideos()
    }

    getMoviesVideos = async () => {
        const API_KEY = "eb80f0da925cba79d538d53b7ca005cc";
        const url = `https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=${API_KEY}&append_to_response=videos`
        let response = await fetch(url);
        let data = await response.json();
        console.log("movies data",data)
        this.setState({
            title: data.title,
            overview: data.overview,  
            videoKey: data.videos.results[Math.floor(Math.random() * data.videos.results.length)].key,
            backdrop: data.backdrop_path
        })
        
    }
    render() {
        console.log(this.state.backdrop)
        const {title, overview} = this.state
        return (
            <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${this.state.backdrop})`,
                        backgroundSize:"cover"
            }} className="h-100">
                <div className="container" style={{backgroundColor:"black"}}>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <YouTube video={this.state.videoKey}
                            height="35%"
                            width="50%"
                            />
                </div>
            </div>
        )
    }

}
export default MovieDetails;
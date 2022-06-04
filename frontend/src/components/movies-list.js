import React , {useState, useEffect} from "react";
import MovieDataService from '../services/movies.js';
import {Link} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const MoviesList = props => {
	const [movies, setMovies] = useState([]);
	const [searchTitle, setSearchTitle] = useState('');
	const [searchRating, setSearchRating] = useState('');
	const [ratings, setRatings] = useState(['All Ratings']);
    
	useEffect(() => {
		retrieveMovies();
		retrieveRatings();
	}, []);

	const retrieveMovies = () => {
		MovieDataService.getAll()
			.then(response => {
				console.log(response.data);
				setMovies(response.data.movies);
			})
			.catch(e => {
				console.log(e);
			})
	}

	const retrieveRatings = () => {
		MovieDataService.getRatings()
			.then(response => {
				// start with 'All ratings' if user doesn't specify any ratings
				setRatings(['All Ratings'].concat(response.data));
				console.log(ratings);
			})
	}

	const onChangeSearchTitle = e => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	}
    
	const onChangeSearchRating = e => {
		const searchRating = e.target.value;
		setSearchRating(searchRating);
	}

	return(
		<div className="App">
			<Container>
				<Form>
					<Row>
					<Col>
							<Form.Group>
								<Form.Control
									type='text'
									placeholder="Search by title"
									value={searchTitle}
									onChange={onChangeSearchTitle}
								>
								</Form.Control>
							</Form.Group>
							<Button
								variant="primary"
								type="button"
								//onClick={findByTitle}
							>
								Search
							</Button>
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									as='select'
									onChange={onChangeSearchRating}
								>
								{
									ratings.map((rating, index) => <option key={index} value={rating}>{rating}</option>)
								}
								</Form.Control>
							</Form.Group>
							<Button
								variant="primary"
								type="button"
								//onClick={findByTitleRating}
							>
								Search
							</Button>
						</Col>
					</Row>
				</Form>

				<Row>
					{
						movies.map(movie => {
							return (
								<Col sm="6" md="4" lg="3" key={movie._id}>
									<Card style={{width:'18rem'}}>
										<Card.Img style={{width:'75%'}} src={movie.poster + "/100px180"}/>
										<Card.Body>
											<Card.Title>{movie.title}</Card.Title>
											<Card.Text>
												Rating : {movie.rated}
											</Card.Text>
											<Card.Text>{movie.plot}</Card.Text>
											<Link to={'/movies/'+movie._id}>View reviews</Link>
										</Card.Body>
									</Card>
								</Col>
							);
						})
					}
				</Row>
			</Container>
		</div>
	
	);
}

export default MoviesList;
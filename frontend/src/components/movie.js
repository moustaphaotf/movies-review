import React, {useState, useEffect} from "react";
import MovieDataService from '../services/movies.js';
import {Link, useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
//import Media from 'react-bootstrap/Media';


const Movie = (props) => {
	const navigate = useNavigate()
	const params = useParams();

	const [movie, setMovie] = useState({
		id:null,
		title:"",
		rated:"",
		reviews:[]
	});

	const getMovie = id => {
		MovieDataService.get(id)
			.then(response => {
				setMovie(response.data);
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			})
	};

	useEffect(() => {
		getMovie(params.id);
	}, [params.id]);


	return(
		<div className="App">
			<Container>
				<Row className="pt-2">
					<Col className="offset-2 col-8 mb-2 offset-sm-0 col-sm-6"><Image alt={movie.title} src={movie.poster+"/100px250"} fluid/></Col>
					<Col className="col-12 col-sm-6">
						<Card>
							<Card.Header as="h5">{movie.title}</Card.Header>
							<Card.Body>
								<Card.Text style={{textAlign:"justify"}}>{movie.fullplot}</Card.Text>
								{
									props.user &&
										<Link
											to={"/movies/" + params.id + "/review"}
										>Add Review</Link>
								}
							</Card.Body>
						</Card>
						<br /><br />
						<h2>Reviews</h2>
						<div>
							{
								movie.reviews.map((r) => {
									return (
										<div key={r._id}>
											<div>
												<div><strong>{r.name}</strong> reviewed on <span>{moment(r.date).format("Do MMMM YYYY")}</span></div>
												<div className="p-2" style={{textAlign:"justify"}}>{r.review}</div>
												{
														props.user && props.user.id == r.user_id &&
														<div className="btn-group">
															<Button className="btn btn-primary" 
																onClick={() => {
																	navigate(
																		"/movies/"+params.id+"/review", {
																			state:{
																				currentReview:r
																			}
																		}
																	);
																}}
															>Edit</Button>
															<Button className="btn btn-danger" >Delete</Button>
														</div>
												}
											</div>
											<hr />
										</div>
									);
								})
							}
						</div>
					</Col>
				</Row>
			</Container>
		</div>

	);
}

export default Movie;
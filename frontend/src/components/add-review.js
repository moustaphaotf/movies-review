
import React, {useState} from "react";
import MovieDataService from '../services/movies.js'
import {Link, useLocation, useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const AddReview = props => {
	const params = useParams();
	const location = useLocation();


	let editing = false;
	let initialReviewState = "";

	if(location.state && location.state.currentReview){
		editing = true;
		initialReviewState = location.state.currentReview.review;
	}

	const [review, setReview] = useState(initialReviewState);
	const [submitted, setSubitted] = useState(false);

	const onChangeReview = e => {
		const review = e.target.value;
		setReview(review);
	}

	const saveReview = () => {
		const data = {
			review,
			name:props.user.name,
			user_id: props.user.id,
			movie_id: params.id
		}

		if(editing){
			// get existing review id
			data.review_id = location.state.currentReview._id;

			MovieDataService.updateReview(data)
				.then(response => {
					setSubitted(true);
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				});
		}
		else{
			MovieDataService.createReview(data)
				.then(response => {
					setSubitted(true);
				})
				.catch(e => {
					console.log(e);
				});
			}
		}

    return(
			<div className="App">
				<Container>
					{
						submitted ?(
							<div>
								<h4>Review submitted successfully</h4>
								<Link to={"/movies/" + params.id}>Back to movie</Link>
							</div>
						) : (	
						<Form>
							<Form.Group>
								<Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
								<Form.Control
									type="text"
									value={review}
									required
									onChange={onChangeReview}
								>
								</Form.Control>
								<Button
									variant="primary"
									onClick={saveReview}
								>
									Submit
								</Button>
							</Form.Group>
						</Form>
					)}
				</Container>
			</div>

    );
}

export default AddReview;
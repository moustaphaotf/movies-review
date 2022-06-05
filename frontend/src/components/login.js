import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = props => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [id, setId] = useState("");

	const onChangeName = e => {
		const name = e.target.value;
		setName(name);
	}

	const onChangeId = e => {
		const id = e.target.value;
		setId(id);
	}

	const login = () => {
		props.login({name, id});
		navigate(-1);
	}

	return (
		<div className="App">
			<Container>
				<Row className="pt-3">
					<Col className="col-12 offset-sm-2 col-sm-8">
						<Form>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter username"
									value={name}
									onChange={onChangeName}
								></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>ID</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter ID"
									value={id}
									onChange={onChangeId}
								></Form.Control>
							</Form.Group>
							<Button
								variant="primary"
								onClick={login}
							>Submit</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Login;
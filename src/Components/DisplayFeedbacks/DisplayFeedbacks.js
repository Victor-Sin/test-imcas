import React from 'react';
import classes from './DisplayFeedbacks.module.css';
import { useParams, useNavigate } from 'react-router-dom';

//Components
import Feedback from '../../Components/Feedback/Feedback';

const DisplayFeedbacks = props => {
	const { id } = useParams();
	const nav = useNavigate();

	const feedbacks = props.data.map(elt => {
		if (props.single) {
			if (parseInt(id) === elt.id) {
				return (
					<Feedback
						data={elt}
						user={elt.user}
						language={props.language}
						key={elt.id}
						single={true}
					/>
				);
			} else return null;
		} else
			return (
				<Feedback
					data={elt}
					user={elt.user}
					language={props.language}
					key={elt.id}
					single={false}
				/>
			);
	});

	return (
		<>
			<ul className={classes.comments}>{feedbacks}</ul>
			{props.single ? (
				<button
					onClick={() => nav('/')}
					className={classes.comments_back}
				>
					Retour
				</button>
			) : null}
		</>
	);
};

export default DisplayFeedbacks;

import React from 'react';
import classes from './Feedback.module.css';
import { Link } from 'react-router-dom';

const Feedback = props => {
	//functions
	/**
	 * Get the language version selected for every elements with langage variation,
	 *
	 * @param {String} language, {Object} data
	 * @returns [comment,native country]
	 */
	function getTranslation(data, language) {
		const comment = data.translations;
		const country = data.user.country.translations;
		const specialty = data.user.specialty.translations;

		const result = [];

		result.push(getEltTranslate(comment, language, 'content'));
		result.push(getEltTranslate(country, language, 'name'));
		result.push(getEltTranslate(specialty, language, 'name'));

		return result;
	}

	/**
	 * Take the current element and get his content in the language choose
	 * return english version by default
	 *
	 * @param {Object} elt
	 * @param {String} language
	 * @param {String} content
	 * @returns String
	 */
	const getEltTranslate = (elt, language, content) => {
		const tmp = elt.filter(e => e.locale === language);
		return tmp.length !== 0
			? tmp[0][content]
			: elt.filter(e => e.locale === 'en')[0][content];
	};

	const translation = getTranslation(props.data, props.language);

	return (
		<Link
			to={'/feedbacks/' + props.data.id}
			style={props.single ? { pointerEvents: 'none' } : null}
		>
			<li className={classes.comment}>
				<img
					src={props.user.picture_url}
					alt={
						'Photo de profil de ' +
						props.user.first_name +
						' ' +
						props.user.last_name
					}
					className={classes.comment_photo}
				></img>
				<div className={classes.comment_content}>
					<span className={classes.content_title}>
						<h3>{props.user.fullname}</h3> -{' '}
						<h4>
							{translation[2]}, {translation[1]}
						</h4>
					</span>
					<cite className={classes.content_text}>
						"{translation[0]}"
					</cite>
				</div>
			</li>
		</Link>
	);
};

export default Feedback;

import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from './../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		submitting,
		cancelFormOpen,
		activity: initialFormState,
		loadSingleActivity
	} = activityStore;

	useEffect(() => {
		if (match.params.id) {
			loadSingleActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
		}
	});

	const [ activity, setActivity ] = useState<IActivity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	});

	const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid()
			};

			createActivity(newActivity);
		} else {
			editActivity(activity);
		}
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input onChange={handleInputChange} name="title" placeholder="Title" value={activity.title} />
				<Form.TextArea
					onChange={handleInputChange}
					name="description"
					placeholder="Description"
					value={activity.description}
				/>
				<Form.Input
					onChange={handleInputChange}
					name="category"
					placeholder="Category"
					value={activity.category}
				/>
				<Form.Input
					onChange={handleInputChange}
					name="date"
					type="datetime-local"
					placeholder="Date"
					value={activity.date}
				/>
				<Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
				<Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
				<Button onClick={cancelFormOpen} type="button" floated="right" content="Cancel" />
				<Button loading={submitting} content="Submit" floated="right" positive type="submit" />
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);

import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from './../../../app/models/activity';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState }) => {
	const initializeForm = () => {
		initialFormState
			? initialFormState
			: {
					id: '',
					title: '',
					category: '',
					description: '',
					date: '',
					city: '',
					venue: ''
				};
	};

	const [ activity, setActivity ] = useState<IActivity>(initializeForm);

	return (
		<Segment clearing>
			<Form>
				<Form.Input placeholder="Title" value={activity.title} />
				<Form.TextArea placeholder="Description" value={activity.description} />
				<Form.Input placeholder="Category" value={activity.category} />
				<Form.Input type="date" placeholder="Date" value={activity.date} />
				<Form.Input placeholder="City" value={activity.city} />
				<Form.Input placeholder="Venue" value={activity.venue} />
				<Button onClick={() => setEditMode(false)} type="button" floated="right" content="Cancel" />
				<Button content="Submit" floated="right" positive type="submit" />
			</Form>
		</Segment>
	);
};

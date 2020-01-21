import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from './../../../app/models/activity';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState }) => {
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				title: '',
				category: '',
				description: '',
				date: '',
				city: '',
				venue: ''
			};
		}
	};

	const [ activity, setActivity ] = useState<IActivity>(initializeForm);
	const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit = () => {
		console.log(activity);
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
					type="date"
					placeholder="Date"
					value={activity.date}
				/>
				<Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
				<Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
				<Button onClick={() => setEditMode(false)} type="button" floated="right" content="Cancel" />
				<Button content="Submit" floated="right" positive type="submit" />
			</Form>
		</Segment>
	);
};
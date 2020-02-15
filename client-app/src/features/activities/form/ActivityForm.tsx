import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from './../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import {Form as FinalForm, Field} from 'react-final-form';

interface DetailParams {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		submitting,
		activity: initialFormState,
		loadSingleActivity,
		clearActivity
	} = activityStore;

	const [ activity, setActivity ] = useState<IActivity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	});

	useEffect(
		() => {
			if (match.params.id && activity.id.length === 0) {
				loadSingleActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
			}

			return () => {
				clearActivity();
			};
		},
		[ loadSingleActivity, clearActivity, match.params.id, initialFormState, activity.id.length ]
	);

	const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};
/* 
	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid()
			};

			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
		}
	}; */

	const handleFinalFormSubmit = (values: any) => {
		console.log(values);
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
				<FinalForm onSubmit={handleFinalFormSubmit} render={({handleSubmit}) => (

					<Form onSubmit={handleSubmit} >
						<Field
							
							name="title"
							placeholder="Title"
							value={activity.title}
							component='input'
						/>
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
						<Form.Input
							onChange={handleInputChange}
							name="venue"
							placeholder="Venue"
							value={activity.venue}
						/>
						<Button
							onClick={() => history.push('/activities')}
							type="button"
							floated="right"
							content="Cancel"
						/>
						<Button loading={submitting} content="Submit" floated="right" positive type="submit" />
					</Form>
						
					)}/>
					
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityForm);

import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivityFormValues } from './../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from './../../../app/common/form/TextInput';
import TextAreaInput from './../../../app/common/form/TextAreaInput';
import SelectInput from './../../../app/common/form/SelectInput';
import { category } from './../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from './../../../app/common/util/util';
import { ActivityFormValues } from '../../../app/models/activity';

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

	const [ activity, setActivity ] = useState(new ActivityFormValues());
	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			if (match.params.id) {
				setLoading(true);
				loadSingleActivity(match.params.id)
					.then((activity) => setActivity(new ActivityFormValues(activity)))
					.finally(() => setLoading(false));
			}
		},
		[ loadSingleActivity, match.params.id ]
	);

	const handleFinalFormSubmit = (values: any) => {
		const dateAndTime = combineDateAndTime(values.date, values.time);
		const { date, time, ...activity } = values;
		activity.date = dateAndTime;
		if (!activity.id) {
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
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
					<FinalForm
						initialValues={activity}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit }) => (
							<Form onSubmit={handleSubmit} loading={loading}>
								<Field name="title" placeholder="Title" value={activity.title} component={TextInput} />
								<Field
									name="description"
									rows={3}
									placeholder="Description"
									value={activity.description}
									component={TextAreaInput}
								/>
								<Field
									name="category"
									placeholder="Category"
									value={activity.category}
									component={SelectInput}
									options={category}
								/>
								<Form.Group widths="equal">
									<Field
										name="date"
										date={true}
										placeholder="Date"
										value={activity.date}
										component={DateInput}
									/>
									<Field
										name="time"
										time={true}
										placeholder="Time"
										value={activity.time}
										component={DateInput}
									/>
								</Form.Group>

								<Field component={TextInput} name="city" placeholder="City" value={activity.city} />
								<Field component={TextInput} name="venue" placeholder="Venue" value={activity.venue} />
								<Button
									onClick={
										activity.id ? (
											() => history.push(`/activities/${activity.id}`)
										) : (
											() => history.push('/activities')
										)
									}
									type="button"
									floated="right"
									content="Cancel"
									disabled={loading}
								/>
								<Button
									disabled={loading}
									loading={submitting}
									content="Submit"
									floated="right"
									positive
									type="submit"
								/>
							</Form>
						)}
					/>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityForm);

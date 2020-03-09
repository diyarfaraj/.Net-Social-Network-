import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import TextInput from './../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/layout/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from './../../app/common/form/ErrorMessage';
import { register } from './../../serviceWorker';

const validate = combineValidators({
	username: isRequired('username'),
	displayName: isRequired('display name'),
	email: isRequired('email'),
	password: isRequired('password')
});

const RegisterForm = () => {
	const rootStore = useContext(RootStoreContext);

	const { register } = rootStore.userStore;
	return (
		<FinalForm
			onSubmit={(values: IUserFormValues) =>
				register(values).catch((error) => ({
					[FORM_ERROR]: error
				}))}
			/* validate={validate} */
			render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
				<Form onSubmit={handleSubmit} error>
					<Header as="h2" content="Register to Robotia" color="teal" textAlign="center" />
					<Field name="username" component={TextInput} placeholder="Username" />
					<Field name="displayName" component={TextInput} placeholder="Display Name" />
					<Field name="email" component={TextInput} placeholder="Email" />
					<Field name="password" type="password" component={TextInput} placeholder="Password" />

					<Button
						disabled={(invalid && !dirtySinceLastSubmit) || pristine}
						loading={submitting}
						color="teal"
						content="Register"
						fluid
					/>
					<br />
					<br />

					{submitError &&
					!dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />
					)}
				</Form>
			)}
		/>
	);
};

export default RegisterForm;

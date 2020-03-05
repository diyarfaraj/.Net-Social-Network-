import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import TextInput from './../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/layout/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
	email: isRequired('email'),
	password: isRequired('password')
});

const LoginForm = () => {
	const rootStore = useContext(RootStoreContext);

	const { login } = rootStore.userStore;
	return (
		<FinalForm
			onSubmit={(values: IUserFormValues) =>
				login(values).catch((error) => ({
					[FORM_ERROR]: error
				}))}
			validate={validate}
			render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
				<Form onSubmit={handleSubmit}>
					<Header as="h2" content="Login to Robotia" color="teal" textAlign="center" />
					<Field name="email" component={TextInput} placeholder="Email" />
					<Field name="password" type="password" component={TextInput} placeholder="Password" />

					<Button
						disabled={(invalid && !dirtySinceLastSubmit) || pristine}
						loading={submitting}
						color="teal"
						content="Login"
						fluid
					/>
					<br />
					<br />

					{submitError &&
					!dirtySinceLastSubmit && <Label color="red" basic content={submitError.statusText} />}
				</Form>
			)}
		/>
	);
};

export default LoginForm;

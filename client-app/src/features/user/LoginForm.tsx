import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from './../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/layout/user';

const LoginForm = () => {
	const rootStore = useContext(RootStoreContext);

	const { login } = rootStore.userStore;
	return (
		<FinalForm
			onSubmit={(values: IUserFormValues) => login(values)}
			render={({ handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
					<Field name="email" component={TextInput} placeholder="Email" />
					<Field name="password" type="password" component={TextInput} placeholder="Password" />
					<Button positive content="Login" />
				</Form>
			)}
		/>
	);
};

export default LoginForm;

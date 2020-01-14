import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
	state = {
		activities: []
	};

	componentDidMount() {
		axios.get('http://localhost:5000/api/activities/').then((response) => {
			this.setState({
				activities: response.data
			});
		});
	}

	render() {
		return (
			<div>
				<Header as="h2">
					<Icon name="users" />
					<Header.Content>Robotia</Header.Content>
				</Header>

				<List>
					{this.state.activities.map((activities: any) => (
						<List.Item key={activities.id}>{activities.name}</List.Item>
					))}
				</List>

				<ul />
			</div>
		);
	}
}

export default App;

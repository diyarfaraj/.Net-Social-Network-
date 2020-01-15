import React from 'react';
import { Menu, Header, Container, Button } from 'semantic-ui-react';

export const NavBar = () => {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>
					<img src="/client-app/public/assets/logo.png" alt="" />
					Robotia
				</Menu.Item>
				<Menu.Item>
					<Button positive content="Create Activity" />
				</Menu.Item>
				<Menu.Item name="friends" />
			</Container>
		</Menu>
	);
};

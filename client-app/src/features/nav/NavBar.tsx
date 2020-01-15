import React from 'react';
import { Menu, Header, Container } from 'semantic-ui-react';

export const NavBar = () => {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>
					<img src="/assets/logo.png" alt="" />
					Robotia
				</Menu.Item>
				<Menu.Item name="messages" />
				<Menu.Item name="friends" />
			</Container>
		</Menu>
	);
};

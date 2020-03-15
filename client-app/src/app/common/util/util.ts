import { IActivity } from '../../models/activity';
import { IUser } from '../../layout/user';

export const combineDateAndTime = (date: Date, time: Date) => {
	const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

	const year = date.getFullYear();
	const month = date.getMonth() + 1;

	const day = date.getDate();

	const dateString = `${year}-${month}-${day}`;

	return new Date(dateString + ' ' + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
	activity.date = new Date(activity.date);
	activity.isGoing = activity.attendees.some((a) => a.username === user.username);
	activity.isHost = activity.attendees.some((a) => a.username === user.username && a.isHost);
	console.log('IsHost' + activity.isHost);
	console.log('isGoing' + activity.isGoing);
	console.log(user.username);
	console.log(activity.attendees);
	console.log(activity.title);

	return activity;
};

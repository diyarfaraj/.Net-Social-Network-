import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

export class ActivityStore {
	@observable activityRegistry = new Map();
	@observable loadingInitial = false;
	@observable activity: IActivity | null = null;
	@observable submitting = false;
	@observable target = '';

	@computed
	get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	}

	@action
	loadActivities = async () => {
		this.loadingInitial = true;
		try {
			const activities = await agent.Activities.list();
			runInAction('loading activities ', () => {
				activities.forEach((activity) => {
					activity.date = activity.date.split('.')[0];
					this.activityRegistry.set(activity.id, activity);
				});
				this.loadingInitial = false;
			});
		} catch (e) {
			runInAction('loading activities error', () => {
				console.log(e, 'ERROr loading activitiess');
			});
			this.loadingInitial = false;
		}
	};

	@action
	loadSingleActivity = async (id: string) => {
		let activity = this.getSingleActivity(id);
		if (activity) {
			this.activity = activity;
		} else {
			this.loadingInitial = true;
			try {
				activity = await agent.Activities.details(id);
				runInAction('getting activity', () => {
					this.activity = activity;
					this.loadingInitial = false;
				});
			} catch (error) {
				runInAction('get activity error', () => {
					this.loadingInitial = false;
				});
				console.log(error);
			}
		}
	};

	@action
	clearActivity = () => {
		this.activity = null;
	};

	getSingleActivity = (id: string) => {
		return this.activityRegistry.get(id);
	};

	@action
	createActivity = async (activity: IActivity) => {
		this.submitting = true;
		try {
			await agent.Activities.create(activity);
			runInAction('creating activity', () => {
				this.activityRegistry.set(activity.id, activity);
				this.submitting = false;
			});
		} catch (error) {
			runInAction('create activity errår', () => {
				this.submitting = false;
			});
			console.log(error, 'ERROr creating activitiess');
		}
	};

	@action
	editActivity = async (activity: IActivity) => {
		this.submitting = true;
		try {
			await agent.Activities.update(activity);
			runInAction('edit activity', () => {
				this.activityRegistry.set(activity.id, activity);
				this.activity = activity;
				this.submitting = false;
			});
		} catch (error) {
			runInAction('edit activity error', () => {
				this.submitting = false;
			});
			console.log(error, 'ERROr editing activitiess');
		}
	};

	@action
	deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
		this.submitting = true;
		this.target = event.currentTarget.name;

		try {
			await agent.Activities.delete(id);
			runInAction('delete activity', () => {
				this.activityRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
		} catch (error) {
			runInAction('delete activity error', () => {
				this.submitting = false;
				this.target = '';
			});
			console.log(error, 'ERROr deleteing activitiess');
		}
	};
}

export default createContext(new ActivityStore());

export interface IProfile {
	displayName: string;
	username: string;
	bio: string;
	image: string;
	photos: IPhoto[];
}

export interface IPhoto {
	id: string;
	url: string;
	isMain: boolean;
}

/* Glöm inte att "user.ts" finns i andra mappen. NTS */

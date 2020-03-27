import React, { Fragment, useState, useEffect } from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCroppper from './PhotoWidgetCroppper';

const PhotoUploadWidget = () => {
	const [ files, setFiles ] = useState<any[]>([]);
	const [ image, setImage ] = useState<Blob | null>(null);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	});

	return (
		<Fragment>
			<Grid>
				<Grid.Column width={4}>
					<Header color="teal" sub content="Step 1 - Add Photo" />
					<PhotoWidgetDropzone setFiles={setFiles} />
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 2 - Resize image" />
					{files.length > 0 && <PhotoWidgetCroppper setImage={setImage} imagePreview={files[0].preview} />}
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 3 - Preview & Upload" />
					{files.length > 0 && <Image src={files[0].preview} />}
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};

export default observer(PhotoUploadWidget);
/* eslint-disable @typescript-eslint/ban-types */
import * as ImagePicker from 'expo-image-picker';

type ImageSourcingMethod = 'camera' | 'cameraRoll';

// Configuration for an image sourcing method.
interface ImageSourcingConfig {
	permissionsRequester: Function; // Function to request permissions for an image source.
	launchImageSourcingMethod: Function; // Native launcher for the image source.
}

// The possible methods of retreiving an image from the device mapped to their unique configs.
const IMAGE_SOURCE_METHODS: Record<ImageSourcingMethod, ImageSourcingConfig> = {
	camera: {
		permissionsRequester: ImagePicker.requestCameraPermissionsAsync,
		launchImageSourcingMethod: ImagePicker.launchCameraAsync,
	},
	cameraRoll: {
		permissionsRequester: ImagePicker.requestCameraPermissionsAsync,
		launchImageSourcingMethod: ImagePicker.launchImageLibraryAsync,
	},
};

// Generic options for images, no matter the image source.
const IMAGE_OPTIONS: ImagePicker.ImagePickerOptions = {
	mediaTypes: ImagePicker.MediaTypeOptions.Images,
	allowsEditing: true,
	aspect: [16, 9],
	quality: 1,
};

/**
 * Launches the image sourcing method dependent on the given image source type.
 * If the user doesn't grant device permissions or the device fails to retrieve an image,
 * something will happen. :)
 *
 * @param imageSource - The method of sourcing the image.
 * @returns The user-selected image result, if successful.
 */
export async function sourceImage(imageSource: ImageSourcingMethod): Promise<ImagePicker.ImagePickerResult | null> {
	let pickedImage = {} as ImagePicker.ImagePickerResult;

	const getImageFromSource = async ({
		permissionsRequester,
		launchImageSourcingMethod,
	}: ImageSourcingConfig): Promise<ImagePicker.ImagePickerResult> => {
		const { status } = await permissionsRequester();

		if (status !== 'granted') {
			throw new Error('Permission not granted.');
		}

		return launchImageSourcingMethod(IMAGE_OPTIONS);
	};

	try {
		pickedImage = await getImageFromSource(IMAGE_SOURCE_METHODS[imageSource]);
	} catch (err: Error | unknown) {
		console.log(err);
		// TODO: display alert with error message
	}

	return pickedImage?.canceled ? null : pickedImage;
}

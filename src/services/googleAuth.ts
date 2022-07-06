import authenticationService from '../api/authentication';
import { IGoogleAuthentication } from '../interfaces/IGoogleAuthentication';

export default function googleAuth(values: IGoogleAuthentication) {
  const initialValues: IGoogleAuthentication = {
    tokenId: values.tokenId,
  };

  authenticationService
    .authenticationByGoogle(initialValues)
    .then(() => {
      console.log('Successfully authenticated!');
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
}

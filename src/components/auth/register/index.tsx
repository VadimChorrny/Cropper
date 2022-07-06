import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import RegisterPage from './register';

const Register = () => {
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey='6LegVbcgAAAAALkZEXm6e7ebJ1GQYNIo0sAb-F62'>
        <RegisterPage />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Register;

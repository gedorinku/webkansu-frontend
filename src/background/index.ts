import { Service, SignInRequestBody } from '../api/index';

(async () => {
  const requestBody: SignInRequestBody = {
    email: 'mucho613@gmail.com',
    password: '123456'
  };

  const response = await Service.signIn(requestBody);
  console.log(response);
})();

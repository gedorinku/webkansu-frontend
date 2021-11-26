import { ServiceService, SignInRequestBody } from './api';

(async () => {
  const requestBody: SignInRequestBody = {
    email: 'mucho613@gmail.com',
    password: '123456',
  };

  const response = await ServiceService.signIn(requestBody);
  console.log(response);
})();

import CypressSocial from 'cypress-social-logins';
const { GoogleSocialLogin } = CypressSocial.plugins;

const SocialLogin = (on, config) => {
  on('task', {
    GoogleSocialLogin,
  });
};

export default SocialLogin;

import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    const { data } = await axios.get('/api/users/currentuser');

    return data;
  }
  return {};
};

export default LandingPage;

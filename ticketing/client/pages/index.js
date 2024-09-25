import axios from "axios";

const LandingPage = ({currentUser}) => {
    // console.log(currentUser);
   
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    //   });

    return(
        <h1>Landing Page</h1>
    )
}

LandingPage.getInitialProps = () => {
    if(typeof window === 'undefined') {
        //we are on the server
    } else {
        //we are on the browser
    }
    return {}
};

export default LandingPage;
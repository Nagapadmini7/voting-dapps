// Importing the global stylesheet
import './globals.css';

import { VotingProvider } from '../context/Voter';
import Navbar from "../components/Navbar/Navbar";

const MyApp=({ Component, pageProps }) => {
    return (
        <VotingProvider>
            <div>
                <Navbar />
                <Component {...pageProps} />
            </div>
        </VotingProvider>
    );
};

export default MyApp;


import React from 'react';
import Navbar from '../components/Navbar';
import Error from '../components/error';
import useError from '../hooks/useError';
import Loader from '../components/Loader';
import useSession from '../hooks/useSession';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Layout = ({ children }) => {
    const { error, showError } = useError();
    const { isLoading } = useSession();
    return (
        <>
            <ErrorBoundary fallback={() => showError('An Unknown Error Occured in the Application')}>
                <Suspense fallback={<Loader />}>
                    {isLoading && <Loader />}
                    <Navbar />
                    {children}
                    <Error show={Boolean(error)} content={error} />
                </Suspense>
            </ErrorBoundary>
        </>

    )
}

export default Layout
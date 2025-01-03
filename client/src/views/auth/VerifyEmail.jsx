import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSession from '../../hooks/useSession';

const VerifyEmail = () => {
    const { verifyEmail } = useSession();
    const { id, token } = useParams();
    const [validUrl, setValidUrl] = useState(true);
    useEffect(() => {
        const verifyEmailHandler = async () => {
            try {
                const response = await verifyEmail({ id, token });
                if (response) {
                    setValidUrl(true);
                }
            } catch (err) {
                console.log(err);
                setValidUrl(false);
            }
        }
        verifyEmailHandler();
    }, [id, token]);
    return (
        <>
            {validUrl ? <div className='w-screen h-screen fixed top-0 left-0 z-50 bg-white flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-semibold'>Email verified successfully</h1>
                <p>You can now login to your account</p>
                <img src="/verified.png" alt="verified" />
            </div> : <div className='w-screen h-screen fixed top-0 left-0 z-50 bg-white flex flex-col justify-center items-center text-4xl font-semibold'>404 NOT FOUND</div>}
        </>
    )
}

export default VerifyEmail
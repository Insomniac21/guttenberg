import { auth } from '../config/firebase.config';
import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid, Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function SignIn() {
    const provider = new GoogleAuthProvider();
    const [ user, loading ] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        router.push('/');
    }

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    };

    return (
        <Grid.Container justify="center">
            <Spacer y={1} />
            <Grid xs={12} justify='center'><Button onClick={signIn}>Sign in with Google</Button></Grid>
        </Grid.Container>
    );
}
import { Grid, User, Spacer, Link } from '@nextui-org/react';
import Books from '../components/books';
import SignIn from '../components/signIn';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth } from '../config/firebase.config';
import SignOut from '../components/signout';


export default function Home() {

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  const renderUserMenu = () => {
    if (!user)
      return (
        <SignIn />
      );
    else
      return (
        <Grid xs={12} justify="center" >
          <User
            src={user?.photoURL}
            name={user?.displayName}
          />
          <Link href="/myFavorite"></Link>
          <Spacer x={4} />
          <SignOut />
        </Grid>
      );
  };

  return (
    <div className="container">
      <Grid.Container justify="center">
        <Grid xs={12} justify="center">
          <Grid xs={4} justify="center"><h1>Gutendex</h1></Grid>
          <Grid xs={4} justify="center"></Grid>
          <Grid xs={4} >
            <Grid xs={6}>            
              {renderUserMenu()}
            </Grid>
            <Grid xs={6}>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} justify="center">
          <Books />
        </Grid>
      </Grid.Container>
    </div>
  )
}

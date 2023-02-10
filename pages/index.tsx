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
        <Grid.Container justify="flex-end">
          <Grid xs={5} sm={5} md={5} lg={2}>
            <User
              src={user?.photoURL}
              name={user?.displayName}
            />
          </Grid>
          <Spacer x={2} />
          <Grid xs={5}>
            <SignOut />
          </Grid>
        </Grid.Container>
      );
  };

  return (
    <div className="container">
      <Grid.Container justify="center">
        <Grid xs={12} justify="center">
          <Grid xs={4} justify="center"><h1>Gutendex</h1></Grid>
          <Grid xs={4} justify="center"></Grid>
          <Grid xs={4}>           
            {renderUserMenu()}
          </Grid>
        </Grid>
        <Grid xs={12} justify="center">
          <Books />
        </Grid>
      </Grid.Container>
    </div>
  )
}

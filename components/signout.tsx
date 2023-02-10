import { Link } from "@nextui-org/react";
import { auth } from '../config/firebase.config';


export default function SignOut() {

    const signOut = () => {
        auth.signOut();
    };

    return (<Link onClick={signOut}>Sign out</Link>)
}
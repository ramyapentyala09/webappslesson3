import { 
    getAuth, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js"

import * as Elements from '../viewpage/elements.js'
import { DEV } from "../model/constants.js";
import * as Util from '../viewpage/util.js'

const auth = getAuth();

export function addEventListeners() {

    Elements.formSignIn.addEventListener('submit', async e => {
        e.preventDefault();
        const email = e.target.email;
        const password = e.target.password;
        const button = e.target.getElementsByTagName('button')[0];
        const label = Util.disableButton(button);
        try {
             await signInWithEmailAndPassword(auth, email, password);
             Elements.modalSignin.hide();
        } catch (e) {
if (DEV) console.log(e);
Util.info('Sign in error', JSON.stringify(e), Elements.modalSignin);
        }
        Util.enableButton(button, label);
    });

    Elements.MENU.SignOut.addEventListener('click', async () => {
        try {
await signOut(auth);
        } catch (e) {
if (DEV) console.log(e);
Util.info('Sign out error', JSON.stringify(e));
        }
    });

}
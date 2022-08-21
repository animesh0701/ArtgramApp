import { auth, provider } from "../firebase";

export const SignInWithGoogle = async () => {
  let user;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      user = res.user;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return user;
};

export const SignOut = async () => {
  let logout_Success;
  await auth
    .signOut()
    .then((res) => {
      logout_Success = true;
    })
    .catch((err) => {
      console.log(err.message);
    });

  return logout_Success;
};

import { authClient } from "../llib/auth";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/"
          })
        }
      >sign in</button>
    </div>
  );
};

export default Home;

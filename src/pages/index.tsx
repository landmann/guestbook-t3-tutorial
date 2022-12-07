import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Messages from "../components/messages";
import Form from "../components/form";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex flex-col items-center pt-4">Loading...</div>;
  }

  // iterate through the session and display the data
  const getSessionData = () => {
    if (session) {
      return Object.entries(session).map(([key, value]) => {
        console.log(key, value);
      });
    }
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>
      <p>
        {" "}
        Tutorial for <code>create-t3-app</code>{" "}
      </p>
      <div className="pt-10">
        <div className="flex flex-col items-center gap-5">
          {session ? (
            <>
              <p>
                {" "}
                hi {session.user?.name} ({session.user?.email})
              </p>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={"avatar"}
                  width={100}
                  height={100}
                />
              )}
              {getSessionData()}
              <button onClick={() => signOut()}>Log out</button>
              <div className="pt-6">
                <Form session={session} />
              </div>
            </>
          ) : (
            <button onClick={() => signIn("discord")}>
              Log in with Discord
            </button>
          )}
          <div className="flex flex-col items-center">
            <Messages /> {}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

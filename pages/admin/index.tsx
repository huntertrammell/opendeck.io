import { create } from "domain";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";

const Admin: NextPage = ({ session }: any) => {


  return (
    <section>
      <h1>Hello World</h1>
    </section>
  );
};

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

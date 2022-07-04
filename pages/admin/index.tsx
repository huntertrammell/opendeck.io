import { create } from "domain";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Admin: NextPage = () => {
  const { data } = useSession();

  console.log(data?.user);

  return (
    <section>
      <h1>Hello World</h1>
    </section>
  );
};

export default Admin;

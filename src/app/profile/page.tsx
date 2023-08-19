import React, { useEffect } from "react";
import axios from "axios";
import { cookies } from "next/headers";

export default function Profile() {
  const cookieStore = cookies();
  const theme = cookieStore.get("token");
  console.log(theme);

  return <div>page</div>;
}

import { IUser } from "@/types/types";
import React from "react";

type UseCurrentUser = {
  user: IUser;
};

export default function useCurrentUser(): UseCurrentUser {
  return {
    user: {
      image: "/assets/user-images/image-zena.jpg",
      name: "Zena Kelley",
      username: "velvetround",
    },
  };
}

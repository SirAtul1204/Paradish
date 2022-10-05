import { UseMutateFunction } from "react-query";

export const saveMethods = (
  type: "UPDATE_USER",
  mutate: any,
  { data, userEmail, key }: { data: any; userEmail: any; key: any }
) => {
  switch (type) {
    case "UPDATE_USER":
      return () => {
        mutate({
          id: data?.id as any as number,
          creatorEmail: userEmail,
          key,
          //@ts-ignore
          value: data[key],
        });
      };
  }
};

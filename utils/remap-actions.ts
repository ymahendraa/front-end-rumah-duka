import { AUTHORIZATION_ACCESS } from "./dummy";

const remapActions = (actions: Array<string>) => {
  const filteredActions = AUTHORIZATION_ACCESS.filter((item) =>
    actions.includes(item.value)
  ).map((item) => {
    return { id: item.id, value: item.value };
  });

  return filteredActions;
};

export default remapActions;

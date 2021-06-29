import { State } from "./Activities";

export const getActivityById = (state: State, activityId: string) =>
  state.data.find(({ id }) => id === activityId);

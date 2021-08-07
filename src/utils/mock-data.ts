import { STORAGE_TYPE } from "../common/constants";

export const stepLabels: string[] = [
  "Upload your avatar",
  "Choose type of storage",
  "Upload your girl/boy-friend's avatar (optional)",
];

export const storageData = [
  { label: "Family", value: STORAGE_TYPE.FAMILY },
  { label: "Friend", value: STORAGE_TYPE.FRIEND },
  { label: "Love", value: STORAGE_TYPE.LOVE },
];

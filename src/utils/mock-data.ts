import { STORAGE_TYPE } from "../common/constants";

export const stepLabels: string[] = [
  "Thêm ảnh đại diện",
  "Lựa chọn loại hình muốn lưu",
  "Thêm ảnh đại diện của người ấy(nếu có)",
];

export const storageData = [
  { label: "Family", value: STORAGE_TYPE.FAMILY },
  { label: "Friend", value: STORAGE_TYPE.FRIEND },
  { label: "Love", value: STORAGE_TYPE.LOVE },
];

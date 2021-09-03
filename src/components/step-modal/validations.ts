import * as Yup from "yup";
import { STORAGE_TYPE } from "../../common/constants";

export const validationSchema = (isUserExisted: boolean) => {
  console.log(`isUserExisted`, isUserExisted);
  return Yup.object().shape({
    loveDate: Yup.string().test(
      "",
      "Hai bạn chưa hẹn hò à? Mình không nghĩ vậy",
      function (val) {
        const parentField = this.parent;
        if (!parentField.storageType.includes(STORAGE_TYPE.LOVE)) return true;
        return isUserExisted && !!val;
      }
    ),
    loverId: Yup.string().test(
      "",
      "Bạn chưa nhập tên người ấy rồi",
      function (val) {
        const parentField = this.parent;
        if (!parentField.storageType.includes(STORAGE_TYPE.LOVE)) return true;
        return isUserExisted && !!val;
      }
    ),
    loverName: Yup.string().test(
      "",
      "Bạn chưa nhập tên người ấy rồi",
      function (val) {
        const parentField = this.parent;
        if (!parentField.storageType.includes(STORAGE_TYPE.LOVE)) return true;
        return !isUserExisted && !!val;
      }
    ),
  });
};

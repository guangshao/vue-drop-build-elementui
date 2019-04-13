import { inputConf } from "./control/Input";

const formList = {
  input: inputConf
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;

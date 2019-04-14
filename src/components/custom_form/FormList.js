import input, { inputConf, inputTag } from "./control/Input";
import radiogroup, { radioGroupConf, radioGroupTag } from "./control/RadioGroup";

export const form_tag = {
  input: inputTag,
  radiogroup: radioGroupTag,
}
export const form_item = {
  input,
  radiogroup,
}


const formConf = {
  input: inputConf,
  radiogroup: radioGroupConf,
};
let list_arr = [];
for (let i in formConf) {
  list_arr.push({
    ele: i,
    obj: formConf[i]
  });
}
export default list_arr;

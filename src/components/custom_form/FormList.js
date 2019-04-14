import input, { inputConf, inputTag } from "./control/Input";
import radiogroup, { radioGroupConf, radioGroupTag } from "./control/RadioGroup";
import checkboxgroup, { checkboxGroupConf, checkboxGroupTag } from "./control/CheckboxGroup";

export const form_tag = {
  input: inputTag,
  radiogroup: radioGroupTag,
  checkboxgroup: checkboxGroupTag,
}
export const form_item = {
  input,
  radiogroup,
  checkboxgroup
}


const formConf = {
  input: inputConf,
  radiogroup: radioGroupConf,
  checkboxgroup: checkboxGroupConf
};
let list_arr = [];
for (let i in formConf) {
  list_arr.push({
    ele: i,
    obj: formConf[i]
  });
}
export default list_arr;

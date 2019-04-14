import input, { inputConf, inputTag } from "./control/Input";
import radiogroup, { radioGroupConf, radioGroupTag } from "./control/RadioGroup";
import checkboxgroup, { checkboxGroupConf, checkboxGroupTag } from "./control/CheckboxGroup";
import select, { selectConf, selectTag } from "./control/Select";

export const form_tag = {
  input: inputTag,
  radiogroup: radioGroupTag,
  checkboxgroup: checkboxGroupTag,
  select: selectTag
}
export const form_item = {
  input,
  radiogroup,
  checkboxgroup,
  select,
}


const formConf = {
  input: inputConf,
  radiogroup: radioGroupConf,
  checkboxgroup: checkboxGroupConf,
  select: selectConf
};
let list_arr = [];
for (let i in formConf) {
  list_arr.push({
    ele: i,
    obj: formConf[i]
  });
}
export default list_arr;

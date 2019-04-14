import input, { inputConf, inputTag } from "./control/Input";
import textarea, { textareaConf, textareaTag } from "./control/Textarea";
import radiogroup, { radioGroupConf, radioGroupTag } from "./control/RadioGroup";
import checkboxgroup, { checkboxGroupConf, checkboxGroupTag } from "./control/CheckboxGroup";
import select, { selectConf, selectTag } from "./control/Select";
import address, { addressConf, addressTag } from "./control/Address";

export const form_tag = {
  input: inputTag,
  textarea: textareaTag,
  radiogroup: radioGroupTag,
  checkboxgroup: checkboxGroupTag,
  select: selectTag,
  address: addressTag
}
export const form_item = {
  input,
  textarea,
  radiogroup,
  checkboxgroup,
  select,
  address
}


const formConf = {
  input: inputConf,
  textarea: textareaConf,
  radiogroup: radioGroupConf,
  checkboxgroup: checkboxGroupConf,
  select: selectConf,
  address: addressConf
};
let list_arr = [];
for (let i in formConf) {
  list_arr.push({
    ele: i,
    obj: formConf[i]
  });
}
export default list_arr;

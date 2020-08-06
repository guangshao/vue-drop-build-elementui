/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-04 19:05:44
 * @LastEditors: guang
 * @Description:
 */
import input from "@customForm/control/Input";
// import textarea from "@customForm/control/Textarea";
// import radiogroup from "@customForm/control/RadioGroup";
// import checkboxgroup from "@customForm/control/CheckboxGroup";
// import select from "@customForm/control/Select";
// import address from "@customForm/control/Address";
// import datepicker from "@customForm/control/DatePicker";
// import datepickermerange from "@customForm/control/DatePickerMerange";

export const formItem = {
    input: input.render
    // textarea: textarea.render,
    // radiogroup: radiogroup.render,
    // checkboxgroup: checkboxgroup.render,
    // select: select.render,
    // address: address.render,
    // datepicker: datepicker.render,
    // datepickermerange: datepickermerange.render
};

export const formTag = {
    input: input.tag
    // textarea: textarea.tag,
    // radiogroup: radiogroup.tag,
    // checkboxgroup: checkboxgroup.tag,
    // select: select.tag,
    // address: address.tag,
    // datepicker: datepicker.tag,
    // datepickermerange: datepickermerange.tag
};
export const attrSort = {
    input: input.sort
    // textarea: textarea.sort,
    // radiogroup: radiogroup.sort,
    // checkboxgroup: checkboxgroup.sort,
    // select: select.sort,
    // address: address.sort,
    // datepicker: datepicker.sort,
    // datepickermerange: datepickermerange.sort
};

export const formConfig = Object.freeze({
    input: input.config
    // textarea: textarea.config,
    // radiogroup: radiogroup.config,
    // checkboxgroup: checkboxgroup.config,
    // select: select.config,
    // address: address.config,
    // datepicker: datepicker.config,
    // datepickermerange: datepickermerange.config
});

let formItemsAttr = [];
for (let i in formConfig) {
    formItemsAttr.push({
        ele: i,
        config: formConfig[i]
    });
}
export default formItemsAttr;

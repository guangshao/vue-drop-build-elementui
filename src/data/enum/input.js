/*
 * @Author: guang
 * @Date: 2020-08-05 09:51:39
 * @LastEditTime: 2020-08-05 15:16:58
 * @LastEditors: guang
 * @Description:
 */

/**
 * @label {string} 属性含义
 * @type {string} 属性类型
 * @group {string} 属性分组 用于动态添加属性时候
 * @default {string|boolean} 默认值
 */
export default {
    maxlength: {
        label: "最大输入长度",
        type: "string",
        group: "Attributes",
        default: ""
    },
    minlength: {
        label: "最小输入长度",
        type: "string",
        group: "Attributes",
        default: ""
    },
    "show-word-limit": {
        label: "显示字数统计",
        type: "boolean",
        group: "Attributes",
        default: false
    },
    clearable: {
        label: "是否可清空",
        type: "boolean",
        group: "Attributes",
        default: false
    },
    /*
     * Event
     */
    "@blur": {
        label: "@blur",
        type: "string",
        group: "Event",
        default: ""
    },
    "@focus": {
        label: "@focus",
        type: "string",
        group: "Event",
        default: ""
    },
    "@change": {
        label: "@change",
        type: "string",
        group: "Event",
        default: ""
    },
    "@input": {
        label: "@input",
        type: "string",
        group: "Event",
        default: ""
    },
    "@clear": {
        label: "@clear",
        type: "string",
        group: "Event",
        default: ""
    }
};

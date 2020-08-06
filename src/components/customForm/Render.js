/*
 * @Author: guang
 * @Date: 2020-08-02 12:46:59
 * @LastEditTime: 2020-08-04 16:54:51
 * @LastEditors: guang
 * @Description:
 */
import ItemIcon from "./ItemIcon";
import { formItem } from "@customForm/config/formItemsConfig.js";

export default {
    name: "renders",
    render(h) {
        // 获取当前控件渲染
        const child =
            formItem[this.ele.toLowerCase()] && formItem[this.ele.toLowerCase()](this, h) || [];
        // 显示配置按钮并且控件允许被配置
        const item_icon = this.configIcon ? ItemIcon(this, h) : [];
        // 已被绑定prop,且require为必填,视为校验字段
        const validate = !!this.config.require.value;
        let FormItem = {
            class: {
                "el-form-item": true,
                "is-required": validate
            },
            props: {
                label: this.config.label.value + "：",
                // 指定验证name
                prop: this.config["v-model"].value
            }
        };
        return h("ElFormItem", FormItem, child.concat(item_icon));
    },
    props: {
        // 当前控件的类型
        ele: {
            type: String,
            default: "input"
        },
        // 当前控件的配置
        config: {
            type: Object,
            default() {
                return {};
            }
        },
        // 当前控件的index,config 和 delete 会用到
        index: {
            type: Number,
            default: 0
        },
        // 整个表单的数据
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        // 是否显示配置按钮
        configIcon: {
            type: Boolean,
            default: false
        },
        // 当前控件绑定的值 方便数据回填
        value: [String, Number, Array],
        // 当前被clone控件列表
        sortableItem: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};

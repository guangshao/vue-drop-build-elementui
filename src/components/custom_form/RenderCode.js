import { getTemplate } from '../template'
import input from './code/Iview/Input';

import hr from './code/Hr';

import trigger from './config/trigger';

const form_item = {
  hr,
  input
};

export default {
  name: 'renderCode',
  render(h) {
    var $this = this;
    // // 获取当前控件渲染
    const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
    // // 拥有绑定的值，需回填到控件
    this.$set(this.obj, 'value', typeof this.value !== "undefined" ? this.value : this.obj.value);
    // 已被绑定name,且require为必填,视为校验字段
    const validate = !!this.obj.name && !!this.obj.require;
    // 非Hr需要FormItem
    if (['hr', 'p'].indexOf((this.ele.toLowerCase())) < 0) {
      let FormItem = {
        class: {
          'items': true,
          'sortable-items-required': validate
        },
        attrs: {
          // 指定验证name
          prop: this.obj.name || 'temp',
          // 验证规则
          rules: {
            required: validate,
            message: this.obj.ruleError || '该项为必填项',
            trigger: trigger[this.obj.type],
            validator: (rule, value, callback) => {
              // 没有配置按钮并且允许验证
              if (!this.configIcon && validate && (Array.isArray(value) ? !value.length : !value)) {
                callback(new Error('该项为必填项'));
              } else {
                callback();
              }
            }
          },
        },
        style: {
          // 是否显示行内元素
          display: this.obj.inlineBlock ? 'inline-block' : 'block',
          // 行内元素width为30%
          width: this.obj.inlineBlock ? '33%' : 'auto',
        }
      };
      console.log(h(
        "el-form-item", FormItem,
        arr
      ))
      return h(
        "el-form-item", FormItem,
        arr
      );
    } else {
      return h(
        "div", {
          style: {
            'position': 'relative'
          },
          class: {
            items: true
          },
        },
        arr
      );
    }
  },
  props: {
    // 当前控件的类型
    ele: {
      type: String,
      default: "input"
    },
    // 当前控件的配置
    obj: {
      type: Object,
      default () {
        return {};
      }
    },
    // 当前控件的index,config 和 delete 会用到
    index: {
      type: Number,
      default: 0
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
      default () {
        return [];
      }
    }
  }
}
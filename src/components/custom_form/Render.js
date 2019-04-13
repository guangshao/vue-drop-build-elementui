import ItemIcon from './ItemIcon';
import input from './control/Input';

import trigger from './config/trigger';

const form_item = {
  input,
};

export default {
  name: 'renders',
  render(h) {
    var $this = this;
    // 获取当前控件渲染
    const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
    // 拥有绑定的值，需回填到控件
    this.$set(this.obj.value, 'value', typeof this.value !== "undefined" ? this.value : this.obj.value.value);
    // 显示配置按钮并且控件允许被配置
    const item_icon = this.configIcon && this.obj.config.value ? ItemIcon(this, h) : [];
    // 已被绑定prop,且require为必填,视为校验字段
    console.log(this.obj.prop, this.obj.require)
    const validate = !!this.obj.prop.value && !!this.obj.require.value;
    // 非 Title Hr P 需要FormItem
    if (['title', 'hr', 'p'].indexOf((this.ele.toLowerCase())) < 0) {
      let FormItem = {
        class: {
          'el-form-item': true,
          'is-required': validate
        },
        props: {
          label: (this.obj.label.value|| this.ele) + '：',
          // 指定验证name
          prop: this.obj.prop.value || 'temp',
          // 验证规则
          rules: {
            required: validate,
            message: this.obj.ruleError.value || '该项为必填项',
            trigger: trigger[this.obj.type.value],
            validator: (rule, value, callback) => {
              // 没有配置按钮并且允许验证
              if (!this.configIcon && validate && (Array.isArray(value) ? !value.length : !value)) {
                callback(new Error('该项为必填项'));
              } else {
                callback();
              }
            }
          },
        }
      };
      return h(
        "ElFormItem", FormItem,
        arr.concat(item_icon)
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
        arr.concat(item_icon)
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
    // 整个表单的数据
    data: {
      type: Object,
      default () {
        return {}
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
      default () {
        return [];
      }
    }
  }
}
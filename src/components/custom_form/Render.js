import ItemIcon from './ItemIcon';
import input from './control/Input';

const form_item = {
  input,
};

export default {
  name: 'renders',
  render(h) {
    var $this = this;
    // 获取当前控件渲染
    const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
    // 显示配置按钮并且控件允许被配置
    const item_icon = this.configIcon ? ItemIcon(this, h) : [];
    // 已被绑定prop,且require为必填,视为校验字段
    const validate = !!this.obj.prop.value && !!this.obj.require.value;
    // 非 Title Hr P 需要FormItem
    if (['title', 'hr', 'p'].indexOf((this.ele.toLowerCase())) < 0) {
      let FormItem = {
        class: {
          'el-form-item': true,
          'is-required': validate
        },
        props: {
          label: this.obj.label.value + '：',
          // 指定验证name
          prop: this.obj.prop.value,
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
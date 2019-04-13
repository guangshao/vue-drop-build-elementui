import input from './control/Input';

const form_item = {
  input,
};

export default {
  name: 'renderForm',
  render(h) {
    console.log(this.obj)
    if (this.obj.ignore) {
      return
    }
    // 获取当前控件渲染
    const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
    let FormItem = {
      class: {
        'el-form-item': true,
        'is-required': this.obj.require
      },
      props: {
        label: this.obj.label + '：',
        // 指定验证name
        prop: this.obj.prop,
        key: this.obj.prop
      }
    };

    console.log(FormItem)
    return h(
      "ElFormItem", FormItem,
      arr
    );
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
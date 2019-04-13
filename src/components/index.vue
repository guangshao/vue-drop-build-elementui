<template>
  <div class="container">
    <i-row>
      <i-col span="12" class="sortable_container">
        <Form :label-width="100" class="b-a">
          <draggable :clone="cloneData" :list="form_list" :options="dragOptions1">
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders v-for="(element,index) in form_list" :key="index+1" :ele="element.ele" :obj="element.obj || {}"></renders>
            </transition-group>
          </draggable>
        </Form>
      </i-col>
      <i-col span="12" class="sortable_item">
        <Form ref="formValidate" class="b-a" :label-width="150" :model="formData" @submit.native.prevent>
          <Alert style="margin: 15px 15px 0;" type="warning" show-icon>未绑定数据字典控件无效</Alert>
          <draggable :list="sortable_item" :options="dragOptions2" @add="addEle" >
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders 
                @handleRemoveEle="removeEle"
                @handleConfEle="confEle"
                @changeVisibility="changeVisibility"
                v-for="(element,index) in sortable_item" :key="index+1" :index="index"
                :ele="element.ele"
                :obj="element.obj || {}"
                :data="formData"
                @handleChangeVal="val => handleChangeVal(val,element)"
                :sortableItem="sortable_item"
                :config-icon="true">
              </renders>
            </transition-group>
          </draggable>
          <FormItem>
            <Button @click="handleExport()">导出代码</Button>
          </FormItem>
        </Form>
      </i-col>
      <Modal v-model="showModal" :title="'配置' + modalFormData.modalTitle.value + '属性'" :mask-closable="false">
        <Form class="form_content" :label-width="80" :model="modalFormData" ref="modalFormData">
          <FormItem label="控件名称：" v-if="typeof modalFormData.label != 'undefined'">
            <i-input v-model="modalFormData.label.value" placeholder="请输入控件名称" :maxlength="4"></i-input>
          </FormItem>
          <FormItem label="关联字段" v-if="typeof modalFormData.prop != 'undefined'">
            <i-input v-model="modalFormData.prop.value" placeholder="v-model值"></i-input>
          </FormItem>
          <FormItem label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
            <i-input v-model="modalFormData.placeholder.value" placeholder="请输入placeholder"></i-input>
          </FormItem>
          <FormItem label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'">
            <InputNumber v-model="modalFormData.maxLength.value" placeholder="请输入文本限制最大长度">
            </InputNumber>
          </FormItem>
          <FormItem label="最大限制：" v-if="typeof modalFormData.maxSize != 'undefined'">
            <InputNumber :formatter="value => `${value}kb`" :parser="value => value.replace('kb', '')" v-model="modalFormData.maxSize.value" placeholder="请输入上传文件最大限制">
            </InputNumber>
          </FormItem>
          <FormItem label="上边距：" v-if="typeof modalFormData.marginTop != 'undefined'">
            <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginTop.value" placeholder="请输入标签上边距">
            </InputNumber>
          </FormItem>
          <FormItem label="下边距：" v-if="typeof modalFormData.marginBottom != 'undefined'">
            <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginBottom.value" placeholder="请输入标签下边距">
            </InputNumber>
          </FormItem>
          <FormItem label="详细地址：" v-if="typeof modalFormData.details_address != 'undefined'">
            <Checkbox v-model="modalFormData.details_address.value">是否需要详细地址</Checkbox>
          </FormItem>
          <FormItem label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
            <Checkbox v-model="modalFormData.require.value">必填</Checkbox>
          </FormItem>
          <FormItem label="校验错误：" v-if="typeof modalFormData.ruleError != 'undefined' && modalFormData.require.value">
            <i-input v-model="modalFormData.ruleError.value" placeholder="请输入校验错误提示"></i-input>
          </FormItem>
          <FormItem label="是否多选：" v-if="typeof modalFormData.multiple != 'undefined' && modalFormData.type != 'address'">
            <Checkbox v-model="modalFormData.multiple.value">多选</Checkbox>
          </FormItem>
          <FormItem label="时间格式：" v-if="typeof modalFormData.format != 'undefined'">
            <RadioGroup v-model="modalFormData.format.value">
              <Radio label="yyyy年MM月dd日"></Radio>
              <Radio label="yyyy-MM-dd HH:mm"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="行内元素：" v-if="typeof modalFormData.inlineBlock != 'undefined'">
            <Checkbox v-model="modalFormData.inlineBlock.value">是</Checkbox>
          </FormItem>
          <FormItem label="显示行数：" v-if="typeof modalFormData.maxRows != 'undefined'">
            <Slider v-model="modalFormData.maxRows.value" :min="2" :max="10"></Slider>
          </FormItem>
          <FormItem label="标题大小：" v-if="typeof modalFormData.level != 'undefined'">
            <InputNumber :max="6" :min="1" v-model="modalFormData.level.value"></InputNumber>
          </FormItem>
          <FormItem label="字体颜色：" v-if="typeof modalFormData.color != 'undefined'">
            <ColorPicker v-model="modalFormData.color" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" @click="handleCancel">取消</Button>
          <Button type="primary" :loading="modalFormData.loading" @click="handleOk">确定</Button>
        </div>
      </Modal>
      <Modal v-model="codeContentModal" title="HTML 代码" :mask-closable="false">
        <pre v-highlightjs="codeContent"><code class="html"></code></pre>
      </Modal>
    </i-row>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import form_list from "./custom_form/FormList";
import renderTag from "./custom_form/renderTag";

// 代码高亮样式
import '@/assets/css/highlight/default.css'
import '@/assets/css/highlight/Atom-One-Light.css'
export default {
  components: {
    draggable
  },
  data() {
    return {
      form_list: form_list,
      sortable_item: [],
      showModal: false,
      codeContentModal: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新      
      modalFormData: {
        color: '',
        loading: false,
        modalTitle: {
          value: ''
        }
      },
      formData: {},
      dataDict: [], // 数据字典
      codeContent: '' // 代码高亮
    };
  },
  methods: {
    // 导出代码
    handleExport() {
      let code = ''
      this.sortable_item.forEach(el => {
        code +=renderTag(el)
      })
      // 格式化代码
      this.codeContent = this.$prettyDom(code)
      this.codeContentModal = true
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // modal点击确定执行事件
    handleOk() {
      const index = this.modalFormData.listIndex;
      this.sortable_item[index].obj = Object.assign({},
        this.sortable_item[index].obj,
        this.modalFormData
      );
      this.handleCancel();
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false;
      setTimeout(_ => {
        this.modalFormData = {
          color: '',
          loading: false,
          modalTitle: {
            value: ''
          }
        }
      }, 500)
    },
    // 拖动结束
    addEle(event) {
      this.confEle(event.newIndex)
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      console.log(this.sortable_item[index])
      const list_temp = Object.assign({}, this.sortable_item[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      let name = this.sortable_item[index].obj.name;
      this.sortable_item.splice(index, 1);
      if (!name) return;
      for (let i in this.sortable_item) {
        // 当relation为true并且关联字段被确认
        if (this.sortable_item[i].obj.relation && this.sortable_item[i].obj.relation_name === name) {
          this.$set(this.sortable_item[i].obj, "relation", false);
          this.$set(this.sortable_item[i].obj, "relation_name", "");
          this.$set(this.sortable_item[i].obj, "relation_value", "");
          break;
        }
      }
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.sortable_item[index].obj, 'visibility', visibility);
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.handleCancel();
      }
    }
  },
  computed: {
    // 数据字典已选择项
    dataDictSelected() {
      return this.sortable_item.map(v => {
        const obj = JSON.parse(v.obj.dict || '{}');
        return obj.id || -1;
      })
    },
    // 对应控件的数据字典
    dataDictList() {
      return this.dataDict.filter(v => {
        return v.type == this.modalFormData.type;
      })
    },
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: "ghost",
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        },
        onAdd: () => {
          
        }
      };
    },
    // 被关联字段列表
    relationList() {
      // 只有type内三项可作为被关联字段
      let type = ['select', 'radio', 'checkbox'];
      const arr = this.sortable_item.filter(k => {
        return type.indexOf(k.ele) >= 0 && !!k.obj.name;
      })
      return arr;
    },
    // 被关联字段数据
    relationValue() {
      const name = this.modalFormData.relation_name;
      let items = [];
      if (!name) return items;
      for (let i in this.sortable_item) {
        if (this.sortable_item[i].obj.name == name) {
          items = this.sortable_item[i].obj.items;
        }
      }
      return items;
    }
  },
  created() {
    // /static/label.json
    this.$http.get('/static/label.json').then(d => {
      this.dataDict = d.data.items;
    });
    this.sortable_item = JSON.parse(localStorage.getItem('template_form') || '[]');
  }
};
</script>
<style>

.inline {
  display: inline-block;
}

.m-l-lg {
  margin-left: 30px
}

.wrapper {
  padding: 15px
}

.inline-block {
  display: inline-block;
}

.padder-sm {
  padding-right: 10px;
  padding-left: 10px
}

.b-a {
  border: 1px solid #ccc;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.form-list-group {
  min-height: 200px;
  padding: 20px !important;
}

/* 设置items下所有鼠标样式为 move */

.items,
.items * {
  cursor: move;
}

/* 配置按钮默认位置 */

/* 例如P Hr Title按钮 */

.items .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* form控件下配置按钮位置 */

.ivu-form-item.items .item-icon {
  top: -25px;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

.items:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}

/* 提交按钮下方无 margin-bottom */

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}


/* 表单校验选项样式 */

.ivu-form-item-required .ivu-form-item-label:before {
  content: '';
}

.items.sortable-items-required .ivu-form-item-label:before {
  content: '*';
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
</style>
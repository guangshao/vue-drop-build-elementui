<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12" >
        <el-form :label-width="`${labelWidth}px`" class="b-a form-list-group">
          <el-form-item label="label-width">
            <el-input v-model.number="labelWidth"></el-input>
          </el-form-item>
          <draggable :clone="cloneData" :list="form_list" :options="dragOptions1">
            <transition-group type="transition" :name="'flip-list'" tag="div">
              <renders v-for="(element,index) in form_list" :key="index+1" :ele="element.ele" :obj="element.obj || {}" :configIcon="false"></renders>
            </transition-group>
          </draggable>
        </el-form>
      </el-col>
      <el-col :span="12" class="sortable_item">
        <el-form ref="formValidate" class="b-a" :label-width="`${labelWidth}px`" :model="formData" @submit.native.prevent>
          <draggable :list="sortable_item" :options="dragOptions2" @add="addEle" >
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders 
                @handleRemoveEle="removeEle"
                @handleConfEle="confEle"
                v-for="(element,index) in sortable_item" :key="index+1" :index="index"
                :ele="element.ele"
                :obj="element.obj || {}"
                :data="formData"
                :sortableItem="sortable_item"
                :config-icon="true">
              </renders>
            </transition-group>
          </draggable>
          <el-form-item>
            <el-button @click="handleExport()">导出HTML</el-button>
          </el-form-item> 
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :title="`配置${modalFormData.modalTitle ? modalFormData.modalTitle.value : ''}属性`" :visible.sync="showModal" >
      <el-form class="form_content" label-width="100px" :model="modalFormData" ref="modalFormData" :rules="formRules">
        <el-form-item label="控件名称：" v-if="typeof modalFormData.label != 'undefined'" prop="label.value" key="label">
          <el-input v-model="modalFormData.label.value" placeholder="请输入控件名称"></el-input >
        </el-form-item> 
        <el-form-item label="关联字段" v-if="typeof modalFormData.prop != 'undefined'" prop="prop.value" key="prop">
          <el-input v-model="modalFormData.prop.value" placeholder="v-model值"></el-input >
        </el-form-item> 
        <el-form-item label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'" prop="placeholder.value" key="placeholder">
          <el-input v-model="modalFormData.placeholder.value" placeholder="请输入placeholder"></el-input >
        </el-form-item> 
        <el-form-item label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'" prop="maxLength.value" key="maxLength">
          <el-input-number v-model="modalFormData.maxLength.value" placeholder="请输入文本限制最大长度">
          </el-input-number>
        </el-form-item> 
        <el-form-item label="最大限制：" v-if="typeof modalFormData.maxSize != 'undefined'" prop="maxSize.value" key="maxSize">
          <el-input-number :formatter="value => `${value}kb`" :parser="value => value.replace('kb', '')" v-model="modalFormData.maxSize.value" placeholder="请输入上传文件最大限制">
          </el-input-number>
        </el-form-item> 
        <el-form-item label="详细地址：" v-if="typeof modalFormData.details_address != 'undefined'">
          <el-checkbox v-model="modalFormData.details_address.value">是否需要详细地址</el-checkbox>
        </el-form-item> 
        <el-form-item label="删除按钮：" v-if="typeof modalFormData.clearable != 'undefined'">
          <el-radio-group v-model="modalFormData.clearable.value">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item> 
        <el-form-item label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
          <el-radio-group v-model="modalFormData.require.value">
            <el-radio :label="true">必填</el-radio>
            <el-radio :label="false">非必填</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="校验错误：" v-if="typeof modalFormData.ruleError != 'undefined' && modalFormData.require.value">
          <el-input v-model="modalFormData.ruleError.value" placeholder="请输入校验错误提示"></el-input >
        </el-form-item> 
        <el-form-item label="是否多选：" v-if="typeof modalFormData.multiple != 'undefined' && modalFormData.type != 'address'">
          <el-checkbox v-model="modalFormData.multiple.value">多选</el-checkbox>
        </el-form-item> 
        <el-form-item label="时间格式：" v-if="typeof modalFormData.format != 'undefined'">
          <el-radio-group v-model="modalFormData.format.value">
            <el-radio label="yyyy年MM月dd日"></el-radio>
            <el-radio label="yyyy-MM-dd HH:mm"></el-radio>
          </el-radio-group>
        </el-form-item> 
        <el-form-item label="显示行数：" v-if="typeof modalFormData.maxRows != 'undefined'">
          <Slider v-model="modalFormData.maxRows.value" :min="2" :max="10"></Slider>
        </el-form-item> 
      </el-form>
      <div slot="footer">
        <el-button type="text" @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="modalFormData.loading" @click="handleOk">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="codeContentModal" title="HTML 代码" :mask-closable="false">
      <pre v-highlightjs="codeHtml"><code class="html" id="codehtml"></code></pre>
      <div slot="footer">
        <el-button type="primary" ref="copy"
        v-clipboard:copy="codeHtml"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制代码</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import form_list from "./custom_form/FormList";
import renderTag from "./custom_form/renderTag";
import {formRules} from "../data/rules";

// 代码高亮样式
import '@/assets/css/highlight/default.css'
import '@/assets/css/highlight/Atom-One-Light.css'
export default {
  components: {
    draggable
  },
  data() {
    return {
      copyBtn: null, //存储初始化复制按钮事件
      formRules: formRules,
      labelWidth: 120, 
      form_list: form_list,
      sortable_item: [],
      showModal: false,
      codeContentModal: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新      
      modalFormData: {
        loading: false
      },
      formData: {},
      codeHtml: '' // HTML代码高亮
    }
  },
  methods: {
    // 导出代码
    handleExport() {
      let code = ''
      this.sortable_item.forEach(el => {
        code +=renderTag(el)
      })
      // 格式化代码
      this.codeHtml = this.$prettyDom(code)
      this.codeContentModal = true
    },
    // 复制代码
    onCopy () {
      this.$message({ /*这是使用了element-UI的信息弹框*/
        message: '复制成功！',
        type: 'success'
      })
    },
    onError () {
      this.$message({
        message: '复制失败，请手动选择复制！',
        type: 'error'
      })
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // modal点击确定执行事件
    handleOk() {
      this.$refs['modalFormData'].validate((valid) => {
        console.log(valid)
        if (!valid) {return}
        const index = this.modalFormData.listIndex;
        this.sortable_item[index].obj = Object.assign({},
          this.sortable_item[index].obj,
          this.modalFormData
        );
        this.handleCancel();
      })
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.$refs['modalFormData'].validate((valid) => {
        if (!valid) {
          this.removeEle(this.modalFormData.listIndex)
        }
        this.showModal = false;
        setTimeout(_ => {
          this.modalFormData = {
            loading: false
          }
        }, 500)
      })
    },
    // 拖动结束
    addEle(event) {
      this.confEle(event.newIndex)
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.sortable_item[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      this.sortable_item.splice(index, 1);
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
    }
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

.el-form-item,
.el-form-item * {
  cursor: move;
}

/* 配置按钮默认位置 */

/* 例如P Hr Title按钮 */

.el-form-item .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* form控件下配置按钮位置 */

.el-form-item .item-icon {
  top: -28px;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

.el-form-item:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}

/* 提交按钮下方无 margin-bottom */

.form_content .el-form-item:last-child {
  margin-bottom: 0;
}
</style>
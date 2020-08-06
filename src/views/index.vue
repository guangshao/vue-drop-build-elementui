<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="box-card">
                    <div
                        slot="header"
                        class="clearfix"
                    >
                        表单控件
                    </div>
                    <el-form
                        :label-width="`${labelWidth}px`"
                        class="form-list-group"
                    >
                        <draggable
                            :clone="cloneData"
                            :list="formItems"
                            :options="dragOptions1"
                        >
                            <transition-group
                                type="transition"
                                :name="'flip-list'"
                                tag="div"
                            >
                                <renders
                                    v-for="element in formItems"
                                    :key="element.ele"
                                    :ele="element.ele"
                                    :config="element.config || {}"
                                    :config-icon="false"
                                ></renders>
                            </transition-group>
                        </draggable>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="box-card">
                    <div
                        slot="header"
                        class="clearfix"
                    >
                        <el-button
                            type="primary"
                            round
                            size="small"
                            @click="exportHtml()"
                        >导出HTML</el-button>
                        <el-button
                            type="primary"
                            round
                            size="small"
                            @click="exportJs()"
                        >导出JS</el-button>
                    </div>
                    <el-form
                        ref="formValidate"
                        :label-width="`${labelWidth}px`"
                        :model="formData"
                        @submit.native.prevent
                    >
                        <draggable
                            :list="sortableItem"
                            :options="dragOptions2"
                            @add="addEle"
                        >
                            <transition-group
                                class="form-list-group"
                                type="transition"
                                :name="'flip-list'"
                                tag="div"
                            >
                                <renders
                                    v-for="(item, index) in sortableItem"
                                    :key="index + 1"
                                    :index="index"
                                    :ele="item.ele"
                                    :config="item.config || {}"
                                    :data="formData"
                                    :sortable-item="sortableItem"
                                    :config-icon="true"
                                    @handleRemoveEle="removeEle"
                                    @handleConfEle="cloneConfig"
                                >
                                </renders>
                            </transition-group>
                        </draggable>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="8">
                <config-form
                    ref="configForm"
                    class="form-list-group"
                    el="input"
                    :form-data="modalFormData"
                    @update="updateModalFormData"
                    @remove="removeEle"
                />
            </el-col>
        </el-row>

        <code-dialog
            ref="codeDialog"
            :code="code"
            :language="language"
        />
    </div>
</template>
<script>
import draggable from "vuedraggable";
import formItems from "@customForm/config/formItemsConfig.js";
import formatTag from "@/utils/formatTag";
import formatJs from "@/utils/formatJs";
import codeDialog from "@/components/dialog/codeDialog";
import configForm from "@/components/dialog/configForm";
import _ from "lodash";

// 代码高亮样式
import "@/assets/css/highlight/default.css";
import "@/assets/css/highlight/atom-one-light.css";
export default {
    components: {
        draggable,
        codeDialog,
        configForm
    },
    data () {
        return {
            copyBtn: null,  // 存储初始化复制按钮事件
            labelWidth: 120,
            formItems,
            sortableItem: [],
            modalFormData: {},
            code: "",
            language: "",
            formData: {},
            listIndex: -1
        };
    },
    computed: {
        // 拖拽表单1
        dragOptions1 () {
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
        dragOptions2 () {
            return {
                animation: 0,
                ghostClass: "ghost",
                group: {
                    // 只允许放置shared的控件,禁止pull
                    put: ["shared"]
                },
                onAdd: () => { }
            };
        }
    },
    methods: {
        // 导出JS代码
        exportJs () {
            // let code = "";

            const code = formatJs(this.sortableItem);
            console.log(code);

            this.language = "js";
            this.$refs.codeDialog.open();
        },
        // 导出HTML代码
        exportHtml () {
            this.code = this.sortableItem.reduce((total, cur) => total + formatTag(cur), "");
            // 格式化代码
            this.language = "vue";
            this.$refs.codeDialog.open();
        },
        // https://github.com/SortableJS/Vue.Draggable#clone 克隆,深拷贝对象
        cloneData (original) {
            // 深拷贝对象，防止默认空对象被更改
            return _.cloneDeep(original);
        },
        // 拖动结束
        addEle (event) {
            this.cloneConfig(event.newIndex);
        },
        // 显示modal,配置被克隆控件
        cloneConfig (index) {
            this.modalFormData = this.sortableItem[index].config;
            // 设置被配置控件的index，便于完成配置找到相应对象赋值
            this.listIndex = index;
            this.$refs.configForm.open();
        },
        // 删除克隆控件
        removeEle (index) {
            this.$confirm("你真的确定删除该组件？")
                .then(() => {
                    this.sortableItem.splice(index, 1);
                    this.$refs.configForm.close();
                });
        },
        updateModalFormData (data) {
            this.sortableItem[this.listIndex].config = data;
        }
    },
};
</script>

<style scoped lang="less">
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.form-list-group {
    min-height: 200px;
}

/* 设置items下所有鼠标样式为 move */

/deep/.el-form-item,
/deep/.el-form-item * {
    cursor: move;
}

/* 配置按钮默认位置 */
/deep/.el-form-item .item-icon {
    transition: all 2s ease;
    position: absolute;
    top: -28px;
    right: 0px;
    overflow: hidden;
    transition: inherit;
    opacity: 1;
    max-height: 50px;
}

/* 配置按钮样式 */
/deep/.item-icon i {
    cursor: pointer !important;
    margin-right: 5px;
}
</style>

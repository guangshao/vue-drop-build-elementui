<template>
    <el-card
        v-show="showDialog"
        class="box-card"
    >
        <div
            slot="header"
            class="clearfix"
        >
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                round
                @click="openAttrDialog"
            >添加属性
            </el-button>
        </div>
        <el-form
            v-if="showDialog"
            ref="modalFormData"
            class="form-content"
            label-width="120px"
            :model="modalFormData"
        >
            <!-- :rules="formRules" -->
            <template v-for="({ key }) in attrList">
                <el-form-item
                    v-if="attrEnum[key]"
                    :key="key"
                    :label="attrEnum[key].label"
                    :prop="`${key}.value`"
                >
                    <el-input
                        v-if="attrEnum[key].type === 'string'"
                        v-model="modalFormData[key].value"
                        :placeholder="attrEnum[key].placeholder"
                    ></el-input>
                    <el-radio-group
                        v-if="attrEnum[key].type === 'boolean'"
                        v-model="modalFormData[key].value"
                    >
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="updateEl"
                >保存</el-button>
                <el-button
                    type="text"
                    @click="cancelForm"
                >关闭</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="添加配置属性"
            :visible.sync="showAttrDoalog"
        >
            <div
                v-for="group in attrOptions"
                :key="group.label"
            >
                <el-divider>{{ group.label }}</el-divider>
                <el-checkbox-group v-model="attrCheckList">
                    <el-checkbox
                        v-for="item in group.options"
                        :key="item.key"
                        :label="item.key"
                    >{{ item.label }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <el-divider>已选中</el-divider>
            <div class="tag-container">
                <el-tag
                    v-for="key in attrCheckList"
                    :key="key"
                >
                    {{ attrEnum[key].label }}
                </el-tag>
            </div>
            <div slot="footer">
                <el-button
                    type="primary"
                    @click="addAttr"
                >添加</el-button>
                <el-button
                    type="text"
                    @click="cancelDialog"
                >取消</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import { attrSort } from "@customForm/config/formItemsConfig.js";
import { commonAttr } from "@/data/enum/commonAttr.js";
// import { formRules } from "@/data/rules";
import _ from "lodash";
export default {
    name: "ConfigForm",
    props: {
        el: {
            type: String,
            required: true
        },
        formData: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            // formRules,
            showDialog: false, // 显示当前组件
            showAttrDoalog: false, // 显示添加属性弹窗
            modalFormData: null,
            attrEnum: {}, // 属性枚举
            attrList: [], // 属性列表
            attrOptions: [], // 属性配置
            attrForm: {
                attr: ""
            },
            attrCheckList: []
        };
    },
    watch: {
        formData: {
            handler () {
                this.modalFormData = _.cloneDeep(this.formData);
            },
            immediate: true
        },
        el: {
            async handler () {
                this.init();
                const elAttrEnum = await import(`@/data/enum/${this.el}`);
                this.attrEnum = {
                    ...commonAttr,
                    ...elAttrEnum.default
                };
                this.trnasformAttrOpt(elAttrEnum.default);
            },
            immediate: true
        }
    },

    methods: {
        init () {
            // 转化数据
            this.attrList = [
                ...attrSort[this.el], // 默认必填选项
            ];
        },
        // 转换属性配置
        trnasformAttrOpt (elAttrEnum) {
            const groups = {};
            for (let k in elAttrEnum) {
                const item = elAttrEnum[k];
                if (!groups[item.group]) {
                    groups[item.group] = {
                        label: item.group,
                        options: []
                    };
                    this.attrOptions.push(groups[item.group]);
                }
                item.key = k;
                groups[item.group].options.push(item);
            }
        },
        open () {
            this.showDialog = true;
        },
        close () {
            this.showDialog = false;
        },
        openAttrDialog () {
            this.showAttrDoalog = true;
            const i = attrSort[this.el].length;
            this.attrCheckList = this.attrList.slice(i).map(({ key }) => key);
        },
        closeAttrDialog () {
            this.showAttrDoalog = false;
        },
        updateEl () {
            this.$refs["modalFormData"].validate(valid => {
                if (!valid) {
                    return;
                }
                this.$emit("update", this.modalFormData);
                this.cancelForm();
            });
        },
        // modal点击取消执行事件，清空当前modal内容
        cancelForm () {
            this.showDialog = false;
        },
        // Dialog 点击确定执行事件
        addAttr () {
            // 添加新属性
            const i = attrSort[this.el].length;
            this.attrList.splice(i);
            this.attrCheckList.forEach(item => {
                const attr = {
                    value: this.attrEnum[item].default,
                    type: this.attrEnum[item].type,
                    key: item
                };
                this.modalFormData[item] = attr;
                this.attrList.push(attr);
            });
            this.cancelDialog();
        },
        cancelDialog () {
            this.showAttrDoalog = false;
            this.attrCheckList = [];
        }
    }
};
</script>

<style lang="less" scoped>
.tag-container {
    padding: 0 -5px;
}
.el-tag {
    margin: 0 5px 10px;
}
</style>

<template>
    <el-dialog
        :title="
            `配置${
                modalFormData.moduleTitle ? modalFormData.moduleTitle.value : ''
            }属性`
        "
        :visible.sync="showModal"
    >
        <el-form
            ref="modalFormData"
            class="form_content"
            label-width="100px"
            :model="modalFormData"
            :rules="formRules"
        >
            <el-form-item
                v-if="typeof modalFormData.label != 'undefined'"
                key="label"
                label="控件名称："
                prop="label.value"
            >
                <el-input
                    v-model="modalFormData.label.value"
                    placeholder="请输入控件名称"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData['v-model'] != 'undefined'"
                key="prop"
                label="关联字段"
                prop="v-model.value"
            >
                <el-input
                    v-model="modalFormData['v-model'].value"
                    placeholder="v-model值"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.placeholder != 'undefined'"
                key="placeholder"
                label="placeholder："
                prop="placeholder.value"
            >
                <el-input
                    v-model="modalFormData.placeholder.value"
                    placeholder="请输入placeholder"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.dataSource != 'undefined'"
                label="数据源："
                prop="dataSource.value"
            >
                <el-input
                    v-model="modalFormData.dataSource.value"
                    placeholder="枚举数据源"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.maxLength != 'undefined'"
                key="maxLength"
                label="字数长度："
                prop="maxLength.value"
            >
                <el-input-number
                    v-model="modalFormData.maxLength.value"
                    placeholder="请输入文本限制最大长度"
                >
                </el-input-number>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.require != 'undefined'"
                label="是否必填："
            >
                <el-radio-group v-model="modalFormData.require.value">
                    <el-radio :label="true">必填</el-radio>
                    <el-radio :label="false">非必填</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="
                    typeof modalFormData.ruleError != 'undefined' &&
                        modalFormData.require.value
                "
                label="校验错误："
            >
                <el-input
                    v-model="modalFormData.ruleError.value"
                    placeholder="请输入校验错误提示"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.row != 'undefined'"
                label="显示行数："
            >
                <el-input
                    v-model="modalFormData.row.value"
                    placeholder="显示行数"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.autosize != 'undefined'"
                label="自适应高度"
            >
                <el-radio-group v-model="modalFormData.autosize.value">
                    <el-radio :label="true">开启</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="
                    typeof modalFormData.autosize != 'undefined' &&
                        modalFormData.autosize.value
                "
                label="行数区间"
            >
                <div class="interregional">
                    <el-input
                        v-model.number="modalFormData.minRows.value"
                        placeholder="最小行数"
                    ></el-input>
                    <span> - </span>
                    <el-input
                        v-model.number="modalFormData.maxRows.value"
                        placeholder="最大行数"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData['@change'] != 'undefined'"
                label="事件绑定："
            >
                <el-input
                    v-model="modalFormData['@change'].value"
                    placeholder="事件绑定"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.maxSize != 'undefined'"
                key="maxSize"
                label="最大限制："
                prop="maxSize.value"
            >
                <el-input-number
                    v-model="modalFormData.maxSize.value"
                    :formatter="value => `${value}kb`"
                    :parser="value => value.replace('kb', '')"
                    placeholder="请输入上传文件最大限制"
                >
                </el-input-number>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.clearable != 'undefined'"
                label="删除按钮："
            >
                <el-radio-group v-model="modalFormData.clearable.value">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.type != 'undefined'"
                label="日期类型："
            >
                <el-radio-group v-model="modalFormData.type.value">
                    <template v-if="modalFormData.type.style === 1">
                        <el-radio label="year">年</el-radio>
                        <el-radio label="month">月</el-radio>
                        <el-radio label="date">日</el-radio>
                        <el-radio label="dates">多个日期</el-radio>
                        <el-radio label="week">周</el-radio>
                        <el-radio label="datetime">日期+时间</el-radio>
                    </template>
                    <template v-else>
                        <el-radio label="datetimerange">日期和时间范围</el-radio>
                        <el-radio label="daterange">日期范围</el-radio>
                        <el-radio label="monthrange">月份范围</el-radio>
                    </template>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData['start-placeholder'] != 'undefined'"
                label="开始提示语："
            >
                <el-input
                    v-model="modalFormData['start-placeholder'].value"
                    placeholder="请输入开始提示语"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData['end-placeholder'] != 'undefined'"
                label="结束提示语："
            >
                <el-input
                    v-model="modalFormData['end-placeholder'].value"
                    placeholder="请输入结束提示语"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.filterable != 'undefined'"
                label="是否可搜索："
            >
                <el-radio-group v-model="modalFormData.filterable.value">
                    <el-radio :label="true">YES</el-radio>
                    <el-radio :label="false">NO</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="
                    typeof modalFormData.multiple != 'undefined' &&
                        modalFormData.type != 'address'
                "
                label="是否多选："
            >
                <el-checkbox v-model="modalFormData.multiple.value">多选</el-checkbox>
            </el-form-item>
            <el-form-item
                v-if="typeof modalFormData.format != 'undefined'"
                label="时间格式："
            >
                <el-radio-group v-model="modalFormData.format.value">
                    <el-radio label="yyyy年MM月dd日"></el-radio>
                    <el-radio label="yyyy-MM-dd HH:mm"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button
                type="text"
                @click="handleCancel"
            >取消</el-button>
            <el-button
                type="primary"
                :loading="modalFormData.loading"
                @click="handleOk"
            >确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "ConfigDialog",
    props: {
        el: {
            type: String,
            required: true
        }
    },
    data () { },
    methods: {
        // modal点击确定执行事件
        handleOk () {
            this.$refs["modalFormData"].validate(valid => {
                console.log(valid);
                if (!valid) {
                    return;
                }
                const index = this.modalFormData.listIndex;
                this.sortable_item[index].obj = Object.assign(
                    {},
                    this.sortable_item[index].obj,
                    this.modalFormData
                );
                this.handleCancel();
            });
        },
        // modal点击取消执行事件，清空当前modal内容
        handleCancel () {
            this.$refs["modalFormData"].validate(valid => {
                if (!valid) {
                    this.removeEle(this.modalFormData.listIndex);
                }
                this.showModal = false;
                setTimeout(() => {
                    this.modalFormData = {
                        loading: false
                    };
                }, 500);
            });
        }
    }
};
</script>

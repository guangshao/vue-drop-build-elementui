<template>
    <el-dialog
        :visible.sync="codeContentModal"
        title="HTML 代码"
        :mask-closable="false"
    >
        <prism-editor
            :code="code"
            :language="language"
        ></prism-editor>
        <div slot="footer">
            <el-button
                ref="copy"
                v-clipboard:copy="code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                type="primary"
            >复制代码</el-button>
        </div>
    </el-dialog>
</template>

<script>

export default {
    name: "CodeDialog",
    props: {
        // 代码高亮
        code: {
            type: String,
            default: ""
        },
        language: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            codeContentModal: false
        };
    },
    methods: {
        open () {
            this.codeContentModal = true;
        },
        // 复制代码
        onCopy () {
            this.$message({
                // /*这是使用了element-UI的信息弹框*/
                message: "复制成功！",
                type: "success"
            });
        },
        onError () {
            this.$message({
                message: "复制失败，请手动选择复制！",
                type: "error"
            });
        }
    }
};
</script>

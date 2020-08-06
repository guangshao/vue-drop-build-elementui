/**
 * eslint配置
 * @author szyeliming@ininin.com
 * @since 2020-02-14
 * @version 1.0.0
 * @description eslint配置
 * https://eslint.org/docs/user-guide/configuring
 * @copyright ininin.com
 */
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        "plugin:vue/recommended"
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        // "standard"
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // "writable"允许变量被覆盖
        // "readonly"不允许覆盖
        WxLogin: "readonly", // 微信登录js
        AMap: "readonly",
        BMap: "readonly",
        process: "readonly",
        require: "readonly"
    },
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        // vue html 缩进规则
        "vue/html-indent": [
            "error",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        // 在多行行元素的内容之前和之后需要换行
        "vue/multiline-html-element-content-newline": 0,
        // 在单行元素的内容之前和之后需要换行
        "vue/singleline-html-element-content-newline": 0,
        // vue html 强制每行的最大属性数
        "vue/max-attributes-per-line": 0,
        // 标签自关闭
        "vue/html-self-closing": 0,
        // props 必须返回默认值
        "vue/require-default-prop": 0,
        // props 必须定义类型
        "vue/require-prop-types": 0,
        // 不允许使用 v-html 指令
        "vue/no-v-html": 0,
        // 禁止await在循环内部（不等待循环）
        "no-await-in-loop": "error",
        // 禁止使用 console
        // "no-console": ["error", { allow: ["warn", "error"] }],
        // 检查代码是否包含 debugger
        "no-debugger": 0, //process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 禁止不必要的括号
        "no-extra-parens": "error",
        // 禁止丢失精度的数字文字
        // "no-loss-of-precision": "error",
        // 禁止从Promise执行器函数返回值
        // "no-promise-executor-return": "error",
        // 禁止仅允许一次迭代的主体进行循环
        // "no-unreachable-loop": "error",
        // 在对象和类中强制执行getter / setter对
        // "accessor-pairs": "error",
        // 要求使用`===`和`！==`
        eqeqeq: "error",
        // 禁止提前使用
        "no-use-before-define": ["error", "nofunc"],
        // 强制对象文字属性中的键和值之间保持一致的间距
        "key-spacing": "error",
        // 对多行注释强制使用特定样式
        // "multiline-comment-style": ["error", "starred-block"],
        // 禁止将if语句作为else块中的唯一语句
        "no-lonely-if": "error",
        // 禁止在属性前使用空格
        "no-whitespace-before-property": "error",
        "no-mixed-spaces-and-tabs": "off",
        // 对象内空格格式一致
        "object-curly-spacing": ["error", "always"],
        // 强制使用反引号，双引号或单引号
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
                avoidEscape: true
            }
        ],
        // 要求或禁止使用分号代替ASI
        semi: "error",
        // 强制分号的位置
        "semi-style": ["error", "last"],
        // 要求或不允许以空格（制表符或制表符）开头的注释
        "spaced-comment": ["error", "always"],
        // 在箭头功能主体中需要括号
        "arrow-body-style": ["error", "as-needed"],
        // 在箭头函数参数如果可能省略括号
        "arrow-parens": ["error", "as-needed"],
        // 在箭头函数的箭头之前/之后需要空格
        "arrow-spacing": "error",
        // 禁止使用 var
        "no-var": "error",
        // 需要JSDoc注释
        "require-jsdoc": [
            "error",
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    ArrowFunctionExpression: false,
                    FunctionExpression: false
                }
            }
        ],
        "valid-jsdoc": [
            "error",
            {
                requireReturn: false,
                requireParamDescription: false,
                requireReturnDescription: true
            }
        ]
    }
};

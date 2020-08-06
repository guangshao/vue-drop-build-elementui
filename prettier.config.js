/**
 * prettier验证插件配置
 * @author szyeliming@ininin.com
 * @since 2020-02-14
 * @version 1.0.0
 * @description prettier验证插件配置
 * @copyright ininin.com
 */

module.exports = {
	// 单行最大长度，默认为80
	printWidth: 100,
	// tab缩进大小,默认为2
	tabWidth: 4,
	// 使用tab缩进，默认false
	useTabs: false,
	/**
	 * 在语句末尾添加分号,默认为 true
	 * 有效参数：
	 *      true - 在每一条语句后面添加分号
	 *      false - 只在有可能导致ASI错误的行首添加分号
	 */
	semi: true,
	// 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	singleQuote: false,
	/**
	 * 在任何可能的多行中输入尾逗号，默认为 none
	 * 有效参数：
	 *      none - 无尾逗号；
	 *      es5 - 添加es5中被支持的尾逗号
	 *      all - 所有可能的地方都被添加尾逗号；（包括函数参数），这个参数需要安装nodejs8或更高版本
	 */
	trailingComma: "none",
	/**
	 * 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 默认 true
	 * 有效参数：
	 *     true - Example: { foo: bar }
	 *     false - Example: {foo: bar}
	 */
	bracketSpacing: true,
	/**
	 * JSX标签闭合位置 默认false
	 * 有效选项：
	 *      true - 示例：
	 *      <button
	 *          className="prettier-class"
	 *          id="prettier-id"
	 *          onClick={this.handleClick}>
	 *          Click Here
	 *      </button>
	 *      false - 示例：
	 *      <button
	 *          className="prettier-class"
	 *          id="prettier-id"
	 *          onClick={this.handleClick}
	 *      >
	 *          Click Here
	 *      </button>
	 */
	jsxBracketSameLine: true,
	/**
	 * 在单独的箭头函数参数周围包括括号 默认 avoid
	 * 有效选项：
	 *      "avoid"-如果可能的话，省去parens。例：x => x
	 *      "always"-始终包含括号。例：(x) => x
	 */
	arrowParens: "avoid",
	/**
	 * 指定HTML文件的全局空格敏感度，默认值 "css"
	 * 有效选项：
	 *      "css"- 遵守CSS display属性的默认值。
	 *      "strict" - 空白被认为是敏感的。
	 *      "ignore" - 空白被认为是不敏感的。
	 */
	htmlWhitespaceSensitivity: "css",
	/**
	 * 是否缩进Vue文件中的代码<script>和<style>标记。 默认值 false
	 * 有些人（例如Vue的创建者）不缩进以保存缩进级别，但这可能会破坏编辑器中的代码折叠
	 * 有效选项：
	 *      false - 不要缩进Vue文件中的脚本和样式标签。
	 *      true - 在Vue文件中缩进脚本和样式标签。
	 */
	vueIndentScriptAndStyle: true,
	/**
	 * 行尾样式，默认值 "auto"
	 * 有效选项：
	 *      "auto" -维持现有的行尾（通过查看第一行后的内容对一个文件中的混合值进行归一化）
	 *      "lf"–仅\n换行（），在Linux和macOS以及git repos内部通用
	 *      "crlf"-回车符+换行符（\r\n），在Windows上很常见
	 *      "cr"-仅回车符（\r），很少使用
	 */
	endOfLine: "lf"
};

/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-05 09:25:14
 * @LastEditors: guang
 * @Description:
 */
export default (_self, h) => {
    let icons = [];
    // 配置按钮
    icons.push(
        h("i", {
            class: {
                "el-icon-edit": true
            },
            on: {
                click() {
                    _self.$emit("handleConfEle", _self.index);
                }
            }
        })
    );
    // 删除按钮
    icons.push(
        h("i", {
            class: {
                "el-icon-delete": true
            },
            on: {
                click() {
                    _self.$emit("handleRemoveEle", _self.index);
                }
            }
        })
    );
    const item_icon = h(
        "div",
        {
            class: {
                "item-icon": true
            }
        },
        icons
    );
    return item_icon;
};

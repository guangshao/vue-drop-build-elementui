export default (_self, h) => {
  let icons = [];
  // 配置按钮
  if (!!_self.obj.config) {
    icons.push(h('i', {
      class: {
        'el-icon-menu': true,
      },
      on: {
        click() {
          _self.$emit('handleConfEle', _self.index);
        }
      }
    }));
  }
  // 删除按钮
  icons.push(h('i', {
    class: {
      'el-icon-delete': true,
    },
    on: {
      click() {
        _self.$emit('handleRemoveEle', _self.index);
      }
    }
  }));
  const item_icon = h('div', {
    class: {
      'item-icon': true
    }
  }, icons);
  return item_icon;
}

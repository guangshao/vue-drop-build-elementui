/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-05 16:51:26
 * @LastEditors: guang
 * @Description:
 */
const formatJs = function(sortableItem) {
    let formData = {};
    // let methods = {};

    sortableItem.forEach(({ config }) => {
        const attrArr = Object.keys(config);
        for (let i = 0; i < attrArr.length; i++) {
            const attr = attrArr[i];
            if (attr.ignore) {
                continue;
            }
            if (attr === "v-model") {
                console.log("v-model", config[attr].value);
                formData[config[attr].value] = "";
            }
        }
    });

    let code = `export default {
        data() {
            return {formData: ${JSON.stringify(formData)}};
        },
        methods: {
        },
    };`;

    // ${methods.join("\n")}
    return code;
};

// function createObj(arr, index) {
//   const obj = {};
//   if (arr.length > ++index) {
//     obj[arr[index]] = createObj();
//   } else {
//     obj[arr[index]] = "";
//   }
//   return obj;
// }

export default formatJs;

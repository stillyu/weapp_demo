export const chineseNameRule = {
  type: "chineseName",
  validator: (rule, value) => {
    if (value.length < 2) {
      return Promise.reject("姓名需大于等于2个汉字");
    } else if (value.length > 10) {
      return Promise.reject("姓名需小于等于10个汉字");
    } else if (
      !/^[\u4E00-\u9FA5][\u4E00-\u9FA5|·|•]*[\u4E00-\u9FA5]$/.test(value)
    ) {
      return Promise.reject("姓名仅支持填写中文或者符号“·”");
    }
    return Promise.resolve();
  },
};

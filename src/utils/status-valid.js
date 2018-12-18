const httpStatus = require('http-status');
/**
 * 
 * @param {*} that 
 * @param {*} status 
 * @param {*} message 
 */
export const statusValid = (that, status, data) => {
  if (that.actionStatus) that.actionStatus = false;
  if (status === httpStatus.OK) {
    if(data && data.code === httpStatus.OK) return true
    that.$message({
      message: data.data || data.message,
      type: 'error'
    });
    return false;
  }else{
    console.log("===========status======="+status);
    if (status === httpStatus.FORBIDDEN) {
      that.$message({
        message: '登陆过期，请重新登陆',
        type: 'error',
        onClose: () => {
          that.$router.replace({ path: '/login' });
        }
      });
      return false
    }
    switch (status) {
      case httpStatus.NOT_FOUND:
        that.$message({
          message: '请求不存在',
          type: 'error'
        });
        break;
      case httpStatus.UNAUTHORIZED:
        that.$message({
          message: data,
          type: 'error'
        });
        break;
      case httpStatus.METHOD_NOT_ALLOWED:
        that.$message({
          message: '请求方式出错',
          type: 'error'
        });
        break;
      default:
        that.$message({
          message: '服务器出错',
          type: 'error'
        });
        break;
    }
    return false
  }
}
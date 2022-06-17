import OSS from 'ali-oss'
import { getALiUploadInfo } from '@/api/utilsApi.js'
// import { Message } from 'element-ui'
import { getFileType } from '@/utils/fileType.js'
/**
 * 
 * @param {*} uploadPath 上传服务器地址：默认上传到backstage目录下面
 * @param {*} file 二进制流
 * @returns 
 */
export const uploadFiles = async (file, uploadPath = '') => {
  try {
    const fileType = getFileType(file.name)
    console.log('fileType', fileType)
    let path = uploadPath ? `backstage/${fileType ? fileType : 'unknowTypeFile'}/${uploadPath}` : `backstage/${file.name}`
    const res = await getALiUploadInfo()
    console.log('getALiUploadInfo', res)
    if (res && res.errcode == 0 && res.data && res.data.tokeninfo) {
      const { AccessKeyId, AccessKeySecret, SecurityToken, Expiration, Bucket, Region } = res.data.tokeninfo
      const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-hangzhou',
        
        accessKeyId: AccessKeyId,
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeySecret: AccessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: SecurityToken,
        // 填写Bucket名称。
        bucket: Bucket
      });
      
      const result = await client.put(path, file);
      console.log('result, path', result, path)

      if(result && result.res &&  result.res.status == 200) {
        return  Promise.resolve(result)
      }else {
        return Promise.reject(result)
      }
    } else {
      // Message({
      //   type: 'error',
      //   message: '获取阿里token信息失败，请重试！'
      // })
      return Promise.reject(res)
    }
  } catch (error) {
    console.log('error', error)
    // Message({
    //   type: 'error',
    //   message: '上传失败，请重试！'
    // })
    return Promise.reject(error)
  }
}
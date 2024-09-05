/** @enum NIMDocTranscodingFileType 转码源文件格式 */
export enum NIMDocTranscodingFileType {
  /** ppt */
  kNIMDocTranscodingFileTypePPT = 1,
  /** pptx */
  kNIMDocTranscodingFileTypePPTX = 2,
  /** pdf */
  kNIMDocTranscodingFileTypePDF = 3
}

/** @enum NIMDocTranscodingImageType 转码目标图像文件类型 */
export enum NIMDocTranscodingImageType {
  /** 转码为 jpg 图片 */
  kNIMDocTranscodingImageTypeJPG = 10,
  /** 转码为 png 图片 */
  kNIMDocTranscodingImageTypePNG = 11
}

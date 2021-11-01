/** @enum NIMDocTranscodingFileType 转码源文件格式 */
export enum NIMDocTranscodingFileType
{
  kNIMDocTranscodingFileTypePPT	= 1,	/** < ppt */
  kNIMDocTranscodingFileTypePPTX	= 2,	/** < pptx */
  kNIMDocTranscodingFileTypePDF	= 3,	/** < pdf */
};

/** @enum NIMDocTranscodingImageType 转码目标图像文件类型 */
export enum NIMDocTranscodingImageType
{
  kNIMDocTranscodingImageTypeJPG	= 10,	/** < 转码为 jpg 图片 */
  kNIMDocTranscodingImageTypePNG	= 11,	/** < 转码为 png 图片 */
};

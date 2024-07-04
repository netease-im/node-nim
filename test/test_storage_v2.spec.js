import { v2 } from '../dist/node-nim'
import assert from 'assert'
import os from 'os'
import path from 'path'

describe('******************** Storage ********************', function () {
  describe('#downloadFile', async function () {
    it('Download file should return success.', async function () {
      const savePath = path.join(os.tmpdir(), 'conf.jsp')
      const result = await v2.storageService.downloadFile('https://lbs.netease.im/lbs/conf.jsp', savePath, (progress) => {
        console.log('progress:', progress)
      })
      assert.strictEqual(result, savePath)
    })
  })
  describe('#cancelDownloadFile', function () {
    const largeFile = 'https://yx-web-nosdn.netease.im/package/1670306958432/NIM_Demo_Setup_9.4.0.223.exe'
    before(function () {
      // download a large file
      try {
        v2.storageService.downloadFile(largeFile, path.join(os.tmpdir(), 'large.file'))
      } catch (e) {
        console.log(e)
      }
    })
    it('Cancel a large file task should return success', async function () {
      await v2.storageService.cancelDownloadFile(largeFile)
    })
    it('Cancel download a file not exists should return with error code 191006.', async function () {
      try {
        await v2.storageService.cancelDownloadFile('https://lbs.netease.im/lbs/conf.jsp')
      } catch (e) {
        console.assert(e.code === 191006)
      }
    })
  })
  describe('#downloadAttachment', function () {
    it('Download attachment should return success.', async function () {
      const result = await v2.storageService.downloadAttachment({
        attachment: {
          'attachmentType': 1,
          'ext': '.png',
          'height': 0,
          'md5': '37620bb7d24472147f2de08ee07da557',
          'name': 'Screenshot 2024-04-11 at 13.49.45.png',
          'path': '',
          'raw': '{"ext":".png","h":0,"md5":"37620bb7d24472147f2de08ee07da557","name":"Screenshot 2024-04-11 at 13.49.45.png","path":"/Users/jj.deng/Desktop/Screenshot 2024-04-11 at 13.49.45.png","sceneName":"nim_default_im","size":46684,"uploadState":1,"url":"https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc","w":0}',
          'sceneName': 'nim_default_im',
          'size': 46684,
          'uploadState': 1,
          'url': 'https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc',
          'width': 0
        },
        type: 0,
        thumbSize: {
          width: 150,
          height: 150
        },
      }, (progress) => {
        console.log('progress:', progress)
      })
      // result 不为空
      assert.ok(result)
    })
  })
  describe('#getImageThumbUrl', function () {
    it('Get image thumb url should return success.', async function () {
      const result = await v2.storageService.getImageThumbUrl(
        {
          'attachmentType': 1,
          'ext': '.png',
          'height': 0,
          'md5': '37620bb7d24472147f2de08ee07da557',
          'name': 'Screenshot 2024-04-11 at 13.49.45.png',
          'path': '',
          'raw': '{"ext":".png","h":0,"md5":"37620bb7d24472147f2de08ee07da557","name":"Screenshot 2024-04-11 at 13.49.45.png","path":"/Users/jj.deng/Desktop/Screenshot 2024-04-11 at 13.49.45.png","sceneName":"nim_default_im","size":46684,"uploadState":1,"url":"https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc","w":0}',
          'sceneName': 'nim_default_im',
          'size': 46684,
          'uploadState': 1,
          'url': 'https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc',
          'width': 0
        },
        {
          width: 150,
          height: 150
        }
      )
      // result.url 包含 ?imageView&thumbnail=150x150
      assert.ok(result.url.includes('?imageView&thumbnail=150x150'))
    })
  })
  describe('#getVideoCoverUrl', function () {
    it('Get video cover url should return success.', async function () {
      const result = await v2.storageService.getVideoCoverUrl(
        {
          'attachmentType': 3,
          'ext': '.mp4',
          'height': 0,
          'md5': '37620bb7d24472147f2de08ee07da557',
          'name': 'Screenshot 2024-04-11 at 13.49.45.mp4',
          'path': '',
          'raw': '{"ext":".mp4","h":0,"md5":"37620bb7d24472147f2de08ee07da557","name":"Screenshot 2024-04-11 at 13.49.45.mp4","path":"/Users/jj.deng/Desktop/Screenshot 2024-04-11 at 13.49.45.mp4","sceneName":"nim_default_im","size":46684,"uploadState":1,"url":"https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc","w":0}',
          'sceneName': 'nim_default_im',
          'size': 46684,
          'uploadState': 1,
          'url': 'https://imtest-jd.netease.im/mix-store-proxy-cdn/MTAxMTAxMA==/czNhcHBfNTE0NDA1MDZfMTcxODE1ODIxNTE3N18xYzlhNDhmOS0wM2I5LTRmNTktYWNkNS05NDMwNDNiZjAyZTEmMiYxMjAyNiZ5dW4teGluJmFwLXNvdXRoZWFzdC0x_oxc',
          'width': 0
        }
      )
      // result.url 包含 ?vframe/jpg/offset/0
      assert.ok(result.url.includes('?vframe&offset=0&resize=150x150&type=png'))
    })
  })
})

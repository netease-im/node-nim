#! /usr/bin/env node

const { Command } = require('commander')
const WebAT = require('hawk-web')
const program = new Command()
const os = require('os')
const path = require('path')
const fs = require('fs')
const v8 = require('v8')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const downloadSDK = require('./script/download-sdk.js').downloadSDK

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp({
      format: () => {
        const now = new Date()
        const dateStr = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        const ms = now.getMilliseconds().toString().padStart(3, '0')
        return `${dateStr}.${ms}`
      }
    }),
    loggerFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: (() => {
        const logDir = path.join(os.homedir(), 'Downloads', 'node-nim')
        // 如果文件夹不存在则创建
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true })
        }
        return path.join(logDir, `node-memory-${new Date().toISOString().split('T')[0]}-${process.pid}.log`)
      })()
    }),
  ],
})

function getSystemMemoryInfo () {
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()
  const usedMemory = totalMemory - freeMemory

  return {
    total: Math.round(totalMemory / 1024 / 1024),      // MB
    free: Math.round(freeMemory / 1024 / 1024),        // MB
    used: Math.round(usedMemory / 1024 / 1024),        // MB
    usagePercent: Math.round((usedMemory / totalMemory) * 100) // 百分比
  }
}

function getProcessMemoryInfo () {
  const usage = process.memoryUsage()
  return {
    rss: Math.round(usage.rss / 1024 / 1024),           // 常驻内存大小
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // 堆总大小ß
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),   // 堆已使用
    external: Math.round(usage.external / 1024 / 1024),   // V8 外部内存
    arrayBuffers: Math.round((usage.arrayBuffers || 0) / 1024 / 1024) // ArrayBuffer 大小
  }
}

function getV8HeapDetails () {
  const heapStats = v8.getHeapStatistics()
  const heapSpaceStats = v8.getHeapSpaceStatistics()

  return {
    heap: {
      totalHeapSize: Math.round(heapStats.total_heap_size / 1024 / 1024),           // 总堆大小 MB
      totalHeapSizeExecutable: Math.round(heapStats.total_heap_size_executable / 1024 / 1024), // 可执行堆大小 MB
      totalPhysicalSize: Math.round(heapStats.total_physical_size / 1024 / 1024),   // 物理大小 MB
      totalAvailableSize: Math.round(heapStats.total_available_size / 1024 / 1024), // 可用大小 MB
      usedHeapSize: Math.round(heapStats.used_heap_size / 1024 / 1024),             // 已使用堆大小 MB
      heapSizeLimit: Math.round(heapStats.heap_size_limit / 1024 / 1024),           // 堆大小限制 MB (max-old-space-size)
      mallocedMemory: Math.round(heapStats.malloced_memory / 1024 / 1024),          // malloc 分配的内存 MB
      peakMallocedMemory: Math.round(heapStats.peak_malloced_memory / 1024 / 1024), // 峰值 malloc 内存 MB
      numberOfNativeContexts: heapStats.number_of_native_contexts,                  // 原生上下文数量
      numberOfDetachedContexts: heapStats.number_of_detached_contexts              // 分离上下文数量
    },
    spaces: heapSpaceStats.map(space => ({
      name: space.space_name,
      size: Math.round(space.space_size / 1024 / 1024),                           // 空间大小 MB
      used: Math.round(space.space_used_size / 1024 / 1024),                      // 已使用大小 MB
      available: Math.round(space.space_available_size / 1024 / 1024),            // 可用大小 MB
      physical: Math.round(space.physical_space_size / 1024 / 1024)               // 物理大小 MB
    }))
  }
}

program
  .command('run')
  .description('run node-nim tester')
  .requiredOption('--deviceId <deviceId>', 'tester device id')
  .option('--taskId <taskId>', 'hawk test suite task id')
  .option('--url <url>', 'hawk websocket url')
  .option('--version <version>', 'test sdk version')
  .option('--nimSdkUrl <nimSdkUrl>', 'nim native sdk download url')
  .allowUnknownOption(true)
  .action(async (options) => {
    logger.info(`run node-nim tester, options: ${JSON.stringify(options)}`)
    const heapStats = v8.getHeapStatistics()
    logger.info(`V8 heap limit (max-old-space-size): ${Math.round(heapStats.heap_size_limit / 1024 / 1024)} MB`)
    setInterval(() => {
      const processMemoryUsage = getProcessMemoryInfo()
      logger.info(`System memory usage: ${JSON.stringify(getSystemMemoryInfo(), null, 2)}`)
      logger.info(`Process memory usage: ${JSON.stringify(getProcessMemoryInfo(), null, 2)}`)
      logger.info(`V8 heap details: ${JSON.stringify(getV8HeapDetails())}`)
      if (processMemoryUsage.heapTotal > 1000) {
        const logDir = path.join(os.homedir(), 'Downloads', 'node-nim')
        // 如果文件夹不存在则创建
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true })
        }
        const heapSnapshotFile = path.join(logDir, `node-heap-snapshot-${new Date().toISOString().split('T')[0]}-${process.pid}.log`)
        if (!fs.existsSync(heapSnapshotFile)) {
          logger.info(`Writing heap snapshot to ${heapSnapshotFile}`)
          require('v8').writeHeapSnapshot(heapSnapshotFile)
        }
      }
    }, 5 * 1000)
    if (options.nimSdkUrl) {
      await downloadSDK(options.nimSdkUrl)
    }
    const nimInstance = require('./dist/node-nim')
    nimInstance.v2 = new nimInstance.V2NIMClient()
    nimInstance.nim = new nimInstance.NIM()
    nimInstance.qchat = new nimInstance.QChat()
    nimInstance.chatroom = new nimInstance.ChatRoom()
    new WebAT({
      applicationName: 'nim',
      platform: 'Windows&MacOS',
      version: options.version,
      url: options.url,
      deviceId: options.deviceId,
      taskId: options.taskId,
      targets: {
        NIM: nimInstance
      },
      oncompleted: () => {
        // 执行完成后退出进程
        process.exit(0)
      }
    })
  })

// parse
program.parse()

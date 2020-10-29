import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

import { PriceItem } from '@/types';

// 更新 PriceItem 接口，添加包含IP数量
interface ExtendedPriceItem extends PriceItem {
  includedIPs: number;
}

export const priceList: ExtendedPriceItem[] = [
  // 中国香港
  { exportType: "中国香港", bandwidth: 4, standardPrice: 5660, includedIPs: 1 },
  { exportType: "中国香港", bandwidth: 6, standardPrice: 8490, includedIPs: 1 },
  { exportType: "中国香港", bandwidth: 8, standardPrice: 11320, includedIPs: 1 },
  { exportType: "中国香港", bandwidth: 10, standardPrice: 14150, includedIPs: 1 },
  { exportType: "中国香港", bandwidth: 20, standardPrice: 24080, includedIPs: 1 },
  { exportType: "中国香港", bandwidth: 30, standardPrice: 28950, includedIPs: 3 },
  { exportType: "中国香港", bandwidth: 40, standardPrice: 38600, includedIPs: 3 },
  { exportType: "中国香港", bandwidth: 50, standardPrice: 48250, includedIPs: 3 },
  { exportType: "中国香港", bandwidth: 60, standardPrice: 50280, includedIPs: 5 },
  { exportType: "中国香港", bandwidth: 70, standardPrice: 58660, includedIPs: 5 },
  { exportType: "中国香港", bandwidth: 80, standardPrice: 67040, includedIPs: 5 },
  { exportType: "中国香港", bandwidth: 100, standardPrice: 83800, includedIPs: 5 },
  { exportType: "中国香港", bandwidth: 150, standardPrice: 118500, includedIPs: 10 },
  { exportType: "中国香港", bandwidth: 200, standardPrice: 158000, includedIPs: 10 },
  { exportType: "中国香港", bandwidth: 300, standardPrice: 173400, includedIPs: 10 },
  { exportType: "中国香港", bandwidth: 400, standardPrice: 231200, includedIPs: 10 },
  { exportType: "中国香港", bandwidth: 500, standardPrice: 289000, includedIPs: 10 },
  { exportType: "中国香港", bandwidth: 1000, standardPrice: 547000, includedIPs: 10 },

  // 新加坡
  { exportType: "新加坡", bandwidth: 4, standardPrice: 10332, includedIPs: 1 },
  { exportType: "新加坡", bandwidth: 6, standardPrice: 15498, includedIPs: 1 },
  { exportType: "新加坡", bandwidth: 8, standardPrice: 20664, includedIPs: 1 },
  { exportType: "新加坡", bandwidth: 10, standardPrice: 25830, includedIPs: 1 },
  { exportType: "新加坡", bandwidth: 20, standardPrice: 44000, includedIPs: 1 },
  { exportType: "新加坡", bandwidth: 30, standardPrice: 60150, includedIPs: 3 },
  { exportType: "新加坡", bandwidth: 40, standardPrice: 70520, includedIPs: 3 },
  { exportType: "新加坡", bandwidth: 50, standardPrice: 88150, includedIPs: 3 },
  { exportType: "新加坡", bandwidth: 60, standardPrice: 91680, includedIPs: 5 },
  { exportType: "新加坡", bandwidth: 70, standardPrice: 106960, includedIPs: 5 },
  { exportType: "新加坡", bandwidth: 80, standardPrice: 122240, includedIPs: 5 },
  { exportType: "新加坡", bandwidth: 100, standardPrice: 152800, includedIPs: 5 },
  { exportType: "新加坡", bandwidth: 150, standardPrice: 216450, includedIPs: 10 },
  { exportType: "新加坡", bandwidth: 200, standardPrice: 288600, includedIPs: 10 },
  { exportType: "新加坡", bandwidth: 300, standardPrice: 355200, includedIPs: 10 },
  { exportType: "新加坡", bandwidth: 400, standardPrice: 473600, includedIPs: 10 },
  { exportType: "新加坡", bandwidth: 500, standardPrice: 592000, includedIPs: 10 },
  { exportType: "新加坡", bandwidth: 1000, standardPrice: 1117000, includedIPs: 10 },
  // ... 其他新加坡数据

  // 泰国
  { exportType: "泰国", bandwidth: 4, standardPrice: 10332, includedIPs: 1 },
  { exportType: "泰国", bandwidth: 6, standardPrice: 15498, includedIPs: 1 },
  // ... 其他泰国数据

  // 马来西亚
  { exportType: "马来西亚", bandwidth: 4, standardPrice: 10332, includedIPs: 1 },
  { exportType: "马来西亚", bandwidth: 6, standardPrice: 15498, includedIPs: 1 },
  // ... 其他马来西亚数据

  // 中国台湾
  { exportType: "中国台湾", bandwidth: 4, standardPrice: 10332, includedIPs: 1 },
  { exportType: "中国台湾", bandwidth: 6, standardPrice: 15498, includedIPs: 1 },
  // ... 其他中国台湾数据

  // 日本
  { exportType: "日本", bandwidth: 4, standardPrice: 10332, includedIPs: 1 },
  { exportType: "日本", bandwidth: 6, standardPrice: 15498, includedIPs: 1 },
  // ... 其他日本数据

  // 欧美
  { exportType: "欧美", bandwidth: 4, standardPrice: 13644, includedIPs: 1 },
  { exportType: "欧美", bandwidth: 6, standardPrice: 20466, includedIPs: 1 },
  // ... 其他欧美数据

  // 中东非
  { exportType: "中东非", bandwidth: 4, standardPrice: 13216, includedIPs: 1 },
  { exportType: "中东非", bandwidth: 6, standardPrice: 19824, includedIPs: 1 },
  // ... 其他中东非数据
]; 
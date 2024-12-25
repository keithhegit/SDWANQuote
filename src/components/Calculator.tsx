import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalculatorInput, CalculationResult } from '@/types';
import { calculatePrice } from '@/utils/calculator';
import { DISCOUNTS } from '@/data/constants';
import { priceList } from '@/data/prices';
import { Logo } from '@/components/Logo';

export default function Calculator() {
  const [input, setInput] = useState<CalculatorInput>({
    exportType: '',
    bandwidth: 0,
    discount: 0.25,
    extraIPs: 0,
    mobileTerminals: 0
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const exportTypes = Array.from(new Set(priceList.map(item => item.exportType)));
  const bandwidths = (exportType: string) => 
    priceList
      .filter(item => item.exportType === exportType)
      .map(item => item.bandwidth);

  const handleCalculate = () => {
    const result = calculatePrice(input);
    setResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Logo />

      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* 标题 */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            SDWAN价格计算器
          </h1>

          {/* 出口选择 */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  出口方向
                </label>
                <select
                  className="w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg shadow-sm focus:border-brand focus:ring-brand"
                  value={input.exportType}
                  onChange={(e) => setInput({...input, exportType: e.target.value})}
                >
                  <option value="">请选择</option>
                  {exportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  带宽
                </label>
                <select
                  className="w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg shadow-sm focus:border-brand focus:ring-brand"
                  value={input.bandwidth}
                  onChange={(e) => setInput({...input, bandwidth: Number(e.target.value)})}
                  disabled={!input.exportType}
                >
                  <option value="0">请选择</option>
                  {input.exportType && bandwidths(input.exportType).map(bw => (
                    <option key={bw} value={bw}>{bw}M</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 折扣选择 */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              折扣
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DISCOUNTS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setInput({...input, discount: value})}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                    ${input.discount === value 
                      ? 'bg-brand text-white' 
                      : 'bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 附加服务 */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              其他
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  增加IP数量
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg shadow-sm focus:border-brand focus:ring-brand"
                  value={input.extraIPs}
                  onChange={(e) => setInput({...input, extraIPs: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  增加移动终端数量
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg shadow-sm focus:border-brand focus:ring-brand"
                  value={input.mobileTerminals}
                  onChange={(e) => setInput({...input, mobileTerminals: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          {/* 计算按钮 */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-brand hover:bg-brand-dark text-white rounded-md shadow-sm transition-colors"
          >
            计算
          </button>

          {/* 计算结果 */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4 mt-4"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">计算结果</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">基础价格</span>
                  <span className="font-medium">¥{result.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">折扣后价格</span>
                  <span className="font-medium">¥{result.discountedPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">额外IP费用</span>
                  <span className="font-medium">¥{result.extraIPsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">移动终端费用</span>
                  <span className="font-medium">¥{result.terminalsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-dark-border">
                  <span className="font-medium text-gray-900 dark:text-gray-100">总价</span>
                  <span className="font-bold text-brand">¥{result.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 
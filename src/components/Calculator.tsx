import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorInput, CalculationResult } from '@/types';
import { calculatePrice } from '@/utils/calculator';
import { DISCOUNTS } from '@/data/constants';
import { priceList } from '@/data/prices';
import {
  CurrencyYenIcon,
  ArrowPathIcon,
  PlusIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6 space-y-8"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          SDWAN价格计算器
        </h1>
        
        {/* 步骤1：基础选择 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              1
            </span>
            选择基础配置
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 出口类型选择 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                出口类型
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-dark-border dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={input.exportType}
                onChange={(e) => setInput({...input, exportType: e.target.value})}
              >
                <option value="">请选择</option>
                {exportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* 带宽选择 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                带宽
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-dark-border dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={input.bandwidth}
                onChange={(e) => setInput({...input, bandwidth: Number(e.target.value)})}
                disabled={!input.exportType}
              >
                <option value="0">请选择</option>
                {input.exportType && bandwidths(input.exportType).map(bw => (
                  <option key={bw} value={bw}>{bw}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* 步骤2：折扣选择 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              2
            </span>
            选择折扣
          </h2>
          <div className="flex space-x-4">
            {DISCOUNTS.map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded ${
                  input.discount === value 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setInput({...input, discount: value})}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 步骤3：附加服务 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              3
            </span>
            附加服务
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                增加IP数量
              </label>
              <input
                type="number"
                min="0"
                className="w-full rounded-lg border-gray-300 dark:border-dark-border dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={input.extraIPs}
                onChange={(e) => setInput({...input, extraIPs: Number(e.target.value)})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                移动终端数量
              </label>
              <input
                type="number"
                min="0"
                className="w-full rounded-lg border-gray-300 dark:border-dark-border dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={input.mobileTerminals}
                onChange={(e) => setInput({...input, mobileTerminals: Number(e.target.value)})}
              />
            </div>
          </div>
        </motion.div>

        {/* 计算按钮 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleCalculate}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <CurrencyYenIcon className="w-5 h-5" />
            计算价格
          </button>
        </motion.div>

        {/* 计算结果 */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">计算结果</h3>
            <div className="space-y-2">
              <p>基础价格：¥{result.basePrice.toFixed(2)}</p>
              <p>折扣后价格：¥{result.discountedPrice.toFixed(2)}</p>
              <p>额外IP费用：¥{result.extraIPsCost.toFixed(2)}</p>
              <p>移动终端费用：¥{result.terminalsCost.toFixed(2)}</p>
              <p className="text-xl font-bold">总价：¥{result.totalPrice.toFixed(2)}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 
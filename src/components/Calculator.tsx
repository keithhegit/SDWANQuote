import { useState } from 'react';
import { CalculatorInput, CalculationResult } from '@/types';
import { calculatePrice } from '@/utils/calculator';
import { DISCOUNTS } from '@/data/constants';
import { priceList } from '@/data/prices';

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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">SDWAN价格计算器</h1>
      
      {/* 步骤1：基础选择 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">步骤1：选择基础配置</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              出口类型
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            <label className="block text-sm font-medium text-gray-700">
              带宽
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
      </div>

      {/* 步骤2：折扣选择 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">步骤2：选择折扣</h2>
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
      </div>

      {/* 步骤3：附加服务 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">步骤3：附加服务</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              增加IP数量
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={input.extraIPs}
              onChange={(e) => setInput({...input, extraIPs: Number(e.target.value)})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              移动终端数量
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={input.mobileTerminals}
              onChange={(e) => setInput({...input, mobileTerminals: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>

      {/* 计算按钮 */}
      <div className="text-center">
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleCalculate}
        >
          计算价格
        </button>
      </div>

      {/* 计算结果 */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-4">计算结果</h3>
          <div className="space-y-2">
            <p>基础价格：¥{result.basePrice.toFixed(2)}</p>
            <p>折扣后价格：¥{result.discountedPrice.toFixed(2)}</p>
            <p>额外IP费用：¥{result.extraIPsCost.toFixed(2)}</p>
            <p>移动终端费用：¥{result.terminalsCost.toFixed(2)}</p>
            <p className="text-lg font-bold">总价：¥{result.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
} 
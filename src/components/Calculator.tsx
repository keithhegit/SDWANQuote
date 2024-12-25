import { useState } from 'react';
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
    <div className="min-h-screen bg-white p-6">
      {/* Logo */}
      <div className="mb-4">
        <Logo />
      </div>

      {/* 标题 */}
      <h1 className="text-2xl font-bold mb-6">SDWAN价格计算器</h1>

      <div className="space-y-6 max-w-sm">
        {/* 出口选择 */}
        <div>
          <div className="flex items-center mb-2">
            <label className="w-24 text-gray-700">出口方向</label>
            <select
              className="flex-1 border border-gray-300 rounded px-2 py-1"
              value={input.exportType}
              onChange={(e) => setInput({...input, exportType: e.target.value})}
            >
              <option value="">请选择</option>
              {exportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-24 text-gray-700">带宽</label>
            <select
              className="flex-1 border border-gray-300 rounded px-2 py-1"
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

        {/* 折扣选择 */}
        <div>
          <label className="block text-gray-700 mb-2">折扣</label>
          <div className="flex gap-2">
            {DISCOUNTS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setInput({...input, discount: value})}
                className={`px-4 py-1 border rounded
                  ${input.discount === value 
                    ? 'bg-brand text-white border-brand' 
                    : 'bg-white text-gray-700 border-gray-300'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 附加服务 */}
        <div>
          <label className="block text-gray-700 mb-2">其他</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-32 text-gray-700">增加IP数量</label>
              <input
                type="number"
                min="0"
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                value={input.extraIPs}
                onChange={(e) => setInput({...input, extraIPs: Number(e.target.value)})}
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-gray-700">增加移动终端数量</label>
              <input
                type="number"
                min="0"
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                value={input.mobileTerminals}
                onChange={(e) => setInput({...input, mobileTerminals: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>

        {/* 计算按钮 */}
        <button
          onClick={handleCalculate}
          className="w-20 py-1 bg-brand text-white rounded"
        >
          计算
        </button>

        {/* 计算结果 */}
        {result && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>基础价格：</span>
              <span>¥{result.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>折扣后价格：</span>
              <span>¥{result.discountedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>额外IP费用：</span>
              <span>¥{result.extraIPsCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>移动终端费用：</span>
              <span>¥{result.terminalsCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>总价：</span>
              <span>¥{result.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
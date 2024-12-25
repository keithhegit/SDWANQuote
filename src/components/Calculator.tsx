import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorInput, CalculationResult } from '@/types';
import { calculatePrice } from '@/utils/calculator';
import { DISCOUNTS } from '@/data/constants';
import { priceList } from '@/data/prices';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  GlobeAsiaAustraliaIcon, 
  SignalIcon,
  CalculatorIcon,
  PlusIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

// 简化动画配置
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

const slideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

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

  const exportTypeOptions = [
    { value: '', label: '请选择' },
    ...exportTypes.map(type => ({ value: type, label: type }))
  ];

  const bandwidthOptions = input.exportType
    ? [
        { value: 0, label: '请选择带宽大小' },
        ...bandwidths(input.exportType).map(bw => ({ 
          value: bw, 
          label: `${bw}M` 
        }))
      ]
    : [{ value: 0, label: '请选择带宽大小' }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          {/* Logo和标题 */}
          <motion.div 
            {...fadeIn}
            className="text-center space-y-4"
          >
            <Logo />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              SDWAN价格计算器
            </h1>
          </motion.div>

          {/* 主要内容区域 */}
          <motion.div 
            {...slideUp}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6"
          >
            {/* 出口选择 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
                <GlobeAsiaAustraliaIcon className="w-5 h-5" />
                <span>网络配置</span>
              </div>
              
              <Select
                label="出口方向"
                options={exportTypeOptions}
                value={input.exportType}
                onChange={(e) => setInput({...input, exportType: e.target.value})}
              />

              <Select
                label="带宽"
                options={bandwidthOptions}
                value={input.bandwidth}
                onChange={(e) => setInput({...input, bandwidth: Number(e.target.value)})}
                disabled={!input.exportType}
              />
            </div>

            {/* 折扣选择 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
                <CalculatorIcon className="w-5 h-5" />
                <span>折扣选择</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {DISCOUNTS.map(({ label, value }) => (
                  <Button
                    key={value}
                    variant={input.discount === value ? 'primary' : 'outline'}
                    onClick={() => setInput({...input, discount: value})}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 附加服务 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
                <PlusIcon className="w-5 h-5" />
                <span>附加服务</span>
              </div>
              
              <Input
                type="number"
                label="增加IP数量"
                min={0}
                value={input.extraIPs}
                onChange={(e) => setInput({...input, extraIPs: Number(e.target.value)})}
              />

              <Input
                type="number"
                label="增加移动终端数量"
                min={0}
                value={input.mobileTerminals}
                onChange={(e) => setInput({...input, mobileTerminals: Number(e.target.value)})}
              />
            </div>

            {/* 计算按钮 */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleCalculate}
            >
              计算价格
            </Button>
          </motion.div>

          {/* 计算结果 */}
          {result && (
            <motion.div 
              {...fadeIn}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">计算结果</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>基础价格</span>
                  <span>¥{result.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>折扣后价格</span>
                  <span>¥{result.discountedPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>额外IP费用</span>
                  <span>¥{result.extraIPsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>移动终端费用</span>
                  <span>¥{result.terminalsCost.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white">
                    <span>总价</span>
                    <span>¥{result.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 
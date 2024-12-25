import { CalculatorInput, CalculationResult } from '@/types';
import { priceList } from '@/data/prices';
import { IP_PRICE, TERMINAL_PRICE } from '@/data/constants';

export const findBasePrice = (exportType: string, bandwidth: number): number => {
  const item = priceList.find(
    item => item.exportType === exportType && item.bandwidth === bandwidth
  );
  return item?.standardPrice ?? 0;
};

export const calculatePrice = ({
  exportType,
  bandwidth,
  discount,
  extraIPs,
  mobileTerminals
}: CalculatorInput): CalculationResult => {
  const basePrice = findBasePrice(exportType, bandwidth);
  const discountedPrice = basePrice * discount;
  const extraIPsCost = extraIPs * IP_PRICE;
  const terminalsCost = mobileTerminals * TERMINAL_PRICE;
  const totalPrice = discountedPrice + extraIPsCost + terminalsCost;

  return {
    basePrice,
    discountedPrice,
    extraIPsCost,
    terminalsCost,
    totalPrice
  };
}; 
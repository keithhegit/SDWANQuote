import { CalculatorInput, CalculationResult } from '@/types';
import { IP_PRICE, TERMINAL_PRICE } from '@/data/constants';
import { priceList } from '@/data/prices';

export function calculatePrice(input: CalculatorInput): CalculationResult {
  const basePrice = findBasePrice(input.exportType, input.bandwidth);
  const discountedPrice = basePrice * input.discount;
  const extraIPsCost = input.extraIPs * IP_PRICE;
  const terminalsCost = input.mobileTerminals * TERMINAL_PRICE;
  const totalPrice = discountedPrice + extraIPsCost + terminalsCost;

  return {
    basePrice,
    discountedPrice,
    extraIPsCost,
    terminalsCost,
    totalPrice
  };
}

function findBasePrice(exportType: string, bandwidth: number): number {
  const item = priceList.find(
    item => item.exportType === exportType && item.bandwidth === bandwidth
  );
  return item ? item.standardPrice : 0;
} 
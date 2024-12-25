export interface PriceItem {
  exportType: string;
  bandwidth: number;
  standardPrice: number;
  includedIPs: number;
}

export interface CalculatorInput {
  exportType: string;
  bandwidth: number;
  discount: number;
  extraIPs: number;
  mobileTerminals: number;
}

export interface CalculationResult {
  basePrice: number;
  discountedPrice: number;
  extraIPsCost: number;
  terminalsCost: number;
  totalPrice: number;
} 
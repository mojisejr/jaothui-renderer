export interface Certificate {
  microchip: string;
  no: number;
  isActive: boolean;
  updatedAt: Date;
  bornAt: string;
  wallet: string;
  dadId?: string;
  fGranDadId?: string;
  fGrandMomId?: string;
  mGrandDadId?: string;
  mGrandMomId?: string;
  momId?: string;
  ownerName: string;
  slipUrl: string;
  approvers: any[];
  year: number;
}

export type Suite = {
  id: number;
  number: string;
  category: SuiteCategories;
  status: SuiteStatus;
  checkOut: string;
  checkIn: string;
  alert: string;
};

export enum SuiteStatus {
  livre = "Livre",
  locado = "Locado",
  fechamento = "Fechamento",
  conferencia = "Conferência",
  sujo = "Sujo",
  limpeza = "Limpeza",
  faxina = "Faxina",
  manutencao = "Manutenção",
  bloqueado = "Bloqueado",
}

export enum SuiteCategories {
  luxo = "Luxo",
  premium = "Premium",
  master = "Master",
}

export type UpdateSuiteStatusDto = {
  id: number;
  status: SuiteStatus;
};

export type UpdateSuiteAlertDto = {
  id: number;
  alert: string;
};

import { SuiteStatus } from '../enums/suite-status.enum';

export const allowedTransitions: Record<SuiteStatus, SuiteStatus[]> = {
  [SuiteStatus.LIVRE]: [SuiteStatus.LOCADO, SuiteStatus.BLOQUEADO],

  [SuiteStatus.LOCADO]: [SuiteStatus.FECHAMENTO],

  [SuiteStatus.FECHAMENTO]: [SuiteStatus.CONFERENCIA],

  [SuiteStatus.CONFERENCIA]: [SuiteStatus.SUJO],

  [SuiteStatus.SUJO]: [SuiteStatus.LIMPEZA, SuiteStatus.FAXINA],

  [SuiteStatus.LIMPEZA]: [SuiteStatus.LIVRE],

  [SuiteStatus.FAXINA]: [SuiteStatus.LIMPEZA],

  [SuiteStatus.MANUTENCAO]: [SuiteStatus.LIVRE],

  [SuiteStatus.BLOQUEADO]: [SuiteStatus.LIVRE],
};

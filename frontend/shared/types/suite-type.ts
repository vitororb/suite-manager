import { SuiteCategories } from "../enum/suite-categories.enum";
import { SuiteStatus } from "../enum/suite-status.enum";

export type Suite = {
  id: number;
  number: string;
  category: SuiteCategories;
  status: SuiteStatus;
  lastCheckout: string;
  period: string;
  alert: string;
};

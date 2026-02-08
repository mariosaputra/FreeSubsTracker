export type Cycle = "monthly" | "annual";

export type Category = string;

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  cycle: Cycle;
  category: Category;
  profile: string;
}

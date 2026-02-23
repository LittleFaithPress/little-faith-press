export type StatWeek = {
  weekOf: string; // ISO date string (start of week)
  etsyVisits: number;
  etsyOrders: number;
  etsyRevenue: number;

  amazonRoyalties: number;
  kdpPagesRead: number;

  igFollowers: number;
  igReach: number;
  igSaves: number;

  fbFollowers: number;
  fbReach: number;
};

export const defaultWeek = (): StatWeek => ({
  weekOf: new Date().toISOString().slice(0, 10),
  etsyVisits: 0,
  etsyOrders: 0,
  etsyRevenue: 0,
  amazonRoyalties: 0,
  kdpPagesRead: 0,
  igFollowers: 0,
  igReach: 0,
  igSaves: 0,
  fbFollowers: 0,
  fbReach: 0,
});
export type IndexSummary = {
	symbol: string;
	name: string;
	description: string;
	bornDate: string;
	startValue: number;
	endValue: number;
	change: number;
	percentChange: number;
	high: number;
	low: number;
};

export type IndexHistory = {
	symbol: string;
	startTime: string;
	endTime: string;
	startValue: number;
	endValue: number;
	change: number;
	percentChange: number;
};

export type IndexChanges = Record<
	string,
	{ increase: IndexChangeInfo[]; decrease: IndexChangeInfo[] }
>;

export type IndexChangeInfo = {
	path: string;
	name: string;
	platformId: number;
	platform: string;
	platformIconUrl: string;
	iconUrl: string;
	change: number;
};

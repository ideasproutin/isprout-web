import { useQuery } from "@tanstack/react-query";
import {
	getUserTransactions,
	type GetUserTransactionsRequest,
} from "../services/userTransactionApi";
import { hasValidSession } from "../utils/authSession";

export const useUserTransactions = (refId?: string) => {
	const isLoggedIn = hasValidSession();

	// API expects either empty object {} for all transactions or { refId: "ISP2593" } for specific booking
	const payload = refId ? { refId } : {};

	return useQuery({
		queryKey: refId ? ["userTransactions", refId] : ["userTransactions"],
		queryFn: () => getUserTransactions(payload),
		enabled: isLoggedIn && !!refId, // Only fetch when logged in AND refId is provided
		staleTime: 30_000,
		retry: 1,
	});
};

/**
 * Utility functions for handling date operations
 */

/**
 * Parse a date string in "DD MMM YYYY" format (e.g., "28 Jan 2026")
 * and return a timestamp for comparison
 */
export const parseBlogDate = (dateString: string): number => {
	if (!dateString) return 0;

	try {
		// Split date string: "28 Jan 2026" -> ["28", "Jan", "2026"]
		const parts = dateString.trim().split(" ");
		if (parts.length !== 3) return 0;

		const [day, monthStr, year] = parts;

		// Month mapping
		const months: { [key: string]: number } = {
			Jan: 0,
			Feb: 1,
			Mar: 2,
			Apr: 3,
			May: 4,
			Jun: 5,
			Jul: 6,
			Aug: 7,
			Sep: 8,
			Oct: 9,
			Nov: 10,
			Dec: 11,
		};

		const normalizedMonth =
			monthStr.charAt(0).toUpperCase() +
			monthStr.slice(1, 3).toLowerCase();

		const month = months[normalizedMonth];
		if (month === undefined) {
			const fallbackTimestamp = Date.parse(dateString);
			return Number.isNaN(fallbackTimestamp) ? 0 : fallbackTimestamp;
		}

		// Create date object and return timestamp
		const date = new Date(parseInt(year), month, parseInt(day));
		return date.getTime();
	} catch (error) {
		console.error("Error parsing blog date:", dateString, error);
		return 0;
	}
};

/**
 * Sort blogs by date (most recent first)
 */
export const sortBlogsByDate = <T extends { date: string }>(
	blogs: T[],
): T[] => {
	return [...blogs].sort((a, b) => {
		const dateA = parseBlogDate(a.date);
		const dateB = parseBlogDate(b.date);
		return dateB - dateA; // Descending order (most recent first)
	});
};

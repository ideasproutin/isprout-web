import React, {
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
	Armchair,
	CalendarDays,
	Wifi,
	Projector,
	Presentation,
	AirVent,
	Tv,
	Monitor,
	Video,
	CheckCircle,
	ChevronDown,
	MapPin,
	Building2,
} from "lucide-react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMeetingRooms } from "../../hooks/useMeetingRooms";
import type { MeetingRoom } from "../../services/meetingRoomApi";
import AuthModal from "../auth/auth";
import { getUser } from "../../services/profileApi";
import {
	paymentGateway,
	type MeetingRoomPaymentData,
} from "../../services/razorpay";

interface LoggedInUserData {
	fullName?: string;
	email?: string;
	mobile?: string;
	companyName?: string;
}

const MeetingRooms: React.FC = () => {
	const queryClient = useQueryClient();
	
	// Filter function to disable weekends
	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
	};
	
	const getTodayDate = () =>
		new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
	const [selectedDate, setSelectedDate] = useState<string>(() =>
		typeof window !== "undefined" ? getTodayDate() : "",
	);
	const [selectedSeats, setSelectedSeats] = useState<string>("");
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [selectedCentre, setSelectedCentre] = useState<string>("");
	const [selectedSlots, setSelectedSlots] = useState<{
		[key: string]: string[];
	}>({});
	const [currentImageIndex, setCurrentImageIndex] = useState<{
		[key: string]: number;
	}>({});
	const [showModal, setShowModal] = useState(false);
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
	const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [pendingBookingRoomId, setPendingBookingRoomId] = useState<
		string | null
	>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		if (typeof window === "undefined") return false;
		return localStorage.getItem("isLoggedIn") === "true";
	});
	const [loggedInUser, setLoggedInUser] = useState<LoggedInUserData>(() => {
		if (typeof window === "undefined") return {};
		try {
			const rawUserData = localStorage.getItem("userData");
			if (rawUserData) {
				return JSON.parse(rawUserData) as LoggedInUserData;
			}
		} catch {
			// ignore parse errors
		}
		return {};
	});
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	// Navigation hook
	const navigate = useNavigate();

	const syncLoggedInUser = useCallback(() => {
		if (typeof window === "undefined") return;

		const loggedIn = localStorage.getItem("isLoggedIn") === "true";
		setIsLoggedIn(loggedIn);

		if (!loggedIn) {
			setLoggedInUser({});
			return;
		}

		let userData: LoggedInUserData = {};
		try {
			const rawUserData = localStorage.getItem("userData");
			if (rawUserData) {
				userData = {
					...(JSON.parse(rawUserData) as LoggedInUserData),
				};
			}
		} catch {
			userData = {};
		}

		if (!userData.fullName || !userData.email) {
			try {
				const rawAuthUser = localStorage.getItem("authUser");
				if (rawAuthUser) {
					const parsed = JSON.parse(rawAuthUser) as LoggedInUserData;
					userData = {
						...userData,
						fullName: userData.fullName || parsed.fullName,
						email: userData.email || parsed.email,
						mobile: userData.mobile || parsed.mobile,
						companyName: userData.companyName || parsed.companyName,
					};
				}
			} catch {
				// ignore parse errors and keep available values
			}
		}

		setLoggedInUser(userData);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorage = () => {
			syncLoggedInUser();
		};

		window.addEventListener("storage", handleStorage);
		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, [syncLoggedInUser]);

	// Use the meeting rooms hook
	const {
		data: apiMeetingRooms,
		isLoading: isFetchingRooms,
		isError: isFetchError,
		fetchRooms,
	} = useMeetingRooms();

	// Use API data
	const meetingRooms: MeetingRoom[] = useMemo(() => {
		return apiMeetingRooms || [];
	}, [apiMeetingRooms]);

	// Fetch meeting rooms when date changes (always fetch all rooms)
	// Guard: do not call the API until a valid date is set (avoids empty bookingDate request)
	useEffect(() => {
		if (!selectedDate) return;
		const formattedDate = selectedDate.split("-").reverse().join("-");
		// Always fetch all rooms for the selected date - filtering happens on frontend
		fetchRooms(formattedDate);
	}, [selectedDate, fetchRooms]);

	// Clear selected slots when date changes to prevent showing unavailable slots
	useEffect(() => {
		setSelectedSlots({});
	}, [selectedDate]);

	// Get unique seat capacities from all meeting rooms
	const availableSeats = useMemo(() => {
		const seatsSet = new Set<number>();
		meetingRooms.forEach((room) => {
			if (room.seating) {
				seatsSet.add(room.seating);
			}
		});
		return Array.from(seatsSet).sort((a, b) => a - b);
	}, [meetingRooms]);

	// Get unique cities and their centres
	const cityCentresMapProper = useMemo(() => {
		const map = new Map<string, Set<string>>();
		// Filter rooms by seats if selected, to show only relevant cities/centers in filter
		const roomsToMap = selectedSeats
			? meetingRooms.filter(
					(room) => room.seating === parseInt(selectedSeats, 10),
				)
			: meetingRooms;

		roomsToMap.forEach((room) => {
			const cityName = room.cityId?.city || "Unknown";
			const centreName = room.centerId?.center_name || "Unknown";

			if (!map.has(cityName)) {
				map.set(cityName, new Set());
			}
			map.get(cityName)!.add(centreName);
		});
		return map;
	}, [meetingRooms, selectedSeats]);

	// Filter meeting rooms based on selected criteria
	const filteredRooms = useMemo(() => {
		let filtered = meetingRooms;

		// Filter by seats if selected
		if (selectedSeats) {
			filtered = filtered.filter(
				(room) => room.seating === parseInt(selectedSeats, 10),
			);
		}

		// Filter by city if selected
		if (selectedCity) {
			filtered = filtered.filter((room) =>
				room.cityId?.city === selectedCity,
			);
		}

		// Filter by centre if selected
		if (selectedCentre) {
			filtered = filtered.filter((room) =>
				room.centerId?.center_name === selectedCentre,
			);
		}

		return filtered;
	}, [meetingRooms, selectedSeats, selectedCity, selectedCentre]);

	// Auto-carousel effect - auto-advance images every 5 seconds
	useEffect(() => {
		const intervals: ReturnType<typeof setInterval>[] = [];

		filteredRooms.forEach((room) => {
			if (room.images && room.images.length > 1) {
				const interval = setInterval(() => {
					setCurrentImageIndex((prev) => ({
						...prev,
						[room._id]:
							(prev[room._id] || 0) === room.images.length - 1
								? 0
								: (prev[room._id] || 0) + 1,
					}));
				}, 5000);
				intervals.push(interval);
			}
		});

		return () => {
			intervals.forEach((interval) => clearInterval(interval));
		};
	}, [filteredRooms]);

	// Initialize expanded cities only once when cities are first loaded
	// No longer needed with dropdown-based filters

	const timeToMinutes = (time: string): number => {
		const [h, m] = time.split(":").map(Number);
		return h * 60 + m;
	};

	const slotDurationMinutes = (start: string, end: string): number => {
		const startMinutes = timeToMinutes(start);
		const endMinutes = timeToMinutes(end);
		if (endMinutes >= startMinutes) return endMinutes - startMinutes;
		return endMinutes + 24 * 60 - startMinutes;
	};

	const getTotalSelectedMinutes = (
		selectedStarts: string[] = [],
		availableSlots: Array<{
			start: string;
			end: string;
			booked: boolean;
		}> = [],
	): number => {
		if (selectedStarts.length === 0) return 0;
		const slotMap = new Map(
			availableSlots.map((slot) => [slot.start, slot.end]),
		);
		return selectedStarts.reduce((total, start) => {
			const end = slotMap.get(start);
			if (!end) {
				return total + 60;
			}
			return total + slotDurationMinutes(start, end);
		}, 0);
	};

	const formatDurationLabel = (totalMinutes: number): string => {
		if (totalMinutes <= 0) return "0 Hours";
		if (totalMinutes % 60 === 0) {
			const hours = totalMinutes / 60;
			return `${hours} ${hours === 1 ? "Hour" : "Hours"}`;
		}
		const hours = totalMinutes / 60;
		return `${hours.toFixed(1)} Hours`;
	};

	const sortSlotStarts = (slots: string[]): string[] => {
		return [...new Set(slots)].sort(
			(a, b) => timeToMinutes(a) - timeToMinutes(b),
		);
	};

	// Get hourly chips for a specific room - directly from JSON data
	const getHourlyChipsForRoom = (
		room: MeetingRoom,
	): Array<{ start: string; end: string; booked: boolean }> => {
		// Get the first rate card's time slots
		if (room.rateCards && room.rateCards.length > 0) {
			const timeSlots = room.rateCards[0].timeSlots || [];
			const openingTime = timeToMinutes(room.openingTime);
			const closingTime = timeToMinutes(room.closingTime);
			// JSON already contains hour-by-hour slots, use them directly
			return timeSlots
				.filter((slot) => {
					const slotStartMinutes = timeToMinutes(slot.startTime);
					return (
						slotStartMinutes >= openingTime &&
						slotStartMinutes < closingTime
					);
				})
				.map((slot) => ({
					start: slot.startTime,
					end: slot.endTime,
					booked: slot.availability?.booked || false,
				}));
		}
		return [];
	};

	const formatDate = (dateStr: string): string => {
		const [year, month, day] = dateStr.split("-");
		return `${day}-${month}-${year}`;
	};

	const formatTime = (time: string): string => {
		const [hours, minutes] = time.split(":");
		const hour = parseInt(hours);
		const period = hour >= 12 ? "PM" : "AM";
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
		return `${displayHour}:${minutes} ${period}`;
	};

	const handlePrevImage = (roomId: string) => {
		const room = filteredRooms.find((r) => r._id === roomId);
		if (!room) return;
		setCurrentImageIndex((prev) => ({
			...prev,
			[roomId]:
				(prev[roomId] || 0) === 0
					? room.images.length - 1
					: (prev[roomId] || 0) - 1,
		}));
	};

	const handleNextImage = (roomId: string) => {
		const room = filteredRooms.find((r) => r._id === roomId);
		if (!room) return;
		setCurrentImageIndex((prev) => ({
			...prev,
			[roomId]:
				(prev[roomId] || 0) === room.images.length - 1
					? 0
					: (prev[roomId] || 0) + 1,
		}));
	};

	const handleSlotSelection = (
		roomId: string,
		slotStart: string,
		allAvailableSlots: Array<{
			start: string;
			end: string;
			booked: boolean;
		}>,
	) => {
		// Validate outside the state setter to avoid double-toast in StrictMode
		const currentSlots = selectedSlots[roomId] || [];
		const hasOtherRoomSelections = Object.keys(selectedSlots).some(
			(key) => key !== roomId && selectedSlots[key]?.length > 0,
		);
		const effectiveSlots = hasOtherRoomSelections
			? []
			: sortSlotStarts(currentSlots);
		const selectedSet = new Set(effectiveSlots);

		const slotIndex = allAvailableSlots.findIndex(
			(s) => s.start === slotStart,
		);
		if (slotIndex === -1) return;

		const clickedSlot = allAvailableSlots[slotIndex];
		const clickedDuration = slotDurationMinutes(
			clickedSlot.start,
			clickedSlot.end,
		);

		// For 60-min (or longer) slots, just toggle individually — already 1 hour
		if (clickedDuration >= 60) {
			if (selectedSet.has(clickedSlot.start)) {
				selectedSet.delete(clickedSlot.start);
			} else {
				selectedSet.add(clickedSlot.start);
			}
			setSelectedSlots({
				[roomId]: sortSlotStarts(Array.from(selectedSet)),
			});
			return;
		}

		// --- 30-min slots: enforce strict 1-hour pair selection ---

		// DESELECT: if the clicked slot is already selected, remove its entire pair
		if (selectedSet.has(clickedSlot.start)) {
			const sorted = sortSlotStarts(Array.from(selectedSet));
			const pairs: [string, string][] = [];
			const visited = new Set<string>();

			for (const s of sorted) {
				if (visited.has(s)) continue;
				const idx = allAvailableSlots.findIndex((sl) => sl.start === s);
				const next = allAvailableSlots[idx + 1];
				if (
					next &&
					selectedSet.has(next.start) &&
					!visited.has(next.start)
				) {
					pairs.push([s, next.start]);
					visited.add(s);
					visited.add(next.start);
				}
			}

			for (const [first, second] of pairs) {
				if (
					first === clickedSlot.start ||
					second === clickedSlot.start
				) {
					selectedSet.delete(first);
					selectedSet.delete(second);
					break;
				}
			}

			setSelectedSlots({
				[roomId]: sortSlotStarts(Array.from(selectedSet)),
			});
			return;
		}

		// SELECT: pair the clicked slot with the next consecutive slot
		const nextSlot = allAvailableSlots[slotIndex + 1];

		if (!nextSlot) {
			toast.error(
				"Cannot select the last slot. Need 2 consecutive slots for 1 hour minimum.",
			);
			return;
		}

		if (nextSlot.booked) {
			toast.error(
				"Next slot is unavailable. Need 2 consecutive slots for 1 hour minimum.",
			);
			return;
		}

		if (selectedSet.has(nextSlot.start)) {
			toast.error(
				"Next slot is already part of another selection. Slots must be in 1-hour pairs.",
			);
			return;
		}

		selectedSet.add(clickedSlot.start);
		selectedSet.add(nextSlot.start);

		setSelectedSlots({ [roomId]: sortSlotStarts(Array.from(selectedSet)) });
	};
	const addOneHour = (time: string): string => {
		const [h, m] = time.split(":").map(Number);
		const newHour = (h + 1) % 24;
		return `${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
	};

	const formatSelectedSlotRange = (
		slots?: string[],
		availableSlots?: Array<{ start: string; end: string; booked: boolean }>,
	): Array<{ start: string; end: string }> => {
		if (!slots || slots.length === 0) return [];

		const sortedSlots = sortSlotStarts(slots);
		const slotMap = new Map(
			(availableSlots || []).map((slot) => [slot.start, slot.end]),
		);
		const blocks: Array<{ start: string; end: string }> = [];

		let blockStart = sortedSlots[0];
		let blockEnd = slotMap.get(blockStart) || addOneHour(blockStart);

		for (let index = 1; index < sortedSlots.length; index += 1) {
			const currentStart = sortedSlots[index];
			const currentEnd =
				slotMap.get(currentStart) || addOneHour(currentStart);
			const previousEnd = blockEnd;

			if (currentStart === previousEnd) {
				blockEnd = currentEnd;
				continue;
			}

			blocks.push({ start: blockStart, end: blockEnd });
			blockStart = currentStart;
			blockEnd = currentEnd;
		}

		blocks.push({ start: blockStart, end: blockEnd });

		return blocks;
	};

	// No longer needed - using dropdowns instead of checkboxes

	const openBookingSummary = (roomId: string) => {
		setBookingRoomId(roomId);
		setShowModal(true);
	};

	const handleBooking = (roomId: string) => {
		if (!selectedSlots[roomId] || selectedSlots[roomId].length === 0) {
			toast.error("Please select at least one time slot");
			return;
		}

		if (!isLoggedIn) {
			setPendingBookingRoomId(roomId);
			setShowAuthModal(true);
			return;
		}

		openBookingSummary(roomId);
	};

	const resolveLoggedInUser =
		useCallback(async (): Promise<LoggedInUserData> => {
			let resolved: LoggedInUserData = { ...loggedInUser };

			if (typeof window !== "undefined") {
				try {
					const rawUserData = localStorage.getItem("userData");
					if (rawUserData) {
						const parsed = JSON.parse(rawUserData) as Record<
							string,
							string
						>;
						resolved = {
							...resolved,
							fullName:
								resolved.fullName ||
								parsed.fullName ||
								parsed.name,
							email: resolved.email || parsed.email,
							mobile:
								resolved.mobile ||
								parsed.mobile ||
								parsed.phoneNumber ||
								parsed.phone,
							companyName:
								resolved.companyName ||
								parsed.companyName ||
								parsed.company,
						};
					}
				} catch {
					// ignore parse errors
				}

				if (!resolved.fullName || !resolved.mobile || !resolved.email) {
					try {
						const rawAuthUser = localStorage.getItem("authUser");
						if (rawAuthUser) {
							const parsed = JSON.parse(rawAuthUser) as Record<
								string,
								string
							>;
							resolved = {
								...resolved,
								fullName:
									resolved.fullName ||
									parsed.fullName ||
									parsed.name,
								email: resolved.email || parsed.email,
								mobile:
									resolved.mobile ||
									parsed.mobile ||
									parsed.phoneNumber ||
									parsed.phone,
								companyName:
									resolved.companyName ||
									parsed.companyName ||
									parsed.company,
							};
						}
					} catch {
						// ignore parse errors
					}
				}
			}

			if (
				(!resolved.fullName || !resolved.mobile || !resolved.email) &&
				isLoggedIn
			) {
				try {
					const profileRes = await getUser();
					const profile = profileRes?.data?.item;
					if (profile) {
						resolved = {
							...resolved,
							fullName: resolved.fullName || profile.fullName,
							email: resolved.email || profile.email,
							mobile: resolved.mobile || profile.mobile,
						};

						if (typeof window !== "undefined") {
							localStorage.setItem(
								"userData",
								JSON.stringify({
									fullName: resolved.fullName,
									email: resolved.email,
									mobile: resolved.mobile,
									companyName: resolved.companyName,
								}),
							);
						}
					}
				} catch {
					// If profile API fails, fallback defaults are applied below
				}
			}

			if (!resolved.email) {
				resolved.email = "";
			}
			if (!resolved.fullName) {
				resolved.fullName = resolved.email
					? resolved.email.split("@")[0]
					: "iSprout User";
			}
			if (!resolved.mobile) {
				resolved.mobile = "9999999999";
			}

			return resolved;
		}, [isLoggedIn, loggedInUser]);

	const handlePaymentClick = async () => {
		if (isPaymentProcessing) return;
		if (!bookingRoomId) return;

		const room = filteredRooms.find((r) => r._id === bookingRoomId);
		if (!room) return;

		// Get selected slots for this room
		const selectedRoomSlots = selectedSlots[bookingRoomId] || [];
		if (selectedRoomSlots.length === 0) {
			toast.error("Please select at least one time slot");
			return;
		}

		setIsPaymentProcessing(true);

		try {
			// Resolve user data
			const resolvedUser = await resolveLoggedInUser();
			setLoggedInUser(resolvedUser);

			// Calculate total amount (including GST)
			const allSlots = getHourlyChipsForRoom(room);
			const totalMinutes = getTotalSelectedMinutes(
				selectedRoomSlots,
				allSlots,
			);
			const pricePerSlot = room.pricePerSlot || 0;
			const pricePerHour = pricePerSlot * 2;
			const totalHours = totalMinutes / 60;
			const subtotal = pricePerHour * totalHours;
			const gst = subtotal * 0.18;
			const totalAmount = subtotal + gst;

			// Format booking date as DD-MM-YYYY
			const formattedBookingDate = formatDate(selectedDate);

			// Prepare slots array with start and end times
			const slots = sortSlotStarts(selectedRoomSlots).map((startTime) => {
				const slotData = allSlots.find((s) => s.start === startTime);
				return {
					startTime,
					endTime: slotData ? slotData.end : addOneHour(startTime),
				};
			});

			if (slots.length === 0) {
				toast.error("Please select at least one time slot");
				return;
			}

			// Prepare payment data
			const paymentData: MeetingRoomPaymentData = {
				meetingRoomId: room._id,
				roomName: room.name,
				roomCode: room.code || room.name,
				centerId:
					typeof room.centerId === "object" && room.centerId?._id
						? room.centerId._id
						: typeof room.centerId === "string"
							? room.centerId
							: "",
				cityId:
					typeof room.cityId === "object" && room.cityId?._id
						? room.cityId._id
						: typeof room.cityId === "string"
							? room.cityId
							: "",
				floorId:
					typeof room.floorId === "object" && room.floorId?._id
						? room.floorId._id
						: typeof room.floorId === "string"
							? room.floorId
							: "",
				centerName: room.centerId?.center_name,
				bookingDate: formattedBookingDate,
				slots: slots,
				totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
				userName: resolvedUser.fullName || "iSprout User",
				userEmail: resolvedUser.email || "",
				userPhone: resolvedUser.mobile || "9999999999",
			};

			// Process payment
			await paymentGateway.processPayment(paymentData, {
				// @ts-ignore - Parameters required by API signature but not used
				onSuccess: (_response, _sessionData) => {
					setShowModal(false);
					setSelectedSlots({});
					setPendingBookingRoomId(null);

					// Remove cached booking data so dashboard always fetches fresh
					queryClient.removeQueries({
						queryKey: ["bookingData"],
						exact: false,
					});

					navigate("/dashboard?tab=meeting-rooms");
				},
				onError: (error) => {
					toast.error(error);
				},
				onDismiss: () => {},
			});
		} finally {
			setIsPaymentProcessing(false);
		}
	};

	const handleClearFilter = () => {
		setSelectedCity("");
		setSelectedCentre("");
		setSelectedDate(
			new Date()
				.toLocaleDateString("en-GB")
				.split("/")
				.reverse()
				.join("-"),
		);
		setSelectedSeats("");
		setSelectedSlots({});
		setIsPaymentProcessing(false);
	};

	const bookedRoom = bookingRoomId
		? filteredRooms.find((r) => r._id === bookingRoomId)
		: null;

	// Prevent background scrolling when modal is open
	// NOTE: We use overflow:hidden instead of position:fixed because
	// position:fixed + top:-Npx shifts the document, causing Google's
	// reCAPTCHA challenge popup to miscalculate its position and appear off-screen.
	useEffect(() => {
		if (showModal) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
			setIsPaymentProcessing(false);
		}

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, [showModal]);

	return (
		<>
			<div
				id='meeting-rooms'
				className='min-h-screen p-4 md:p-5 lg:p-6'
				style={{ backgroundColor: "#f8f8f8" }}
			>
				<div className='max-w-full mx-auto'>
					{/* Horizontal Filter Bar */}
					<div
						className='bg-white rounded-2xl shadow-lg p-4 md:p-5 mb-6 sticky top-4 z-10'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						{/* Mobile: Filters heading with collapse toggle */}
						<div 
							className='flex items-center justify-between mb-4 cursor-pointer lg:hidden'
							onClick={() => setIsFilterOpen(!isFilterOpen)}
						>
							<h3
								className='text-lg font-bold'
								style={{
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Filters
							</h3>
							<ChevronDown 
								size={20}
								className='transition-transform duration-200 ease-in-out'
								style={{
									color: "#00275c",
									transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
								}}
							/>
						</div>

						{/* Desktop & Mobile expanded: All filters in one row */}
						<div 
							className='lg:block overflow-hidden transition-all duration-200 ease-in-out'
							style={{
								maxHeight: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isFilterOpen ? '2000px' : '0') : 'none',
								opacity: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isFilterOpen ? '1' : '0') : '1'
							}}
						>
							<div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center'>
								{/* Filters Label (Desktop only, inline) */}
								<h3
									className='hidden lg:block text-lg font-bold whitespace-nowrap'
									style={{
										color: "#00275c",
										fontFamily: "Outfit, sans-serif",
									}}
								>
									Filters:
								</h3>
								{/* City Filter */}
								<div className='flex items-center gap-2 flex-1 min-w-[180px] w-full lg:w-auto'>
									<MapPin size={18} style={{ color: "#00275c", flexShrink: 0 }} />
									<select
										value={selectedCity}
										onChange={(e) => {
											setSelectedCity(e.target.value);
											setSelectedCentre(""); // Reset center when city changes
										}}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										<option value=''>All Cities</option>
										{Array.from(cityCentresMapProper.keys()).sort().map((city) => (
											<option key={city} value={city}>
												{city}
											</option>
										))}
									</select>
								</div>

								{/* Center Filter */}
								<div className='flex items-center gap-2 flex-1 min-w-[200px] w-full lg:w-auto'>
									<Building2 size={18} style={{ color: "#00275c", flexShrink: 0 }} />
									<select
										value={selectedCentre}
										onChange={(e) => setSelectedCentre(e.target.value)}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
										disabled={!selectedCity}
									>
										<option value=''>{selectedCity ? 'All Centers' : 'Select City First'}</option>
										{selectedCity && Array.from(cityCentresMapProper.get(selectedCity) || new Set()).sort().map((centre) => (
											<option key={centre as string} value={centre as string}>
												{centre as string}
											</option>
										))}
									</select>
								</div>

								{/* Date Filter */}
								<div className='flex items-center gap-2 flex-1 min-w-[200px] w-full lg:w-auto'>
									<CalendarDays size={18} style={{ color: "#00275c", flexShrink: 0 }} />
									<DatePicker
										selected={selectedDate ? new Date(selectedDate) : null}
										onChange={(date: Date | null) => {
											if (date) {
												setSelectedDate(date.toISOString().split('T')[0]);
											} else {
												setSelectedDate(getTodayDate());
											}
										}}
										filterDate={isWeekday}
										minDate={new Date()}
										dateFormat="dd/MM/yyyy"
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										wrapperClassName='w-full'
									/>
								</div>

								{/* Seats Filter */}
								<div className='flex items-center gap-2 flex-1 min-w-[180px] w-full lg:w-auto'>
									<Armchair size={18} style={{ color: "#00275c", flexShrink: 0 }} />
									<select
										value={selectedSeats}
										onChange={(e) =>
											setSelectedSeats(e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										<option value=''>All Seats</option>
										{availableSeats.map((seats) => (
											<option
												key={seats}
												value={seats.toString()}
											>
												{seats} Seats
											</option>
										))}
									</select>
								</div>

								{/* Clear Filter Button */}
								<div className='flex items-center w-full lg:w-auto'>
									<button
										onClick={handleClearFilter}
										className='w-full lg:w-auto px-4 py-2 rounded-lg font-semibold text-sm text-white transition-colors whitespace-nowrap'
										style={{
											backgroundColor: "#003d82",
											fontFamily: "Outfit, sans-serif",
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#002a5e")
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#003d82")
										}
									>
										Clear filter
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Meeting Rooms Section */}
							{/* Loading State */}
							{isFetchingRooms && (
								<div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
									<p
										className='text-lg text-gray-500'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Loading meeting rooms...
									</p>
								</div>
							)}

							{/* Error State */}
							{isFetchError && (
								<div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
									<p
										className='text-lg text-red-500'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Failed to load meeting rooms. Please try
										again.
									</p>
								</div>
							)}

							{/* Meeting Rooms Grid */}
							<div className='space-y-6'>
								{filteredRooms.map((room) => {
									const imageIndex =
										currentImageIndex[room._id] || 0;
									const currentImage =
										room.images?.[imageIndex];

									return (
										<div
											key={room._id}
											className='bg-white rounded-2xl overflow-hidden shadow-lg p-4 md:p-6 relative'
										>
											<div className='grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-6'>
												{/* Left Section - Image Only */}
												<div className='w-full'>
													{/* Image Carousel */}
													<div className='relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-200 rounded-xl group'>
														{currentImage && (
															<img
																src={currentImage}
																alt={room.name}
																className='w-full h-full object-cover'
															/>
														)}

														{/* Left Arrow */}
														{room.images?.length > 1 && (
															<button
																onClick={() =>
																	handlePrevImage(
																		room._id,
																	)
																}
																className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-xl w-8 h-8 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'
															>
																&lt;
															</button>
														)}

														{/* Right Arrow */}
														{room.images?.length > 1 && (
															<button
																onClick={() =>
																	handleNextImage(
																		room._id,
																	)
																}
																className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-xl w-8 h-8 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'
															>
																&gt;
															</button>
														)}
													</div>
												</div>

												{/* Right Section - All Content Stacked */}
												<div className='flex flex-col justify-between h-full'>
													{/* Room Details at Top */}
													<div className='mb-4'>
													{/* Room Name and Price Row */}
													<div className='flex justify-between items-start mb-2 gap-4'>
														<h3
															className='text-xl lg:text-2xl font-bold'
															style={{
																color: "#00275c",
																fontFamily:
																	"Outfit, sans-serif",
															}}
														>
															{room.name}
														</h3>
														<div
															style={{
																color: "#00275c",
																fontFamily:
																	"Outfit, sans-serif",
																display:
																	"flex",
																flexDirection:
																	"column",
																alignItems:
																	"flex-end",
															}}
														>
															{(() => {
																const slots =
																	selectedSlots[
																		room
																			._id
																	] ||
																	[];
																const pricePerHour =
																	(room.pricePerSlot ||
																		0) *
																	2;
																if (
																	slots.length ===
																	0
																) {
																	return (
																		<span className='text-xl font-bold'>
																			₹
																			{
																				pricePerHour
																			}
																			/hr
																		</span>
																	);
																}
																const chips =
																	getHourlyChipsForRoom(
																		room,
																	);
																const mins =
																	getTotalSelectedMinutes(
																		slots,
																		chips,
																	);
																const totalHours =
																	mins /
																	60;
																const subtotal =
																	pricePerHour *
																	totalHours;
																const total =
																	subtotal *
																	1.18;
																return (
																	<>
																		<span className='text-xl font-bold'>
																			₹
																			{total.toFixed(
																				0,
																			)}
																		</span>
																		<span
																			style={{
																				fontSize:
																					"13px",
																				fontWeight: 400,
																				color: "#64748b",
																			}}
																		>
																			+18%
																			GST
																			incl.
																		</span>
																	</>
																);
															})()}
														</div>
													</div>
														<div className='flex items-center gap-3 mb-3 flex-wrap'>
															<span
																className='text-sm'
																style={{
																	color: "#666",
																	fontFamily:
																		"Outfit, sans-serif",
																}}
															>
																{room.code}
															</span>
															<span style={{ color: "#e0e0e0" }}>|</span>
															<div className='flex items-center gap-2'>
																<Armchair
																	size={18}
																	style={{
																		color: "#666",
																	}}
																/>
																<span
																	className='text-sm'
																	style={{
																		color: "#666",
																		fontFamily:
																			"Outfit, sans-serif",
																	}}
																>
																	{room.seating} seats
																</span>
															</div>
															{room.amenities && room.amenities.length > 0 && (
																<>
																	<span style={{ color: "#e0e0e0" }}>|</span>
																	<div className='flex items-center gap-2 flex-wrap'>
																		{(() => {
																			return room.amenities.map(
																				(
																					amenity,
																					index,
																				) => {
																					const getAmenityIcon =
																						(
																							amenityName: string,
																						) => {
																							const name =
																								amenityName
																									.toLowerCase()
																									.trim();

																							if (
																								name.includes(
																									"wifi",
																								) ||
																								name.includes(
																									"wi-fi",
																								) ||
																								name.includes(
																									"internet",
																								)
																							)
																								return (
																									<Wifi
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"projector",
																								)
																							)
																								return (
																									<Projector
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"whiteboard",
																								) ||
																								name.includes(
																									"white board",
																								) ||
																								name.includes(
																									"presentation",
																								) ||
																								name.includes(
																									"board",
																								) ||
																								name.includes(
																									"flip chart",
																								) ||
																								name.includes(
																									"flipchart",
																								)
																							)
																								return (
																									<Presentation
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"ac",
																								) ||
																								name.includes(
																									"air conditioning",
																								) ||
																								name.includes(
																									"aircondition",
																								) ||
																								name.includes(
																									"aircon",
																								)
																							)
																								return (
																									<AirVent
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"tv",
																								) ||
																								name.includes(
																									"television",
																								) ||
																								name.includes(
																									"t.v",
																								) ||
																								name.includes(
																									"smart tv",
																								)
																							)
																								return (
																									<Tv
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"monitor",
																								) ||
																								name.includes(
																									"display",
																								) ||
																								name.includes(
																									"screen",
																								) ||
																								name.includes(
																									"lcd",
																								) ||
																								name.includes(
																									"led",
																								)
																							)
																								return (
																									<Monitor
																										size={
																											18
																										}
																									/>
																								);
																							if (
																								name.includes(
																									"video",
																								) ||
																								name.includes(
																									"conferencing",
																								) ||
																								name.includes(
																									"conference",
																								)
																							)
																								return (
																									<Video
																										size={
																											18
																										}
																									/>
																								);
																							return (
																								<CheckCircle
																									size={
																										18
																									}
																								/>
																							);
																						};

																					let amenityStr =
																						"";
																					if (
																						typeof amenity ===
																						"string"
																					) {
																						amenityStr =
																							amenity;
																					} else if (
																						typeof amenity ===
																							"object" &&
																						amenity !==
																							null
																					) {
																						const amenityObj =
																							amenity as {
																								name?: string;
																								type?: string;
																								amenity?: string;
																								amenityName?: string;
																								title?: string;
																								label?: string;
																							};
																						amenityStr =
																							amenityObj.name ||
																							amenityObj.type ||
																							amenityObj.amenity ||
																							amenityObj.amenityName ||
																							amenityObj.title ||
																							amenityObj.label ||
																							"";
																					}

																					if (
																						!amenityStr
																					)
																						return null;

																					const icon =
																						getAmenityIcon(
																							amenityStr,
																						);

																					return (
																						<div
																							key={`${room._id}-${amenityStr}-${index}`}
																							className='flex items-center justify-center w-8 h-8 rounded-lg'
																							style={{
																								backgroundColor:
																									"#f0f0f0",
																								color: "#666",
																							}}
																							title={
																								amenityStr
																									.charAt(
																										0,
																									)
																									.toUpperCase() +
																								amenityStr.slice(
																									1,
																								)
																							}
																						>
																							{
																								icon
																							}
																						</div>
																					);
																				},
																			);
																		})()}
																	</div>
																</>
															)}
														</div>
													</div>

													{/* Time Slots Section */}
													<div className='mt-1 pt-2 border-t border-gray-200 flex-1'>
														{/* Date Badge */}
														<div className='mb-3 flex justify-between items-start'>
														<h4
															className='font-semibold'
															style={{
																color: "#00275c",
																fontFamily:
																	"Outfit, sans-serif",
															}}
														>
															Select Slot
														</h4>
														<div className='relative inline-block'>
															{/* Clickable date badge that triggers the hidden input */}
															<div
																className='px-3 py-1 rounded-lg font-bold text-xs cursor-pointer'
																onClick={() => {
																	const input = document.getElementById(
																		`room-date-${room._id}`,
																	) as HTMLInputElement;
																	if (input && typeof input.showPicker === 'function') {
																		try {
																			input.showPicker();
																		} catch {
																			// Fallback: focus the input if showPicker fails
																			input.focus();
																			input.click();
																		}
																	}
																}}
																style={{
																	backgroundColor:
																		"#FFDE00",
																	color: "#00275c",
																	fontFamily:
																		"Outfit, sans-serif",
																}}
															>
																{formatDate(
																	selectedDate,
																)}
															</div>
															{/* Hidden DatePicker positioned at badge location so picker opens here */}
															<DatePicker
																selected={selectedDate ? new Date(selectedDate) : null}
																onChange={(date: Date | null) => {
																	if (date) {
																		setSelectedDate(date.toISOString().split('T')[0]);
																	} else {
																		setSelectedDate(getTodayDate());
																	}
																}}
																filterDate={isWeekday}
																minDate={new Date()}
																dateFormat="dd/MM/yyyy"
																id={`room-date-${room._id}`}
																className='absolute inset-0 w-full h-full opacity-0 pointer-events-none'
																wrapperClassName='absolute inset-0'
																calendarClassName='datepicker-hidden'
																tabIndex={-1}
															/>
														</div>
													</div>

													{/* Time Slots Grid */}
													<div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2'>
														{(() => {
															const hourlyChips =
																getHourlyChipsForRoom(
																	room,
																);

															// Get current date and time
															const now =
																new Date();
															const currentDateStr =
																new Date()
																	.toLocaleDateString(
																		"en-GB",
																	)
																	.split("/")
																	.reverse()
																	.join("-");
															const currentHour =
																now.getHours();
															const currentMinutes =
																now.getMinutes();
															const currentTotalMinutes =
																currentHour *
																	60 +
																currentMinutes;

															// Check if selected date is today
															const isToday =
																selectedDate ===
																currentDateStr;

															return hourlyChips &&
																hourlyChips.length >
																	0 ? (
																hourlyChips.map(
																	(chip) => {
																		const isSelected =
																			selectedSlots[
																				room
																					._id
																			]?.includes(
																				chip.start,
																			) ||
																			false;

																		// Check if slot time has already passed (if today)
																		const [
																			slotHour,
																			slotMin,
																		] =
																			chip.start
																				.split(
																					":",
																				)
																				.map(
																					Number,
																				);
																		const slotTotalMinutes =
																			slotHour *
																				60 +
																			slotMin;
																		const isTimePassed =
																			isToday &&
																			slotTotalMinutes <
																				currentTotalMinutes;

																		const isBooked =
																			chip.booked ||
																			isTimePassed;

																		return (
																			<button
																				key={`${room._id}-${chip.start}`}
																				onClick={() =>
																					handleSlotSelection(
																						room._id,
																						chip.start,
																						hourlyChips,
																					)
																				}
																				disabled={
																					isBooked
																				}
																				className={`px-1.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap inline-flex items-center justify-center min-w-fit${
																					isSelected
																						? " bg-yellow-400 text-blue-900"
																						: isBooked
																							? " border-2 border-dashed border-gray-300 bg-white text-gray-400 cursor-not-allowed hover:bg-white"
																							: " bg-gray-100 text-gray-700 hover:bg-gray-200"
																				}`}
																				style={
																					isSelected
																						? {
																								backgroundColor:
																									"#FFDE00",
																								color: "#00275c",
																								fontFamily:
																									"Outfit, sans-serif",
																								border: "transparent",
																							}
																						: isBooked
																							? {
																									fontFamily:
																										"Outfit, sans-serif",
																									backgroundColor:
																										"#ffffff",
																									color: "#9ca3af",
																								}
																							: {
																									fontFamily:
																										"Outfit, sans-serif",
																								}
																				}
																				title={`${formatTime(chip.start)} - ${formatTime(chip.end)}`}
																			>
																				{formatTime(
																					chip.start,
																				)}
																			</button>
																		);
																	},
																)
															) : (
																<p className='text-gray-500'>
																	No slots
																	available
																</p>
															);
														})()}
													</div>

													</div>

													{/* Book Now Button */}
													<div className='flex justify-center mt-4'>
														<button
															onClick={() =>
																handleBooking(
																	room._id,
																)
															}
															disabled={
																isPaymentProcessing
															}
															className='px-10 py-3 rounded-full font-bold text-base transition-colors'
															style={{
																backgroundColor:
																	isPaymentProcessing
																		? "#f3d94a"
																		: "#FFDE00",
																color: "#00275c",
																fontFamily:
																	"Outfit, sans-serif",
																opacity:
																	isPaymentProcessing
																		? 0.6
																		: 1,
																cursor: isPaymentProcessing
																	? "not-allowed"
																	: "pointer",
															}}
															onMouseEnter={(e) =>
																!isPaymentProcessing &&
																(e.currentTarget.style.backgroundColor =
																	"#e6c900")
															}
															onMouseLeave={(e) =>
																!isPaymentProcessing &&
																(e.currentTarget.style.backgroundColor =
																	"#FFDE00")
															}
														>
															{isPaymentProcessing
																? "Processing…"
																: "Book Now"}
														</button>
													</div>
												</div>
											</div>
										</div>
									);
								})}

								{filteredRooms.length === 0 && (
									<div className='text-center py-12'>
										<p
											className='text-lg text-gray-500 mb-2'
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
										>
											{selectedSeats
												? `No ${selectedSeats} seates available`
												: "No meeting rooms available"}
										</p>
										{selectedSeats && (
											<p
												className='text-sm text-gray-400'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												Please select a different seat
												capacity
											</p>
										)}
									</div>
								)}
							</div>
				</div>
			</div>

			{/* Booking Modal */}
			{showModal && (
				<div
					className='fixed inset-0 bg-black/50 flex items-center justify-center overflow-hidden'
					style={{ zIndex: 99999 }}
					onClick={() => setShowModal(false)}
				>
					<div
						className='bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 md:p-8'
						style={{ fontFamily: "Outfit, sans-serif" }}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className='rounded-2xl border p-4 mb-4'
							style={{ borderColor: "#d9e0ea" }}
						>
							<h2
								className='text-2xl font-bold mb-4'
								style={{
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
									textAlign: "center",
								}}
							>
								Booking Summary
							</h2>

							<h3
								className='text-lg md:text-xl font-bold mb-5'
								style={{
									color: "#111827",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								{bookedRoom?.code ||
									bookedRoom?.name ||
									"Meeting Room Booking"}
							</h3>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div
									className='flex items-start gap-3 text-lg sm:col-span-2'
									style={{ color: "#111827" }}
								>
									<i
										className='bx bx-time-five'
										style={{
											fontSize: "26px",
											color: "#4b5563",
										}}
									></i>
									<div className='flex flex-nowrap gap-2 overflow-x-auto pb-1 max-w-full'>
										{formatSelectedSlotRange(
											selectedSlots[bookingRoomId || ""],
											bookedRoom
												? getHourlyChipsForRoom(
														bookedRoom,
													)
												: undefined,
										).map((block) => (
											<span
												key={`${block.start}-${block.end}`}
												className='inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium whitespace-nowrap'
												style={{
													borderColor: "#d9e0ea",
													backgroundColor: "#f8fafc",
													color: "#111827",
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												{formatTime(block.start)} -{" "}
												{formatTime(block.end)}
											</span>
										))}
									</div>
								</div>
								<div
									className='flex items-center gap-3 text-lg'
									style={{ color: "#111827" }}
								>
									<i
										className='bx bx-calendar'
										style={{
											fontSize: "26px",
											color: "#4b5563",
										}}
									></i>
									<span>{formatDate(selectedDate)}</span>
								</div>
								<div
									className='flex items-center gap-3 text-lg'
									style={{ color: "#111827" }}
								>
									<i
										className='bx bx-group'
										style={{
											fontSize: "26px",
											color: "#4b5563",
										}}
									></i>
									<span>
										{bookedRoom?.seating || 0} Seats
									</span>
								</div>
								<div
									className='flex items-center gap-3 text-lg'
									style={{ color: "#111827" }}
								>
									<i
										className='bx bx-map'
										style={{
											fontSize: "26px",
											color: "#4b5563",
										}}
									></i>
									<span>
										{bookedRoom?.centerId?.center_name ||
											"Center"}
									</span>
								</div>
								<div
									className='flex items-center gap-3 text-lg'
									style={{ color: "#111827" }}
								>
									<i
										className='bx bx-rupee'
										style={{
											fontSize: "26px",
											color: "#4b5563",
										}}
									></i>
									<span>
										{(() => {
											const slots =
												selectedSlots[
													bookingRoomId || ""
												] || [];
											const chips = bookedRoom
												? getHourlyChipsForRoom(
														bookedRoom,
													)
												: [];
											const mins =
												getTotalSelectedMinutes(
													slots,
													chips,
												);
											const pricePerHour =
												(bookedRoom?.pricePerSlot ||
													0) * 2;
											const totalHours = mins / 60;
											const subtotal =
												pricePerHour * totalHours;
											const total = subtotal * 1.18;
											return slots.length > 0
												? `₹${total.toFixed(0)} total (incl. GST)`
												: `₹${pricePerHour}/hr`;
										})()}
									</span>
								</div>
							</div>
						</div>

						{/* Amenities */}
						{bookedRoom?.amenities &&
							bookedRoom.amenities.length > 0 && (
								<div
									style={{
										display: "flex",
										flexWrap: "nowrap",
										gap: "8px",
										marginTop: "8px",
										overflowX: "auto",
										paddingBottom: "2px",
									}}
								>
									{bookedRoom.amenities.map(
										(amenity: unknown, index: number) => {
											let amenityName = "";
											let amenityImage = "";
											if (typeof amenity === "string") {
												amenityName = amenity;
											} else if (
												typeof amenity === "object" &&
												amenity !== null
											) {
												const a = amenity as {
													name?: string;
													image?: string;
													type?: string;
													amenityName?: string;
													title?: string;
												};
												amenityName =
													a.name ||
													a.type ||
													a.amenityName ||
													a.title ||
													"";
												amenityImage = a.image || "";
											}
											if (!amenityName) return null;
											const label =
												amenityName
													.charAt(0)
													.toUpperCase() +
												amenityName.slice(1);
											return (
												<div
													key={`modal-amenity-outer-${index}`}
													style={{
														display: "flex",
														alignItems: "center",
														gap: "6px",
														padding: "5px 10px",
														background: "#f3f4f6",
														borderRadius: "8px",
														fontFamily:
															"Outfit, sans-serif",
													}}
												>
													{amenityImage ? (
														<img
															src={amenityImage}
															alt={label}
															style={{
																width: "18px",
																height: "18px",
																objectFit:
																	"contain",
															}}
														/>
													) : (
														<i
															className='bx bx-check-circle'
															style={{
																fontSize:
																	"16px",
																color: "#00275c",
															}}
														/>
													)}
													<span
														style={{
															fontSize: "13px",
															color: "#374151",
															fontWeight: 500,
														}}
													>
														{label}
													</span>
												</div>
											);
										},
									)}
								</div>
							)}

						{/* Payment Summary */}
						<div
							className='rounded-xl border p-5 mb-5'
							style={{
								borderColor: "#d9e0ea",
								backgroundColor: "#f9fafb",
							}}
						>
							<h3
								className='text-lg font-bold mb-4'
								style={{
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Payment Summary
							</h3>
							<div className='space-y-3'>
								{(() => {
									const selectedRoomSlots =
										selectedSlots[bookingRoomId || ""] ||
										[];
									const availableSlots = bookedRoom
										? getHourlyChipsForRoom(bookedRoom)
										: [];
									const totalMinutes =
										getTotalSelectedMinutes(
											selectedRoomSlots,
											availableSlots,
										);
									const pricePerSlot =
										bookedRoom?.pricePerSlot || 0;
									const pricePerHour = pricePerSlot * 2;
									const totalHours = totalMinutes / 60;
									const subtotal = pricePerHour * totalHours;
									const gst = subtotal * 0.18;
									const total = subtotal + gst;

									return (
										<>
											<div
												className='flex justify-between text-base'
												style={{ color: "#374151" }}
											>
												<span>Total Duration:</span>
												<span className='font-semibold'>
													{formatDurationLabel(
														totalMinutes,
													)}
												</span>
											</div>
											<div
												className='flex justify-between text-base'
												style={{ color: "#374151" }}
											>
												<span>
													{totalHours}{" "}
													{totalHours === 1
														? "Hour"
														: "Hours"}{" "}
													× ₹{pricePerHour}/hr:
												</span>
												<span className='font-semibold'>
													₹{subtotal.toFixed(2)}
												</span>
											</div>
											<div
												className='flex justify-between text-base'
												style={{ color: "#374151" }}
											>
												<span>GST (18%):</span>
												<span className='font-semibold'>
													₹{gst.toFixed(2)}
												</span>
											</div>
											<div
												className='flex justify-between text-lg font-bold pt-3 mt-3'
												style={{
													borderTop:
														"2px solid #d9e0ea",
													color: "#00275c",
												}}
											>
												<span>Total Price:</span>
												<span>₹{total.toFixed(2)}</span>
											</div>
										</>
									);
								})()}
							</div>
						</div>

						<div className='flex gap-3'>
							<button
								onClick={() => setShowModal(false)}
								className='flex-1 px-4 py-2 rounded-lg font-semibold text-sm border-2 transition-colors'
								style={{
									borderColor: "#00275c",
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Cancel
							</button>
							<button
								onClick={handlePaymentClick}
								disabled={isPaymentProcessing}
								className='flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-colors'
								style={{
									backgroundColor: isPaymentProcessing
										? "#f3d94a"
										: "#FFDE00",
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
									opacity: isPaymentProcessing ? 0.8 : 1,
									cursor: isPaymentProcessing
										? "not-allowed"
										: "pointer",
								}}
							>
								{isPaymentProcessing
									? "Processing..."
									: "Pay Now"}
							</button>
						</div>
					</div>
				</div>
			)}

			<AuthModal
				isOpen={showAuthModal}
				onClose={() => setShowAuthModal(false)}
				redirectToDashboard={false}
				onLoginSuccess={() => {
					syncLoggedInUser();
					setShowAuthModal(false);
					if (pendingBookingRoomId) {
						openBookingSummary(pendingBookingRoomId);
						setPendingBookingRoomId(null);
					}
				}}
			/>
		</>
	);
};

export default MeetingRooms;

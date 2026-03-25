import React, {
	useState,
	useMemo,
	useEffect,
	useRef,
	useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Armchair,
	CalendarDays,
	Filter,
	Wifi,
	Projector,
	Presentation,
	AirVent,
	Tv,
	Monitor,
	Video,
	CheckCircle,
	Info,
} from "lucide-react";
import { MdPerson, MdEmail, MdPhone, MdBusiness } from "react-icons/md";
import toast from "react-hot-toast";
import { useMeetingRooms } from "../../hooks/useMeetingRooms";
import type { MeetingRoom } from "../../services/meetingRoomApi";
import V2Recaptcha, {
	type V2RecaptchaHandle,
} from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useCityCenters } from "../../hooks/useCityCentre";
import {
	fetchWebsiteForms,
	getWebsiteFormConfig,
	type WebsiteFormConfig,
	type WebsiteFormField,
} from "../../services/formServiceApi";

interface BookingForm {
	fullname: string;
	email: string;
	company: string;
	phone: string;
}

const normalizeFieldToken = (value: string | undefined) =>
	(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const getMeetingFieldRole = (
	field: WebsiteFormField,
): "fullname" | "phone" | "email" | "company" | "unknown" => {
	const icon = normalizeFieldToken(field.icon);
	const id = normalizeFieldToken(field.id);
	const name = normalizeFieldToken(field.name);
	const label = normalizeFieldToken(field.label);
	const merged = `${icon} ${id} ${name} ${label}`;
	const tokens = [icon, id, name, label].filter(Boolean);

	if (
		merged.includes("mdperson") ||
		name === "fullname" ||
		id === "fullname" ||
		tokens.includes("name")
	) return "fullname";
	if (merged.includes("mdphone") || merged.includes("mobile") || merged.includes("phonenumber")) return "phone";
	if (merged.includes("mdemail") || merged.includes("email")) return "email";
	if (merged.includes("mdbusiness") || merged.includes("company")) return "company";
	return "unknown";
};

interface CenterData {
	code?: string;
	shortAddress?: string;
	center_name?: string;
	[key: string]: unknown;
}

interface CityData {
	city?: string;
	centers?: CenterData[];
	[key: string]: unknown;
}

const MeetingRooms: React.FC = () => {
	const getTodayDate = () =>
		new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
	const [selectedDate, setSelectedDate] = useState<string>(() => getTodayDate());
	const [selectedSeats, setSelectedSeats] = useState<string>("");
	const [selectedCentres, setSelectedCentres] = useState<Set<string>>(
		new Set(),
	);
	const [expandedCities, setExpandedCities] = useState<Set<string>>(
		new Set(),
	);
	const hasInitializedCities = useRef(false);
	const [selectedSlots, setSelectedSlots] = useState<{
		[key: string]: string[];
	}>({});
	const [currentImageIndex, setCurrentImageIndex] = useState<{
		[key: string]: number;
	}>({});
	const [showModal, setShowModal] = useState(false);
	const dateInputRef = useRef<HTMLInputElement>(null);
	const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
	const [confirmationMessage, setConfirmationMessage] = useState(false);
	const [bookingForm, setBookingForm] = useState<BookingForm>({
		fullname: "",
		email: "",
		company: "",
		phone: "",
	});
	const [phoneError, setPhoneError] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [fullnameError, setFullnameError] = useState<string>("");
	const [meetingFormConfigs, setMeetingFormConfigs] = useState<WebsiteFormConfig[]>([]);
	const [meetingFormLoading, setMeetingFormLoading] = useState(true);
	const [dynamicFieldValues, setDynamicFieldValues] = useState<Record<string, string>>({});
	// Navigation hook
	const navigate = useNavigate();
	const location = useLocation();

	// reCAPTCHA state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const captchaRef = useRef<V2RecaptchaHandle>(null);
	const captchaWrapperRef = useRef<HTMLDivElement>(null);
	const modalScrollRef = useRef<HTMLDivElement>(null);

	const { data: cityCentersData } = useCityCenters();
	const meetingRoomFormConfig = getWebsiteFormConfig(meetingFormConfigs, "meeting_room");
	const meetingRoomFields = meetingRoomFormConfig?.fields || [];

	useEffect(() => {
		let isMounted = true;
		fetchWebsiteForms("meeting_room")
			.then((forms) => {
				if (!isMounted) return;
				setMeetingFormConfigs(forms);
			})
			.finally(() => {
				if (isMounted) setMeetingFormLoading(false);
			});
		return () => {
			isMounted = false;
		};
	}, []);

	// Form submission hook
	const { submit: submitFormData, isSubmitting } = useFormSubmit({
		successMessage: meetingRoomFormConfig?.successMessage || "",
		onSuccess: () => {
			setShowModal(false);
			setBookingForm({
				fullname: "",
				email: "",
				company: "",
				phone: "",
			});
			setDynamicFieldValues({});
			setCaptchaToken("");
			setIsCaptchaVerified(false);
			// Navigate to thank you page
			const path = location.pathname.replace(/\/$/, '');
			navigate(`${path}/thankyou`);
		},
	});

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

	// Create a map of center code to shortAddress from cityCentersData
	const centerCodeToShortAddress = useMemo(() => {
		const map = new Map<string, string>();
		if (cityCentersData) {
			cityCentersData.forEach((city: CityData) => {
				city.centers?.forEach((center: CenterData) => {
					if (center.code && center.shortAddress) {
						map.set(center.code, center.shortAddress);
					}
				});
			});
		}
		return map;
	}, [cityCentersData]);

	// Create a map of centre names to their addresses from meeting rooms data
	// Prefer shortAddress from cityCentersData by matching center code
	const centreAddressMap = useMemo(() => {
		const map = new Map<string, string>();

		// Extract addresses directly from meeting room objects
		meetingRooms.forEach((room) => {
			if (room.centerId?.center_name) {
				// Only set if not already present (first room's address for each center)
				if (!map.has(room.centerId.center_name)) {
					// First try to get shortAddress from cityCentersData using center code
					const centerCode = room.centerId?.code;
					const shortAddress = centerCode
						? centerCodeToShortAddress.get(centerCode)
						: undefined;

					// Use shortAddress if available, otherwise fall back to room.address
					const addressToUse =
						shortAddress || room.address || "Address not available";
					map.set(room.centerId.center_name, addressToUse);
				}
			}
		});

		return map;
	}, [meetingRooms, centerCodeToShortAddress]);

	// Filter meeting rooms based on selected criteria
	const filteredRooms = useMemo(() => {
		let filtered = meetingRooms;

		// Filter by seats if selected
		if (selectedSeats) {
			filtered = filtered.filter(
				(room) => room.seating === parseInt(selectedSeats, 10),
			);
		}

		// Filter by centres if any are selected
		if (selectedCentres.size > 0) {
			filtered = filtered.filter((room) =>
				selectedCentres.has(room.centerId?.center_name || ""),
			);
		}

		return filtered;
	}, [meetingRooms, selectedSeats, selectedCentres]);

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
	useEffect(() => {
		if (!hasInitializedCities.current && cityCentresMapProper.size > 0) {
			hasInitializedCities.current = true;
			queueMicrotask(() => {
				setExpandedCities(
					new Set(Array.from(cityCentresMapProper.keys())),
				);
			});
		}
	}, [cityCentresMapProper]);

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

	const handleCentreCheckChange = (centre: string) => {
		const newCentres = new Set(selectedCentres);
		if (newCentres.has(centre)) {
			newCentres.delete(centre);
		} else {
			newCentres.add(centre);
		}
		setSelectedCentres(newCentres);
	};

	const handleCityCheckChange = (city: string) => {
		const newCentres = new Set(selectedCentres);
		const centresInCity = cityCentresMapProper.get(city) || new Set();

		// Check if all centres in this city are already selected
		const allSelected = Array.from(centresInCity).every((centre) =>
			newCentres.has(centre),
		);

		if (allSelected) {
			// Deselect all centres in this city
			centresInCity.forEach((centre) => newCentres.delete(centre));
		} else {
			// Select all centres in this city
			centresInCity.forEach((centre) => newCentres.add(centre));
		}

		setSelectedCentres(newCentres);
	};

	const toggleCityExpansion = (city: string) => {
		const newExpanded = new Set(expandedCities);
		if (newExpanded.has(city)) {
			newExpanded.delete(city);
		} else {
			newExpanded.add(city);
		}
		setExpandedCities(newExpanded);
	};

	const handleBooking = (roomId: string) => {
		if (!selectedSlots[roomId] || selectedSlots[roomId].length === 0) {
			toast.error("Please select at least one time slot");
			return;
		}
		setBookingRoomId(roomId);
		setShowModal(true);
		setConfirmationMessage(false);
		setBookingForm({
			fullname: "",
			email: "",
			company: "",
			phone: "",
		});
		setDynamicFieldValues({});
		setPhoneError("");
		setEmailError("");
		setFullnameError("");
		// Reset reCAPTCHA
		setCaptchaToken("");
		setIsCaptchaVerified(false);
		captchaRef.current?.reset();
	};

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		// Filter and validate based on field name
		let filteredValue = value;

		if (name === "fullname") {
			// Only allow letters and spaces, max 50 characters
			// Remove leading whitespace and replace multiple spaces with single space
			filteredValue = value
				.replace(/[^a-zA-Z\s]/g, "")
				.trimStart()
				.replace(/\s+/g, " ")
				.slice(0, 50);
		} else if (name === "phone") {
			// Only allow digits, max 10 characters
			filteredValue = value.replace(/\D/g, "").slice(0, 10);
		} else if (name === "email") {
			// Prevent leading spaces when field is empty
			if (value.startsWith(' ') && bookingForm.email === '') {
				return;
			}
			// Remove all whitespace completely - no spaces allowed anywhere
			filteredValue = value.replace(/\s/g, "");

			// Limit length based on @ position
			if (filteredValue) {
				const atIndex = filteredValue.indexOf("@");
				if (atIndex > -1) {
					// If @ exists, limit local part to 30 characters
					const localPart = filteredValue.slice(0, atIndex);
					const domainPart = filteredValue.slice(atIndex);
					filteredValue = localPart.slice(0, 30) + domainPart;
				} else {
					// If no @ yet, limit to 30 characters total
					filteredValue = filteredValue.slice(0, 30);
				}
			}
		} else if (name === "company") {
			// Prevent leading spaces when field is empty
			if (value.startsWith(' ') && bookingForm.company === '') {
				return;
			}
			// Allow free text for company but collapse multiple spaces and limit length
			filteredValue = value.replace(/\s+/g, ' ').trimStart().slice(0, 100);
		}
		
		if (name === "fullname" || name === "phone" || name === "email" || name === "company") {
			setBookingForm((prev) => ({
				...prev,
				[name]: filteredValue,
			}));
		} else {
			setDynamicFieldValues((prev) => ({
				...prev,
				[name]: filteredValue,
			}));
		}

		// Validate fullname in real-time
		if (name === "fullname") {
			if (filteredValue && filteredValue.trim().length === 0) {
				setFullnameError("Name cannot be only whitespace");
			} else {
				setFullnameError("");
			}
		}

		// Validate phone number in real-time
		if (name === "phone") {
			if (filteredValue && filteredValue.startsWith("0")) {
				setPhoneError("Phone number should not start with 0");
			} else if (filteredValue && filteredValue.length > 0 && filteredValue.length < 10) {
				setPhoneError("Phone number should be at least 10 digits");
			} else {
				setPhoneError("");
			}
		}

		// Validate email in real-time
		if (name === "email") {
			if (filteredValue && filteredValue.length > 0) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(filteredValue)) {
					setEmailError("Please enter a valid email address");
				} else {
					setEmailError("");
				}
			} else {
				setEmailError("");
			}
		}
	};

	// Called when captcha verification status changes
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	const handleFormSubmit = async () => {
		const requiredFields = meetingRoomFields.filter((field) => field.required);
		for (const field of requiredFields) {
			const role = getMeetingFieldRole(field);
			const key = normalizeFieldToken(field.id || field.name);
			const value =
				role === "fullname"
					? bookingForm.fullname
					: role === "phone"
						? bookingForm.phone
						: role === "email"
							? bookingForm.email
							: role === "company"
								? bookingForm.company
								: dynamicFieldValues[key] || "";
			if (!value || !String(value).trim()) {
				toast.error("Please fill in all required fields");
				return;
			}
		}

		if (bookingForm.fullname && bookingForm.fullname.trim().length === 0) {
			toast.error("Name cannot be only whitespace");
			return;
		}
		if (bookingForm.phone) {
			if (bookingForm.phone.startsWith("0")) {
				toast.error("Phone number should not start with 0");
				return;
			}
			if (bookingForm.phone.length < 10) {
				toast.error("Please enter a valid phone number (minimum 10 digits)");
				return;
			}
		}
		if (!isCaptchaVerified || !captchaToken) {
			toast.error("Please verify that you are not a robot");
			return;
		}

		if (!bookingRoomId) return;

		const room = filteredRooms.find((r) => r._id === bookingRoomId);
		if (!room) return;

		// Calculate hours from selected slots
		const selectedRoomSlots = selectedSlots[bookingRoomId] || [];
		const hours = selectedRoomSlots.length;

		// Format booking date as DD-MM-YYYY
		const formattedBookingDate = formatDate(selectedDate);

		// Format slots range
		const roomSlots = room ? getHourlyChipsForRoom(room) : [];
		const slotsRange = formatSelectedSlotRange(
			selectedRoomSlots,
			roomSlots,
		)
			.map((block) => `${formatTime(block.start)} - ${formatTime(block.end)}`)
			.join(", ");

		// Calculate total price
		const totalPrice = (room.pricePerSlot || 0) * hours;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const payload: any = {
			formType: "MEETING_ROOM",
			price: totalPrice.toString(),
			hours: hours.toString(),
			bookingDate: formattedBookingDate,
			slots: slotsRange,
			center: room.centerId?.center_name || "",
			meetingRoomCode: room.code || "",
			requiredSeats: room.seating || 0,
			acceptedTerms: true,
		};

		for (const field of meetingRoomFields) {
			const role = getMeetingFieldRole(field);
			const key = normalizeFieldToken(field.id || field.name);
			const value =
				role === "fullname"
					? bookingForm.fullname
					: role === "phone"
						? bookingForm.phone
						: role === "email"
							? bookingForm.email
							: role === "company"
								? bookingForm.company
								: dynamicFieldValues[key] || "";

			if (!String(value || "").trim()) continue;

			if (role === "fullname") payload.fullName = value;
			else if (role === "phone") payload.phoneNumber = value;
			else if (role === "email") payload.email = value;
			else if (role === "company") payload.companyName = value;
			else payload[field.id || field.name] = value;
		}

		// Submit the form
		await submitFormData(payload, captchaToken);
	};

	const handleClearFilter = () => {
		setSelectedCentres(new Set());
		setSelectedDate(
			new Date()
				.toLocaleDateString("en-GB")
				.split("/")
				.reverse()
				.join("-"),
		);
		setSelectedSeats("");
		setSelectedSlots({});
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
		}

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, [showModal]);

	const getMeetingFieldValue = (field: WebsiteFormField) => {
		const role = getMeetingFieldRole(field);
		const key = normalizeFieldToken(field.id || field.name);
		if (role === "fullname") return bookingForm.fullname;
		if (role === "phone") return bookingForm.phone;
		if (role === "email") return bookingForm.email;
		if (role === "company") return bookingForm.company;
		return dynamicFieldValues[key] || "";
	};

	const getMeetingFieldIcon = (field: WebsiteFormField) => {
		const icon = normalizeFieldToken(field.icon);
		if (icon.includes("mdperson")) return MdPerson;
		if (icon.includes("mdphone")) return MdPhone;
		if (icon.includes("mdemail")) return MdEmail;
		if (icon.includes("mdbusiness")) return MdBusiness;
		return null;
	};

	const meetingSubmitDisabled =
		meetingFormLoading || isSubmitting;

	return (
		<>
			<div
				id='meeting-rooms'
				className='min-h-screen p-4 md:p-6'
				style={{ backgroundColor: "#f8f8f8" }}
			>
				<div className='max-w-full mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						{/* Left Sidebar - Filters */}
						<div className='md:col-span-1'>
							<div
								className='bg-white rounded-2xl shadow-lg p-6 sticky top-8'
								style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
							>
								<h3
									className='text-lg font-bold mb-6'
									style={{
										color: "#00275c",
										fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									}}
								>
									Filters
								</h3>

								{/* Date Filter with Calendar Icon */}
								<div className='mb-6'>
									<label
										className='text-sm font-semibold mb-2 flex items-center gap-2'
										style={{
											color: "#00275c",
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										<CalendarDays /> Date
									</label>
									<div className='relative'>
										<input
											ref={dateInputRef}
											type='date'
											value={selectedDate}
											onChange={(e) => {
												const value = e.target.value;
												setSelectedDate(
													value || getTodayDate(),
												);
											}}
											min={
												new Date()
													.toISOString()
													.split("T")[0]
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
											style={{
												fontFamily:
													"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
											}}
										/>
									</div>
									<p
										className='text-xs mt-2 text-gray-600'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										{formatDate(selectedDate)}
									</p>
								</div>

								{/* Seats Filter Dropdown */}
								<div className='mb-6'>
									<label
										className='text-sm font-semibold mb-2 flex items-center gap-2'
										style={{
											color: "#00275c",
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										<Armchair size={18} /> Seats
									</label>
									<select
										value={selectedSeats}
										onChange={(e) =>
											setSelectedSeats(e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
								<div className='mb-6'>
									<label
										className='flex items-center gap-2 text-sm font-bold mb-3'
										style={{
											color: "#00275c",
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										<Filter />
										<span>Filter by Location</span>
									</label>
									<div className='space-y-3 max-h-96 overflow-y-auto'>
										{Array.from(cityCentresMapProper.keys())
											.sort()
											.map((city) => {
												const centresInCity = (
													Array.from(
														cityCentresMapProper.get(
															city,
														) || new Set(),
													) as string[]
												).sort();
												const allSelected =
													centresInCity.length > 0 &&
													centresInCity.every(
														(centre: string) =>
															selectedCentres.has(
																centre,
															),
													);
												const isExpanded =
													expandedCities.has(city);

												return (
													<div key={city}>
														{/* City Header */}
														<div className='flex items-center gap-2'>
															<input
																type='checkbox'
																id={`city-${city}`}
																checked={
																	allSelected
																}
																onChange={() =>
																	handleCityCheckChange(
																		city,
																	)
																}
																className='w-4 h-4 rounded cursor-pointer'
																style={{
																	accentColor:
																		"#FFDE00",
																}}
															/>
															<button
																onClick={() =>
																	toggleCityExpansion(
																		city,
																	)
																}
																className='flex-1 text-left flex items-center gap-2'
																style={{
																	color: "#00275c",
																	fontFamily:
																		"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																}}
															>
																<span
																	className='text-xs font-bold'
																	style={{
																		transition:
																			"transform 0.2s",
																		transform:
																			isExpanded
																				? "rotate(90deg)"
																				: "rotate(0deg)",
																		display:
																			"inline-block",
																	}}
																>
																	▶
																</span>
																<label
																	className='text-sm font-bold cursor-pointer'
																	style={{
																		color: "#00275c",
																		fontFamily:
																			"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																	}}
																>
																	{city}
																</label>
															</button>
														</div>

														{/* Centres under City */}
														{isExpanded && (
															<div className='ml-6 mt-2 space-y-2 border-l-2 border-gray-300 pl-3'>
																{centresInCity.map(
																	(
																		centre: string,
																	) => (
																		<div
																			key={
																				centre
																			}
																			className='flex items-center'
																		>
																			<input
																				type='checkbox'
																				id={`centre-${centre}`}
																				checked={selectedCentres.has(
																					centre,
																				)}
																				onChange={() =>
																					handleCentreCheckChange(
																						centre,
																					)
																				}
																				className='w-4 h-4 rounded cursor-pointer'
																				style={{
																					accentColor:
																						"#FFDE00",
																				}}
																			/>
																			<label
																				htmlFor={`centre-${centre}`}
																				className='ml-2 text-sm cursor-pointer flex-1'
																				style={{
																					color: "#333",
																					fontFamily:
																						"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																				}}
																			>
																				{
																					centre
																				}
																			</label>
																			{/* Tooltip Icon */}
																			<div className='relative group ml-1'>
																				<Info
																					size={
																						14
																					}
																					className='cursor-help'
																					style={{
																						color: "#00275c",
																					}}
																				/>
																				{/* Tooltip Content */}
																				<div
																					className='absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-normal'
																					style={{
																						width: "160px",
																						padding:
																							"10px",
																						backgroundColor:
																							"#1f2937",
																						color: "white",
																						fontSize:
																							"11px",
																						borderRadius:
																							"8px",
																						boxShadow:
																							"0 10px 25px rgba(0, 0, 0, 0.3)",
																						fontFamily:
																							"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																						zIndex: 99999,
																					}}
																				>
																					{centreAddressMap.get(
																						centre,
																					) ||
																						"Address not available"}
																					{/* Arrow pointing right */}
																					<div
																						className='absolute left-full top-1/2 -translate-y-1/2'
																						style={{
																							width: 0,
																							height: 0,
																							borderTop:
																								"6px solid transparent",
																							borderBottom:
																								"6px solid transparent",
																							borderLeft:
																								"6px solid #1f2937",
																						}}
																					/>
																				</div>
																			</div>
																		</div>
																	),
																)}
															</div>
														)}
													</div>
												);
											})}
									</div>
								</div>

								{/* Clear Filter Button */}
								<button
									onClick={handleClearFilter}
									className='w-full px-4 py-2 rounded-lg font-semibold text-sm text-white transition-colors'
									style={{
										backgroundColor: "#003d82",
										fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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

						{/* Right Section - Meeting Rooms */}
						<div className='md:col-span-3'>
							{/* Loading State */}
							{isFetchingRooms && (
								<div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
									<p
										className='text-lg text-gray-500'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
											className='bg-white rounded-2xl overflow-hidden shadow-lg p-6 md:p-8'
										>
											<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
												{/* Left Section - Image and Room Info */}
												<div className='md:col-span-1'>
													{/* Image Carousel */}
													<div className='flex items-center gap-2 mb-4'>
														{/* Left Arrow - Outside */}

														{/* Image Container */}
														<div className='relative w-full h-40 md:h-48 overflow-hidden bg-gray-200 rounded-xl group'>
															{currentImage && (
																<img
																	src={
																		currentImage
																	}
																	alt={
																		room.name
																	}
																	className='w-full h-full object-cover'
																/>
															)}

															{/* Left Arrow */}
															{room.images
																?.length >
																1 && (
																<button
																	onClick={() =>
																		handlePrevImage(
																			room._id,
																		)
																	}
																	className='
				absolute left-2 top-1/2 -translate-y-1/2
			bg-black/40 text-white text-xl
			w-7 h-7 rounded
			flex items-center justify-center
			opacity-0 group-hover:opacity-100
			transition-opacity duration-300
			cursor-pointer
		'
																>
																	&lt;
																</button>
															)}

															{/* Right Arrow */}
															{room.images
																?.length >
																1 && (
																<button
																	onClick={() =>
																		handleNextImage(
																			room._id,
																		)
																	}
																	className='
			absolute right-2 top-1/2 -translate-y-1/2
			bg-black/40 text-white text-xl
			w-7 h-7 rounded
			flex items-center justify-center
			opacity-0 group-hover:opacity-100
			transition-opacity duration-300
			cursor-pointer
		'
																>
																	&gt;
																</button>
															)}
														</div>
													</div>

													{/* Room Details */}
													<div className='mt-6 pt-4 border-t border-gray-200'>
														<h3
															className='text-lg font-bold mb-1'
															style={{
																color: "#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
														>
															{room.name}
														</h3>
														<p
															className='text-xs mb-3'
															style={{
																color: "#666",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
														>
															{room.code}
														</p>

														<div className='space-y-3 text-sm'>
															{/* Seats and Price Row */}
															<div className='flex items-center gap-4'>
																<div className='flex items-center gap-2'>
																	<Armchair
																		size={
																			18
																		}
																		style={{
																			color: "#666",
																		}}
																	/>
																	<span
																		style={{
																			color: "#666",
																			fontFamily:
																				"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																		}}
																	>
																		{
																			room.seating
																		}{" "}
																		seats
																	</span>
																</div>
																<div
																	className='text-xl font-bold'
																	style={{
																		color: "#00275c",
																		fontFamily:
																			"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																	}}
																>
																	₹
																	{
																		room.pricePerSlot
																	}
																	/hr
																</div>
															</div>

															{/* Amenities */}
															{room.amenities &&
																room.amenities
																	.length >
																	0 && (
																	<div className='flex items-center gap-2 mt-3'>
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
																											20
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
																											20
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
																											20
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
																											20
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
																											20
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
																											20
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
																											20
																										}
																									/>
																								);
																							// Show CheckCircle for unknown amenities
																							return (
																								<CheckCircle
																									size={
																										20
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

																					// Always show amenity, even without specific icon
																					return (
																						<div
																							key={`${room._id}-${amenityStr}-${index}`}
																							className='flex items-center justify-center w-9 h-9 rounded-lg'
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
																)}
														</div>
													</div>
												</div>

												{/* Right Section - Time Slots */}
												<div className='md:col-span-2'>
													{/* Date Badge */}
													<div className='mb-4 flex justify-between items-start'>
														<h4
															className='font-semibold'
															style={{
																color: "#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
														>
															Select Slot
														</h4>
														<div
															className='px-3 py-1 rounded-lg font-bold text-xs'
															onClick={() => {
																if (
																	dateInputRef.current
																) {
																	dateInputRef.current.showPicker();
																}
															}}
															style={{
																backgroundColor:
																	"#FFDE00",
																color: "#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
														>
															{formatDate(
																selectedDate,
															)}
														</div>
													</div>

													{/* Time Slots Grid */}
													<div className='grid grid-cols-3 md:grid-cols-4 gap-3 mb-6'>
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
																				className={`px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap inline-flex items-center justify-center min-w-fit${
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
																									"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																								border: "transparent",
																							}
																						: isBooked
																							? {
																									fontFamily:
																										"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																									backgroundColor:
																										"#ffffff",
																									color: "#9ca3af",
																								}
																							: {
																									fontFamily:
																										"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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

													{/* Book Now Button */}
													<div className='flex justify-center'>
														<button
															onClick={() =>
																handleBooking(
																	room._id,
																)
															}
															className='px-8 py-3 rounded-full font-bold text-sm transition-colors'
															style={{
																backgroundColor:
																	"#FFDE00",
																color: "#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
															onMouseEnter={(e) =>
																(e.currentTarget.style.backgroundColor =
																	"#e6c900")
															}
															onMouseLeave={(e) =>
																(e.currentTarget.style.backgroundColor =
																	"#FFDE00")
															}
														>
															Book Now
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
													"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
														"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
						ref={modalScrollRef}
						className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
						style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
						onClick={(e) => e.stopPropagation()}
					>
						{!confirmationMessage ? (
							<>
								<div className='flex flex-col md:flex-row'>
									{/* Left Side - Booking Details Card (Yellow) */}
									<div
										className='w-full md:w-80 p-8 bg-yellow-100 text-brand-blue overflow-hidden'
										// style={{
										//   backgroundColor: "#FFDE00",
										//   color: "#00275c",
										// }}
									>
										{/* Date */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' />
											</svg>
											<div>
												<p className='text-xs font-semibold opacity-80'>
													Date
												</p>
												<p className='text-sm font-bold'>
													{formatDate(selectedDate)}
												</p>
											</div>
										</div>

										{/* Seating */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' />
											</svg>
											<div>
												<p className='text-xs font-semibold opacity-80'>
													Seating Capacity
												</p>
												<p className='text-sm font-bold'>
													{bookedRoom?.seating} Seats
												</p>
											</div>
										</div>

										{/* Time */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3V7z' />
											</svg>
											<div className='min-w-0 flex-1'>
												<p className='text-xs font-semibold opacity-80'>
													Time Slots
												</p>
												<p className='text-sm font-bold break-words'>
													{formatSelectedSlotRange(
														selectedSlots[bookingRoomId || ""],
														bookedRoom
															? getHourlyChipsForRoom(bookedRoom)
															: undefined,
													)
														.map((block) =>
															`${formatTime(block.start)} - ${formatTime(block.end)}`,
														)
														.join(", ") || "No slots selected"}
												</p>
											</div>
										</div>

										{/* Location */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
											</svg>
											<div>
												<p className='text-xs font-semibold opacity-80'>
													Location
												</p>
												<p className='text-sm font-bold'>
													{
														bookedRoom?.centerId
															?.center_name
													}
												</p>
											</div>
										</div>

										{/* Price/Hour */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21h-1v-1h1v1zm4-4H7V4h8.5v14z' />
											</svg>
											<div>
												<p className='text-xs font-semibold opacity-80'>
													Price/Hour
												</p>
												<p className='text-sm font-bold'>
													₹{bookedRoom?.pricePerSlot}
												</p>
											</div>
										</div>
									</div>

									{/* Right Side - Form */}
									<div className='flex-1 p-8'>
										<div className='space-y-4 mb-6'>
											{meetingRoomFields.map((field) => {
												const role = getMeetingFieldRole(field);
												const fieldName = role === "unknown" ? normalizeFieldToken(field.id || field.name) : role;
												const Icon = getMeetingFieldIcon(field);
												const value = getMeetingFieldValue(field);
												const isTextArea = field.type === "textarea";
												const placeholder = field.placeholder || `${field.name}${field.required ? " *" : ""}`;
												const borderColor =
													role === "fullname"
														? (fullnameError ? "#ef4444" : "#00275c")
														: role === "phone"
															? (phoneError ? "#ef4444" : "#00275c")
															: role === "email"
																? (emailError ? "#ef4444" : "#00275c")
																: "#00275c";

												return (
													<div key={field.id || field.name}>
														<div className='relative'>
															{Icon && <Icon className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' size={20} />}
															{isTextArea ? (
																<textarea
																	name={fieldName}
																	value={value}
																	onChange={handleFormChange}
																	rows={field.rows || 3}
																	placeholder={placeholder}
																	className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-700 focus:outline-none focus:border-brand-blue transition-colors resize-none'
																	style={{ borderColor, fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
																/>
															) : (
																<input
																	type={role === "email" ? "email" : role === "phone" ? "text" : "text"}
																	inputMode={role === "phone" ? "numeric" : undefined}
																	pattern={role === "phone" ? "[0-9]*" : undefined}
																	name={fieldName}
																	value={value}
																	onChange={handleFormChange}
																	placeholder={placeholder}
																	maxLength={role === "phone" ? 10 : role === "fullname" ? 50 : 100}
																	className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-700 focus:outline-none focus:border-brand-blue transition-colors'
																	style={{ borderColor, fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
																/>
															)}
														</div>
														{role === "fullname" && fullnameError && <p className='text-xs mt-1 text-red-500' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{fullnameError}</p>}
														{role === "phone" && phoneError && <p className='text-xs mt-1 text-red-500' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{phoneError}</p>}
														{role === "email" && emailError && <p className='text-xs mt-1 text-red-500' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{emailError}</p>}
													</div>
												);
											})}
										</div>

										{/* reCAPTCHA — on click, scroll modal so captcha is near top, giving challenge max space below */}
										<div
											ref={captchaWrapperRef}
											className='flex justify-center pb-5'
											onClickCapture={() => {
												if (
													captchaWrapperRef.current &&
													modalScrollRef.current
												) {
													const captchaOffsetTop =
														captchaWrapperRef
															.current.offsetTop;
													modalScrollRef.current.scrollTo(
														{
															top: Math.max(
																0,
																captchaOffsetTop -
																	90,
															),
															behavior: "smooth",
														},
													);
												}
											}}
										>
											<V2Recaptcha
												ref={captchaRef}
												onVerify={handleCaptchaVerify}
											/>
										</div>

										{/* Action Buttons */}
										<div className='flex gap-3'>
											<button
												onClick={() =>
													setShowModal(false)
												}
												className='flex-1 px-4 py-2 rounded-lg font-semibold text-sm border-2 transition-colors'
												style={{
													borderColor: "#00275c",
													color: "#00275c",
													fontFamily:
														"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
												}}
											>
												Cancel
											</button>
											<button
												onClick={handleFormSubmit}
												disabled={meetingSubmitDisabled}
												className='flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
												style={{
													backgroundColor: "#FFDE00",
													color: "#00275c",
													fontFamily:
														"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
												}}
												onMouseEnter={(e) => {
													if (
														!e.currentTarget
															.disabled
													) {
														e.currentTarget.style.backgroundColor =
															"#e6c900";
													}
												}}
												onMouseLeave={(e) => {
													if (
														!e.currentTarget
															.disabled
													) {
														e.currentTarget.style.backgroundColor =
															"#FFDE00";
													}
												}}
											>
												{isSubmitting
													? "Submitting..."
													: "SUBMIT"}
											</button>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								{/* Confirmation Message */}
								<div className='text-center'>
									<div
										className='mb-4 text-4xl'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										✅
									</div>
									<h3
										className='text-xl font-bold mb-4'
										style={{ color: "#00275c" }}
									>
										Booking Request Received!
									</h3>
									<p
										className='text-gray-600 mb-6'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										Our team will reach out to you regarding
										the meeting room booking shortly.
									</p>
									<p
										className='text-sm text-gray-500 mb-6'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										Confirmation details have been sent to{" "}
										<strong>{bookingForm.email}</strong>
									</p>

									<button
										onClick={() => setShowModal(false)}
										className='w-full px-4 py-2 rounded-lg font-semibold text-sm text-white transition-colors'
										style={{
											backgroundColor: "#003d82",
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
										Close
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default MeetingRooms;

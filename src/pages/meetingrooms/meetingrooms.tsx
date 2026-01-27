import React, { useState, useMemo, useEffect } from "react";
import metingsRoomsData from "../../content/json";

interface TimeSlot {
	startTime: string;
	endTime: string;
	rate: string;
	slotType: string;
	availability: {
		booked: boolean;
	};
}

interface MeetingRoom {
	_id: string;
	name: string;
	code: string;
	seating: number;
	capacity: number;
	pricePerHour: number;
	images: string[];
	openingTime: string;
	closingTime: string;
	rateCards: Array<{
		timeSlots: TimeSlot[];
	}>;
	cityId?: {
		city: string;
	};
	centerId?: {
		center_name: string;
	};
}

interface BookingForm {
	fullname: string;
	email: string;
	company: string;
	phone: string;
}

const MeetingRooms: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toLocaleDateString("en-GB").split("/").reverse().join("-"),
	);
	const [selectedCentres, setSelectedCentres] = useState<Set<string>>(
		new Set(),
	);
	const [expandedCities, setExpandedCities] = useState<Set<string>>(
		new Set(),
	);
	const [selectedSlots, setSelectedSlots] = useState<{
		[key: string]: string;
	}>({});
	const [currentImageIndex, setCurrentImageIndex] = useState<{
		[key: string]: number;
	}>({});
	const [showModal, setShowModal] = useState(false);
	const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
	const [confirmationMessage, setConfirmationMessage] = useState(false);
	const [bookingForm, setBookingForm] = useState<BookingForm>({
		fullname: "",
		email: "",
		company: "",
		phone: "",
	});

	const meetingRooms: MeetingRoom[] = metingsRoomsData?.data?.items || [];

	// Get unique cities and their centres
	const cityCentresMapProper = useMemo(() => {
		const map = new Map<string, Set<string>>();
		meetingRooms.forEach((room) => {
			const cityName = room.cityId?.city || "Unknown";
			const centreName = room.centerId?.center_name || "Unknown";

			if (!map.has(cityName)) {
				map.set(cityName, new Set());
			}
			map.get(cityName)!.add(centreName);
		});
		return map;
	}, [meetingRooms]);

	// Filter rooms by selected centres
	const filteredRooms = useMemo(() => {
		if (selectedCentres.size === 0) {
			return meetingRooms;
		}
		return meetingRooms.filter((room) => {
			return (
				room.centerId?.center_name &&
				selectedCentres.has(room.centerId.center_name)
			);
		});
	}, [meetingRooms, selectedCentres]);

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

	// Get unique time slots from filtered rooms
	const allTimeSlots = useMemo(() => {
		const slots = new Set<string>();
		filteredRooms.forEach((room) => {
			room.rateCards?.forEach((card) => {
				card.timeSlots?.forEach((slot) => {
					slots.add(slot.startTime);
				});
			});
		});
		return Array.from(slots).sort();
	}, [filteredRooms]);

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

	const handleSlotSelection = (roomId: string, slotTime: string) => {
		setSelectedSlots((prev) => ({
			...prev,
			[roomId]: prev[roomId] === slotTime ? "" : slotTime,
		}));
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
		if (!selectedSlots[roomId]) {
			alert("Please select a time slot");
			return;
		}
		setBookingRoomId(roomId);
		setShowModal(true);
		setConfirmationMessage(false);
		setBookingForm({ fullname: "", email: "", company: "", phone: "" });
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBookingForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = () => {
		if (
			!bookingForm.fullname ||
			!bookingForm.email ||
			!bookingForm.company ||
			!bookingForm.phone
		) {
			alert("Please fill in all fields");
			return;
		}
		setConfirmationMessage(true);
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
		setSelectedSlots({});
	};

	const bookedRoom = bookingRoomId
		? filteredRooms.find((r) => r._id === bookingRoomId)
		: null;

	return (
		<div
			className='min-h-screen p-6 md:p-8'
			style={{ backgroundColor: "#f8f8f8" }}
		>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Left Sidebar - Filters */}
					<div className='md:col-span-1'>
						<div
							className='bg-white rounded-2xl shadow-lg p-6 sticky top-8'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<h3
								className='text-lg font-bold mb-6'
								style={{
									color: "#00275c",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Filters
							</h3>

							{/* Date Filter with Calendar Icon */}
							<div className='mb-6'>
								<label
									className='block text-sm font-semibold mb-2'
									style={{
										color: "#00275c",
										fontFamily: "Outfit, sans-serif",
									}}
								>
									📅 Date
								</label>
								<div className='relative'>
									<input
										type='date'
										value={selectedDate}
										onChange={(e) =>
											setSelectedDate(e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									/>
								</div>
								<p
									className='text-xs mt-2 text-gray-600'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{formatDate(selectedDate)}
								</p>
							</div>

							{/* Centres Filter with Checkboxes */}
							<div className='mb-6'>
								<label
									className='block text-sm font-bold mb-3'
									style={{
										color: "#00275c",
										fontFamily: "Outfit, sans-serif",
									}}
								>
									🏢 Filter by Location
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
																	"Outfit, sans-serif",
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
																		"Outfit, sans-serif",
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
																			className='ml-2 text-sm cursor-pointer'
																			style={{
																				color: "#333",
																				fontFamily:
																					"Outfit, sans-serif",
																			}}
																		>
																			{
																				centre
																			}
																		</label>
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
								🗑️ Clear filter
							</button>
						</div>
					</div>

					{/* Right Section - Meeting Rooms */}
					<div className='md:col-span-3'>
						{/* Meeting Rooms Grid */}
						<div className='space-y-6'>
							{filteredRooms.map((room) => {
								const imageIndex =
									currentImageIndex[room._id] || 0;
								const currentImage = room.images?.[imageIndex];

								return (
									<div
										key={room._id}
										className='bg-white rounded-2xl overflow-hidden shadow-lg p-4 md:p-6'
									>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
											{/* Left Section - Image and Room Info */}
											<div className='md:col-span-1'>
												{/* Image Carousel */}
												<div className='flex items-center gap-2 mb-4'>
													{/* Left Arrow - Outside */}
													{room.images &&
														room.images.length >
															1 && (
															<button
																onClick={() =>
																	handlePrevImage(
																		room._id,
																	)
																}
																className='text-gray-600 text-4xl font-light cursor-pointer hover:text-gray-900 transition duration-200 flex-shrink-0 -ml-2'
																style={{
																	userSelect:
																		"none",
																}}
															>
																&lt;
															</button>
														)}

													{/* Image Container */}
													<div className='relative w-full h-56 md:h-72 overflow-hidden bg-gray-200 rounded-xl flex-1'>
														{currentImage && (
															<img
																src={
																	currentImage
																}
																alt={room.name}
																className='w-full h-full object-cover'
															/>
														)}
													</div>

													{/* Right Arrow - Outside */}
													{room.images &&
														room.images.length >
															1 && (
															<button
																onClick={() =>
																	handleNextImage(
																		room._id,
																	)
																}
																className='text-gray-600 text-4xl font-light cursor-pointer hover:text-gray-900 transition duration-200 flex-shrink-0 -mr-2'
																style={{
																	userSelect:
																		"none",
																}}
															>
																&gt;
															</button>
														)}
												</div>

												{/* Room Details */}
												<div>
													<h3
														className='text-lg font-bold mb-1'
														style={{
															color: "#00275c",
															fontFamily:
																"Outfit, sans-serif",
														}}
													>
														{
															room.centerId
																?.center_name
														}
													</h3>
													<p
														className='text-xs mb-3'
														style={{
															color: "#666",
															fontFamily:
																"Outfit, sans-serif",
														}}
													>
														{room.code}
													</p>

													<div className='space-y-2 text-sm'>
														<div className='flex items-center gap-2'>
															<svg
																className='w-5 h-5'
																style={{
																	color: "#666",
																}}
																fill='currentColor'
																viewBox='0 0 24 24'
															>
																<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
															</svg>
															<span
																style={{
																	color: "#666",
																	fontFamily:
																		"Outfit, sans-serif",
																}}
															>
																{room.seating}{" "}
																seats
															</span>
														</div>
														<div
															className='text-xl font-bold'
															style={{
																color: "#FFDE00",
																fontFamily:
																	"Outfit, sans-serif",
															}}
														>
															₹{room.pricePerHour}
															/hr
														</div>
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
																"Outfit, sans-serif",
														}}
													>
														Select Slot
													</h4>
													<div
														className='px-3 py-1 rounded-lg font-bold text-xs'
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
												</div>

												{/* Time Slots Grid */}
												<div className='grid grid-cols-4 md:grid-cols-5 gap-2 mb-6'>
													{allTimeSlots.map(
														(slot) => (
															<button
																key={`${room._id}-${slot}`}
																onClick={() =>
																	handleSlotSelection(
																		room._id,
																		slot,
																	)
																}
																className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
																	selectedSlots[
																		room._id
																	] === slot
																		? "text-white"
																		: "bg-gray-200 text-gray-600 hover:bg-gray-300"
																}`}
																style={
																	selectedSlots[
																		room._id
																	] === slot
																		? {
																				backgroundColor:
																					"#FFDE00",
																				color: "#00275c",
																				fontFamily:
																					"Outfit, sans-serif",
																			}
																		: {
																				fontFamily:
																					"Outfit, sans-serif",
																			}
																}
															>
																{formatTime(
																	slot,
																)}
															</button>
														),
													)}
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
																"Outfit, sans-serif",
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
										className='text-lg text-gray-500'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										No meeting rooms available
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Booking Modal */}
			{showModal && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]'>
					<div
						className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						{!confirmationMessage ? (
							<>
								<div className='flex flex-col md:flex-row'>
									{/* Left Side - Booking Details Card (Yellow) */}
									<div
										className='w-full md:w-80 p-8'
										style={{
											backgroundColor: "#FFDE00",
											color: "#00275c",
										}}
									>
										{/* Date */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 flex-shrink-0 mt-1'
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

										{/* Time */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 flex-shrink-0 mt-1'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3V7z' />
											</svg>
											<div>
												<p className='text-xs font-semibold opacity-80'>
													Time
												</p>
												<p className='text-sm font-bold'>
													{selectedSlots[
														bookingRoomId || ""
													] &&
														formatTime(
															selectedSlots[
																bookingRoomId ||
																	""
															],
														)}
												</p>
											</div>
										</div>

										{/* Location */}
										<div className='mb-6 flex items-start gap-3'>
											<svg
												className='w-6 h-6 flex-shrink-0 mt-1'
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

										{/* Price */}
										<div className='flex items-start gap-3'>
											<svg
												className='w-6 h-6 flex-shrink-0 mt-1'
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
													₹{bookedRoom?.pricePerHour}
												</p>
											</div>
										</div>
									</div>

									{/* Right Side - Form */}
									<div className='flex-1 p-8'>
										<div className='space-y-4 mb-6'>
											<div>
												<label
													className='block text-sm font-semibold mb-2'
													style={{ color: "#00275c" }}
												>
													Full Name
												</label>
												<input
													type='text'
													name='fullname'
													value={bookingForm.fullname}
													onChange={handleFormChange}
													placeholder='Enter your full name'
													className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												/>
											</div>

											<div>
												<label
													className='block text-sm font-semibold mb-2'
													style={{ color: "#00275c" }}
												>
													Email
												</label>
												<input
													type='email'
													name='email'
													value={bookingForm.email}
													onChange={handleFormChange}
													placeholder='Enter your email'
													className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												/>
											</div>

											<div>
												<label
													className='block text-sm font-semibold mb-2'
													style={{ color: "#00275c" }}
												>
													Company Name
												</label>
												<input
													type='text'
													name='company'
													value={bookingForm.company}
													onChange={handleFormChange}
													placeholder='Enter your company name'
													className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												/>
											</div>

											<div>
												<label
													className='block text-sm font-semibold mb-2'
													style={{ color: "#00275c" }}
												>
													Phone Number
												</label>
												<input
													type='tel'
													name='phone'
													value={bookingForm.phone}
													onChange={handleFormChange}
													placeholder='Enter your phone number'
													className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												/>
											</div>
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
														"Outfit, sans-serif",
												}}
											>
												Cancel
											</button>
											<button
												onClick={handleFormSubmit}
												className='flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-white transition-colors'
												style={{
													backgroundColor: "#FFDE00",
													color: "#00275c",
													fontFamily:
														"Outfit, sans-serif",
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
												Submit
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
											fontFamily: "Outfit, sans-serif",
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
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Our team will reach out to you regarding
										the meeting room booking shortly.
									</p>
									<p
										className='text-sm text-gray-500 mb-6'
										style={{
											fontFamily: "Outfit, sans-serif",
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
										Close
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MeetingRooms;

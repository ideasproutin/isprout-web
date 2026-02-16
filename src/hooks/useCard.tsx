import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LocationCardSkeletonProps {
	count?: number;
}

export const LocationCardSkeleton: React.FC<LocationCardSkeletonProps> = ({
	count = 6,
}) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="group relative overflow-hidden rounded-lg shadow-lg"
				>
					<div className="relative h-96">
						{/* Image skeleton */}
						<Skeleton
							height={384}
							borderRadius={8}
							className="w-full h-full"
						/>

						{/* Title skeleton */}
						<div className="absolute top-4 left-4 right-4">
							<Skeleton
								width="70%"
								height={28}
								style={{ marginBottom: 8 }}
							/>
						</div>

						{/* Bottom section skeleton */}
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-red/10">
							{/* Address lines */}
							<Skeleton
								height={14}
								width="100%"
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								height={14}
								width="90%"
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								height={14}
								width="80%"
								style={{ marginBottom: 16 }}
							/>

							{/* Directions link */}
							<div className="flex items-center gap-2">
								<Skeleton circle width={16} height={16} />
								<Skeleton height={14} width={100} />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default LocationCardSkeleton;

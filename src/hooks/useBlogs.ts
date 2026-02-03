import { useState, useEffect } from "react";
import { getBlogsIndex, getBlogById } from "../services/blogsApi";
import type { Blog } from "../services/blogsApi";

export type { Blog };

export const useBlogs = () => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setLoading(true);
				const data = await getBlogsIndex();
				setBlogs(data);
				setError(null);
			} catch (err) {
				setError("Failed to fetch blogs");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	return { blogs, loading, error };
};

export const useBlog = (blogId: string | undefined) => {
	const [blog, setBlog] = useState<Blog | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!blogId) {
			setLoading(false);
			return;
		}

		const fetchBlog = async () => {
			try {
				setLoading(true);
				const data = await getBlogById(blogId);
				setBlog(data);
				setError(null);
			} catch (err) {
				setError("Failed to fetch blog");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchBlog();
	}, [blogId]);

	return { blog, loading, error };
};

import { useState, useRef, useEffect } from "react";
import "isomorphic-fetch";
import styles from "../styles/Home.module.css";
import SEO from "../components/seo";
import debounce from "../helpers/debounce";

export default function Home() {
	const [index, setIndex] = useState(0);
	const [search, setSearch] = useState("");
	const [before, setBefore] = useState("");
	const [after, setAfter] = useState("");
	const [background, setBackground] = useState("rgb(256,256,256)");
	const inputElement = useRef(null);

	useEffect(() => {
		if (inputElement.current) {
			inputElement.current.focus();
		}
	}, []);

	const handleChange = (event) => {
		if (!event.target.value || isNaN(event.target.value)) {
			setBefore("");
			setAfter("");
			setIndex(0);
			setSearch("");
			return;
		}
		debounce(
			fetch(`/api/search/${event.target.value}`).then((res) =>
				res.json().then((data) => {
					let color = 256 - (data.index / 1000000) * 256;
					setIndex(data.index);
					setSearch(data.search);
					setBefore(data.before);
					setAfter(data.after);
					setBackground(`rgb(${color},${color},${color})`);
				})
			),
			10000
		);
	};

	return (
		<div
			style={{
				background: index > 0 ? background : "rgb(256,256,256)",
			}}
			className={styles.container}
		>
			<SEO />
			<main>
				<input
					className={styles.input}
					onChange={handleChange}
					autoFocus={true}
					ref={inputElement}
				/>
				{index > 0 ? (
					<div className={styles.output}>
						<span>{before}</span>
						<span className={styles.search}>{search}</span>
						<span>{after}</span>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

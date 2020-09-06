import { useState, useRef, useEffect } from "react";
import "isomorphic-fetch";
import ordinal from "ordinal";
import styles from "../styles/Home.module.css";
import SEO from "../components/seo";
import debounce from "../helpers/debounce";
import approximateColor1ToColor2ByPercent from "../helpers/color";

export default function Home() {
	const [index, setIndex] = useState(-1);
	const [search, setSearch] = useState("");
	const [before, setBefore] = useState("");
	const [after, setAfter] = useState("");
	const [highlight, setHighlight] = useState(
		approximateColor1ToColor2ByPercent("#90ee90", "#007700", 1)
	);
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
			setIndex(-1);
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
					setHighlight(
						approximateColor1ToColor2ByPercent(
							"#90ee90",
							"#009900",
							1 - data.index / 1000000
						)
					);
					setBackground(`rgb(${color},${color},${color})`);
				})
			),
			10000
		);
	};

	return (
		<div
			style={{
				background: index > -1 ? background : "rgb(256,256,256)",
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
				{index > -1 ? (
					<>
						<div className={styles.output}>
							<span>{before}</span>
							<span style={{ color: highlight }} className={styles.search}>
								{search}
							</span>
							<span>{after}</span>
						</div>
						<div className={styles.index}>
							<span>At the </span>
							<span style={{ color: highlight }} className={styles.search}>
								{ordinal(index === 0 ? index : index - 1)}
							</span>
							<span> index.</span>
						</div>
					</>
				) : (
					""
				)}
			</main>
		</div>
	);
}

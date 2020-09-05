import { Component } from "react";
import "isomorphic-fetch";
import styles from "../styles/Home.module.css";
import SEO from "../components/seo";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { index: "", background: "rgb(256,256,256)" };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		if (!event.target.value) return this.setState({ index: 0 });
		fetch(`/api/search/${event.target.value}`).then((res) =>
			res.json().then((data) => {
				let color = 256 - (data.index / 1000000) * 256;
				this.setState({
					index: data.index,
					background: `rgb(${color},${color},${color})`,
				});
			})
		);
	}

	render() {
		return (
			<div
				style={{
					background:
						this.state.index > 0 ? this.state.background : "rgb(256,256,256)",
				}}
				className={styles.container}
			>
				<SEO />
				<main>
					<input className={styles.input} onChange={this.handleChange} />
					{this.state.index > 0 ? (
						<div className={styles.output}>{this.state.index}</div>
					) : (
						""
					)}
				</main>
			</div>
		);
	}
}

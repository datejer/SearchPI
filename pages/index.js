import { Component } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import "isomorphic-fetch";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { index: "" };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		if (!event.target.value) return this.setState({ index: 0 });
		fetch(`/api/search/${event.target.value}`).then((res) =>
			res.json().then((data) => {
				this.setState({ index: data.index });
			})
		);
	}

	render() {
		return (
			<Layout>
				<input onChange={this.handleChange} />
				{this.state.index > 0 ? (
					<div>{this.state.index}</div>
				) : (
					<div>not found</div>
				)}
			</Layout>
		);
	}
}

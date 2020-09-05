import styles from "../styles/Layout.module.css";
import SEO from "../components/seo";

export default function Layout({ children }) {
	return (
		<div className={styles.container}>
			<SEO />
			<main>{children}</main>
		</div>
	);
}

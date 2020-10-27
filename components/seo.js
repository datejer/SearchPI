import Head from "next/head";

export default function SEO() {
	return (
		<Head>
			<title>SearchPI</title>
			<link rel="icon" href="/favicon.png" />

			<meta name="title" content="SearchPI" />
			<meta
				name="description"
				content="Neat website for searching patterns in the digits of π."
			/>

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://pi.ejer.gq/" />
			<meta property="og:title" content="SearchPI" />
			<meta
				property="og:description"
				content="Neat website for searching patterns in the digits of π."
			/>
			<meta property="og:image" content="https://i.imgur.com/PO7nqD4.png" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://pi.ejer.gq/" />
			<meta property="twitter:title" content="SearchPI" />
			<meta
				property="twitter:description"
				content="Neat website for searching patterns in the digits of π."
			/>
			<meta
				property="twitter:image"
				content="https://i.imgur.com/PO7nqD4.png"
			/>
		</Head>
	);
}

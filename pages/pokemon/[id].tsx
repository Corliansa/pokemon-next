import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Home: NextPage = ({ pokemon }: any) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>{pokemon.name}</title>
				<meta name="description" content="Pokemon list" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					This is <a href="/">{pokemon.name}</a>
				</h1>

				<div className={styles.grid}>
					<div className={styles.card} key={pokemon.id}>
						<div>
							<Image
								src={`https://ck-pokemon.netlify.com/${pokemon.image}`}
								width={150}
								height={150}
								alt={pokemon.name}
							/>
							<h1>{pokemon.name}</h1>
						</div>
					</div>
					<div>
						<h2>Type</h2>
						<ul>
							{pokemon.type.map((type: any) => (
								<li key={type}>{type}</li>
							))}
						</ul>
						<h2>Stats</h2>
						<ul>
							{pokemon.stats.map((stat: any, index: number) => (
								<li key={index}>
									{stat.name}: {stat.value}
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const data = await fetch(
		`https://ck-pokemon.netlify.com/pokemon/${params.id}.json`
	);
	return {
		props: {
			pokemon: await data.json(),
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await fetch("https://ck-pokemon.netlify.com/index.json");
	const pokemon = await data.json();
	return {
		fallback: "blocking",
		paths: pokemon.map((p: any) => ({
			params: {
				id: JSON.stringify(p.id),
			},
		})),
	};
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ data }: any) => {
	const [search, setSearch] = useState("");

	const matches = (pokemon: any): boolean => {
		try {
			const regex = new RegExp(search, "gi");
			return pokemon.name.match(regex);
		} catch {
			return false;
		}
	};

	const pokemons = data.filter((pokemon: any) =>
		search ? matches(pokemon) : true
	);

	return (
		<div className={styles.container}>
			<Head>
				<title>Pokemons</title>
				<meta name="description" content="Pokemon list" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="/">Pokemons</a>
				</h1>

				<div>
					<input
						type="text"
						placeholder="Enter pokemon name..."
						style={{
							width: 300,
							height: 36,
							margin: 20,
							borderRadius: 5,
							border: "1px solid grey",
							padding: 10,
						}}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className={styles.grid}>
					{pokemons.map((pokemon: any) => (
						<a
							className={styles.card}
							key={pokemon.id}
							href={`./pokemon/${pokemon.id}`}
						>
							<Image
								src={`https://ck-pokemon.netlify.com/${pokemon.image}`}
								width={150}
								height={150}
								alt={pokemon.name}
							/>
							<h3>{pokemon.name}</h3>
						</a>
					))}
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
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
};

export async function getStaticProps() {
	const data = await fetch("https://ck-pokemon.netlify.com/index.json");
	return {
		props: {
			data: await data.json(),
		},
	};
}

export default Home;

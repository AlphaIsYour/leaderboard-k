<script>
	import { onMount } from 'svelte';
	import { web3, contract } from './web3';
  
	let koruptor = [];
	let loading = false; // Tambah state loading
  
	onMount(async () => {
	  try {
		loading = true;
		const data = await contract.methods.getKoruptorList().call();
		koruptor = data.map(k => ({
		  nama: k.nama,
		  identitas: k.identitas,
		  jumlah: Number(k.jumlah)
		}));
	  } catch (error) {
		console.error('Error fetching data:', error);
	  } finally {
		loading = false;
	  }
	});
  
	$: sortedKoruptor = koruptor.sort((a, b) => b.jumlah - a.jumlah).map((k, i) => ({
	  ...k,
	  rank: i + 1
	}));
  
	let nama = '';
	let identitas = '';
	let jumlah = 0;
  
	async function tambahKoruptor() {
	  try {
		loading = true;
		const accounts = await web3.eth.getAccounts();
		await contract.methods.addKoruptor(nama, identitas, jumlah).send({ from: accounts[0] });
		const data = await contract.methods.getKoruptorList().call();
		koruptor = data.map(k => ({
		  nama: k.nama,
		  identitas: k.identitas,
		  jumlah: Number(k.jumlah)
		}));
		nama = ''; identitas = ''; jumlah = 0;
	  } catch (error) {
		console.error('Error adding koruptor:', error);
	  } finally {
		loading = false;
	  }
	}
  </script>
  
  <main>
	<h1>Leaderboard Koruptor Indonesia</h1>
	<div>
	  <input bind:value={nama} placeholder="Nama" />
	  <input bind:value={identitas} placeholder="Identitas" />
	  <input type="number" bind:value={jumlah} placeholder="Jumlah (Triliun)" />
	  <button on:click={tambahKoruptor} disabled={loading}>
		{#if loading}
		  Loading...
		{:else}
		  Tambah
		{/if}
	  </button>
	</div>
  
	{#if loading}
	  <p>Loading data...</p>
	{:else}
	  <table>
		<thead>
		  <tr>
			<th>Peringkat</th>
			<th>Nama</th>
			<th>Identitas</th>
			<th>Jumlah Korupsi (Triliun)</th>
		  </tr>
		</thead>
		<tbody>
		  {#each sortedKoruptor as k}
			<tr>
			  <td>{k.rank}</td>
			  <td>{k.nama}</td>
			  <td>{k.identitas}</td>
			  <td>{k.jumlah} T</td>
			</tr>
		  {/each}
		</tbody>
	  </table>
	{/if}
  </main>
  
  <style>
	main {
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #ff3e00 0%, #ff6f61 100%);
  }

	h1 {
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  font-family: 'Poppins', sans-serif;
  font-size: 2.5em;
  margin-bottom: 30px;
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
table {
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
th, td {
  padding: 15px;
  border: none;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #ff3e00;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #ffebeb;
  transition: background-color 0.3s;
}
/* Highlight peringkat 1 */
tr:first-child td {
  background-color: #ffd700;
  font-weight: bold;
  color: #333;
}
	div {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}
input:focus {
  border-color: #ff3e00;
  outline: none;
}
button {
  padding: 10px 20px;
  background-color: #ff3e00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #e03600;
}

@media (max-width: 600px) {
  table {
    width: 100%;
  }
  th, td {
    padding: 10px;
    font-size: 0.9em;
  }
  div {
    flex-direction: column;
    max-width: 100%;
  }
  input, button {
    width: 100%;
    box-sizing: border-box;
  }
}
  </style>
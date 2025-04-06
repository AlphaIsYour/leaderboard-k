<script>
	// Data dummy buat simulasi leaderboard
	let koruptor = [
	  { nama: "Koruptor A", identitas: "Pejabat X", jumlah: 100, rank: 1 },
	  { nama: "Koruptor B", identitas: "Pengusaha Y", jumlah: 50, rank: 2 },
	  { nama: "Koruptor C", identitas: "Anggota Z", jumlah: 25, rank: 3 }
	];
  
	// Fungsi buat ngurutin berdasarkan jumlah (besar ke kecil)
	$: sortedKoruptor = koruptor.sort((a, b) => b.jumlah - a.jumlah).map((k, i) => ({
	  ...k,
	  rank: i + 1
	}));
  </script>
  
  <main>
	<h1>Leaderboard Koruptor Indonesia</h1>
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
  </main>
  
  <style>
	main {
	  text-align: center;
	  padding: 20px;
	}
	h1 {
	  color: #ff3e00;
	}
	table {
	  width: 80%;
	  margin: 20px auto;
	  border-collapse: collapse;
	}
	th, td {
	  padding: 10px;
	  border: 1px solid #ddd;
	}
	th {
	  background-color: #f4f4f4;
	}
  </style>
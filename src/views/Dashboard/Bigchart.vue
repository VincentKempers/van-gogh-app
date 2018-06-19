<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	data() {
		return {
			data: [5, 10, 22, 17, 15, 20, 13],
			secondData: [22, 17, 15, 20, 15, 11, 13],
			gradient: null,
			gradient2: null,
		};
	},
	methods: {
		manipulation() {
			setTimeout(function() {
				console.log(this);
				this.data.pop();
			}, 1000);
		},
		renderLineChart() {
			this.renderChart(
				{
					labels: ['10.00', '10.30', '11.00', '11.30', '12.00', '12.30', '13.00'],
					datasets: [
						{
							label: 'Data One',
							borderColor: '#FC2525',
							pointBackgroundColor: 'white',
							borderWidth: 1,
							pointBorderColor: 'white',
							backgroundColor: this.gradient,
							data: this.data,
						},
						{
							label: 'Data two',
							borderColor: 'rgb(65, 184, 131)',
							pointBackgroundColor: 'white',
							borderWidth: 1,
							pointBorderColor: 'white',
							backgroundColor: this.gradient2,
							data: this.secondData,
						},
					],
				},
				{
					scales: {
						yAxes: [
							{
								gridLines: {
									display: false,
								},
							},
						],
						xAxes: [
							{
								gridLines: {
									display: false,
								},
							},
						],
					},
					legend: {
						display: true,
					},
					responsive: true,
					maintainAspectRatio: false,
				}
			);
			this.manipulation();
		},
	},
	mounted() {
		// gradient color 1
		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
		this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
		this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

		// gradient color 2
		this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient2.addColorStop(0, 'rgb(65, 184, 131, 0.1)');
		this.gradient2.addColorStop(0.5, 'rgb(65, 184, 131, 0.5)');
		this.gradient2.addColorStop(1, 'rgb(65, 184, 131, 0.25)');
		this.renderLineChart();
	},
};
</script>

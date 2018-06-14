<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	data() {
		return {
			data: [0, 0, 0, 0, 1, 2, 0],
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
							backgroundColor: 'rgba(224, 90, 50, 1.000)',
							data: this.data,
						},
					],
				},
				{ responsive: true, maintainAspectRatio: false }
			);
			this.manipulation();
		},
	},
	mounted() {
		this.renderLineChart();
	},
};
</script>
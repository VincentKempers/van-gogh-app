<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
	extends: Line,
	// We are extending the base chart class as mentioned above
	mixins: {reactiveProp},
	props: ['chartData'],
	data() {
		return {
			options: {
				//Chart.js options
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
								stepSize: 2,
								suggestedMin: 0,
								suggestedMax: 16,
								maxTicksLimit: 6
							},
							gridLines: {
								display: true,
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
				animation: false,
			},
		};
	},
	mounted() {
		// this.chartData is created in the mixin
		this.renderChart(this.chartData, this.options);
	},
	watch: {
		chartData() {
			console.log('changed');
			this.renderChart(this.chartData, this.options);
			
		}
	}
};
</script>

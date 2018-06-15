<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	data() {
		return {
			data: [0, 0, 0, 0, 1, 2, 0],
			gradient: null,
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
					],
				},
				{ responsive: false, maintainAspectRatio: false }
			);
			this.manipulation();
		},
	},
	mounted() {
		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
		this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
		this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
		this.renderLineChart();
	},
};
</script>
import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/services/count/count.service';
import { Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private cs: CountService,
    ) { }
  data: any;
  barChart: Chart;
  lineChart: Chart;
  roles: any;
  dayOfC: any;
  dayOfR: any;
  ngOnInit(): void {
    Chart.register(...registerables);
    this.getBarChart();
    this.getLineChart();
  }
  getLineChart() {
    this.cs.getCount().subscribe( data => {
      this.data = data;
      this.dayOfC = data.dayOfCmd;
      this.dayOfR = data.dayOfReserv;
      this.lineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
          datasets: [
            {
              label: '#Commandes',
              data: [
                this.dayOfC.Monday,
                this.dayOfC.Tuesday,
                this.dayOfC.Wednesday,
                this.dayOfC.Thursday,
                this.dayOfC.Friday,
                this.dayOfC.Saturday,
                this.dayOfC.Sunday,
              ],
              fill: false,
              borderColor: 'rgba(0, 205, 206)',
              borderWidth: 3
            },
            {
              label: '#Reservations',
              data: [
                this.dayOfR.Monday,
                this.dayOfR.Tuesday,
                this.dayOfR.Wednesday,
                this.dayOfR.Thursday,
                this.dayOfR.Friday,
                this.dayOfR.Saturday,
                this.dayOfR.Sunday,
              ],
              fill: false,
              borderColor: 'rgb(255,169,0)',
              borderWidth: 3
            }
          ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    });

  }
  getBarChart() {
    this.cs.getCount().subscribe( data => {
      this.data = data;
      this.dayOfC = data.dayOfCmd;
      this.dayOfR = data.dayOfReserv;
      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: '#Commandes',
            backgroundColor: 'rgb(163,163,163)',
            data: [
              this.dayOfC.Monday,
              this.dayOfC.Tuesday,
              this.dayOfC.Wednesday,
              this.dayOfC.Thursday,
              this.dayOfC.Friday,
              this.dayOfC.Saturday,
              this.dayOfC.Sunday,
            ]

          },
          {
            label: '#Reservations',
            backgroundColor: 'rgba(255, 87, 103)',
            data: [
              this.dayOfR.Monday,
              this.dayOfR.Tuesday,
              this.dayOfR.Wednesday,
              this.dayOfR.Thursday,
              this.dayOfR.Friday,
              this.dayOfR.Saturday,
              this.dayOfR.Sunday,
            ]

          },

        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });
    });

  }
}

<template>
  <div id="app">
    <highcharts
    :options="chartOptions"
    >
    </highcharts>
  </div>
</template>

<script>
import db from "./firebaseConfig";

export default {
  name: "app",
  data() {
    return {
      /*
      Gotten data from firebase or local storage

      */
      ageRange: {
        firstAgeValue: 0,
        secondAgeValue: 0,
        thirdAgeValue: 0,
        fourthAgeValue: 0,
        fifthAgeValue: 0
      },
      bloodGroup: {
        bloodAValue: 0,
        bloodBValue: 0,
        bloodABValue: 0,
        bloodOValue: 0
      },
      userInfo: [],

      /*
      This is the setup of the Bar Graph

      */

      chartOptions: {
        chart: {
          type: "bar"
        },
        title: {
          text: "Data Bar "
        },
        xAxis: {
          categories: ["Age Range", "Blood Group"]
        },
        yAxis: {
          min: 0,
          title: {
            text: "Number"
          }
        },

        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
        },

        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: "normal"
          }
        },
        series: [
          {
            name: "80-99",
            data: [0, 0]
          },
          {
            name: "60-79",
            data: [0, 0]
          },
          {
            name: "40-59",
            data: [0, 0]
          },
          {
            name: "20-39",
            data: [0, 0]
          },
          {
            name: "0-19",
            data: [0, 0]
          },
          {
            name: "O",
            data: [0, 0]
          },

          {
            name: "AB",
            data: [0, 0]
          },
          {
            name: "B",
            data: [0, 0]
          },
          {
            name: "A",
            data: [0, 0]
          }
        ]
      }
    };
  },

  /* This is the Created Lifecycle Hook
  used to mount the data from the Firebase 
  Database or LocalStorage */

  created() {
    if (localStorage.bloodGroup && localStorage.ageRange) {
      this.bloodGroup = JSON.parse(localStorage.bloodGroup);
      this.ageRange = JSON.parse(localStorage.ageRange);
      console.log(this.ageRange);
      this.setDataValue();
    } else {
      this.getData();
    }
  },

  methods: {
    /* 
  This is the function used to get the data
  from the Firebase Database 
   */
    getData() {
      var that = this;
      db.ref("users")
        .once("value")
        .then(function(snapshot) {
          that.userInfo = snapshot.val();
        })
        .finally(function() {
          that.mountData();
        });
    },

    /* 
  This is the function used to mount the 
  retrived data to the Vue app
   */
    mountData() {
      var that = this;
      console.log(this.userInfo);
      this.userInfo.forEach(function(u) {
        var age = u.age;
        switch (true) {
          case age > 0 && age <= 20:
            that.ageRange.firstAgeValue += 1;
            break;
          case age > 20 && age <= 40:
            that.ageRange.secondAgeValue += 1;
            break;
          case age > 40 && age <= 60:
            that.ageRange.thirdAgeValue += 1;
            break;
          case age > 60 && age <= 80:
            that.ageRange.fourthAgeValue += 1;
            break;
          case age > 80 && age <= 100:
            that.ageRange.fifthAgeValue += 1;
        }

        var userBloodGroup = u.bloodGroup;
        switch (true) {
          case userBloodGroup === "A":
            that.bloodGroup.bloodAValue += 1;
            break;
          case userBloodGroup === "B":
            that.bloodGroup.bloodBValue += 1;
            break;
          case userBloodGroup === "AB":
            that.bloodGroup.bloodABValue += 1;
            break;
          case userBloodGroup === "O":
            that.bloodGroup.bloodOValue += 1;
        }
      });
      that.setItemToLocalStorage();
      that.setDataValue();
    },

    /* 
  This is the function used to set the 
  data gotten from the Firebase Database 
  or Local Storage to the Form Series
   */

    setDataValue() {
      this.chartOptions.series[0].data = [0, 0];

      this.chartOptions.series[0].data[0] = this.ageRange.fifthAgeValue;
      this.chartOptions.series[1].data[0] = this.ageRange.fourthAgeValue;
      this.chartOptions.series[2].data[0] = this.ageRange.thirdAgeValue;
      this.chartOptions.series[3].data[0] = this.ageRange.secondAgeValue;
      this.chartOptions.series[4].data[0] = this.ageRange.firstAgeValue;

      this.chartOptions.series[5].data[1] = this.bloodGroup.bloodOValue;
      this.chartOptions.series[6].data[1] = this.bloodGroup.bloodABValue;
      this.chartOptions.series[7].data[1] = this.bloodGroup.bloodBValue;
      this.chartOptions.series[8].data[1] = this.bloodGroup.bloodAValue;
    },
    /* 
  This is the function used to set 
  the data to the Local Storage
   */
    setItemToLocalStorage() {
      localStorage.ageRange = JSON.stringify(this.ageRange);
      localStorage.bloodGroup = JSON.stringify(this.bloodGroup);
    }
  }
};
</script>

<style lang="scss">
  #app {
    margin-right: 10;
    margin-left: 10;
    padding-bottom: 0;
  }
</style>

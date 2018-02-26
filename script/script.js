var survival_canvas = document.getElementById("survival_canvas");
/* survival data */
var survival_data = {
    "High Risk": 423,
    "Mid Risk": 674,
    "Low Risk": 849,
    "No Risk": 338,
}

var survival_options = {
    data: survival_data,
    colors: ["#027b8d", "#01b7be", "#18bd9f", "#00e9be"],
    canvas: survival_canvas,
    padding: 15
}

/* GAME STATUS data */
var data = {
    vip: {
        Churner: {
            num: "4,226",
            color:"rgba(2,123,141, 1)"
        },
        Active: {
            num: "1,983",
            color: "rgba(2,123,141, 0.85)"
        },
        Total: {
            num: "6,209",
            color: "rgba(2,123,141, 0.75)"
        }
    },

    paying: {
        Churner: {
            num: "26,244",
            color:"rgba(1,183,190, 1)"
        },
        Active: {
            num: "858",
            color: "rgba(1,183,190, 0.85)"
        },
        Total: {
            num: "27,102",
            color: "rgba(1,183,190, 0.75)"
        }
    },

    free: {
        Churner: {
            num: "2,059,913",
            color:"rgba(24,189,159, 1)"
        },
        Active: {
            num: "14,006",
            color: "rgba(24,189,159, 0.85)"
        },
        Total: {
            num: "2,073,919",
            color: "rgba(24,189,159, 0.75)"
        }
    }
}

/* intialization */

// draw circle
createChart();

$(window).on('resize', () => {
    createChart();
});

// draw bar chart
var survivalChart = new BarChart(survival_options);
survivalChart.draw();

$(window).on('resize', () => {
    survivalChart.draw();
});


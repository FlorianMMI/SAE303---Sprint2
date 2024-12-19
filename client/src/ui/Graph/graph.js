import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


import { Lycees } from "../../data/data-lycees.js";

let graph = function(div){


    am5.ready(function() {


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(div);
        
        var temp = Lycees.getdpt();
        
        var myTheme = am5.Theme.new(root);
        
        myTheme.rule("Grid", ["base"]).setAll({
          strokeOpacity: 0.1
        });
        
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
        
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panY",
          wheelY: "zoomY",
          paddingLeft: 0,
          layout: root.verticalLayout
        }));
        
        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarY", am5.Scrollbar.new(root, {
          orientation: "vertical"
        }));
        

        var data = [];
        for (let i = 0; i < temp.length; i++){

            data.push({
                department: temp[i].libelle_departement,
                postBacs: temp[i].candidatsPostBac,
                general: temp[i].candidatsGenerale,
                sti2d: temp[i].candidatsSTI2D,
                others: temp[i].candidatsAutre
            });
        }

        
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var yRenderer = am5xy.AxisRendererY.new(root, {});
        var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "department",
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        yRenderer.grid.template.setAll({
          location: 1
        })
        
        yAxis.data.setAll(data);
        
        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
          min: 0,
          maxPrecision: 0,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 40,
            strokeOpacity: 0.1
          })
        }));
        
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }));
        
        
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: "department"
          }));
        
          series.columns.template.setAll({
            tooltipText: "{name}, {categoryY}: {valueX}",
            tooltipY: am5.percent(90)
          });
          series.data.setAll(data);
        
          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();
        
          series.bullets.push(function () {
            return am5.Bullet.new(root, {
              sprite: am5.Label.new(root, {
                text: "{valueX}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true
              })
            });
          });
        
          legend.data.push(series);
        }
        
        makeSeries("Post Bacs", "postBacs");
        makeSeries("General", "general");
        makeSeries("STI2D", "sti2d");
        makeSeries("Others", "others");
        
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        
        }); // end am5.ready()



} 

import {test} from "../RenderLycee/index.js";

console.log(test);
export { graph };
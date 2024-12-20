import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { Lycees } from "../../data/data-lycees.js";

let root; // Variable pour stocker l'instance root

let graph = function(div, value, temp){

    // Disposer de l'ancien graphique si existant
    if (root) {
        root.dispose();
    }

    am5.ready(function() {

        // Créer l'élément root
        root = am5.Root.new(div);

        console.log("ceci est root", temp);
        
        var myTheme = am5.Theme.new(root);
        
        myTheme.rule("Grid", ["base"]).setAll({
          strokeOpacity: 0.1
        });
        
        // Définir les thèmes
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
        
        // Créer le graphique
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panY",
          wheelY: "zoomY",
          paddingLeft: 0,
          layout: root.verticalLayout
        }));
        
        // Ajouter la barre de défilement
        chart.set("scrollbarY", am5.Scrollbar.new(root, {
          orientation: "vertical"
        }));
        
        var data = [];
        let otherDept = {
            department: "Autre",
            postBacs: 0,
            general: 0,
            sti2d: 0,
            others: 0
        };
    
        console.log("ceci est value", value);
    
        for (let i = 0; i < temp.length ; i++) {
          console.log("ceci est temp", temp[i]);
            const total = temp[i].candidatsPostBac + temp[i].candidatsGenerale + temp[i].candidatsSTI2D + temp[i].candidatsAutre;
            
            if (total < value) {
                otherDept.postBacs += temp[i].candidatsPostBac;
                otherDept.general += temp[i].candidatsGenerale;
                otherDept.sti2d += temp[i].candidatsSTI2D;
                otherDept.others += temp[i].candidatsAutre;
            } else {
                data.push({
                    department: temp[i].libelle_departement,
                    postBacs: temp[i].candidatsPostBac,
                    general: temp[i].candidatsGenerale,
                    sti2d: temp[i].candidatsSTI2D,
                    others: temp[i].candidatsAutre
                });
            }
        }
    
        if (otherDept.postBacs || otherDept.general || otherDept.sti2d || otherDept.others) {
            data.push(otherDept);
        }
        
        // Créer les axes
        var yRenderer = am5xy.AxisRendererY.new(root, {});
        var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "department",
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        yRenderer.grid.template.setAll({
          location: 1
        });
        
        yAxis.data.setAll(data);
        
        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
          min: 0,
          maxPrecision: 0,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 40,
            strokeOpacity: 0.1
          })
        }));
        
        // Ajouter la légende
        var legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }));
        
        // Ajouter les séries
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
        
          // Animer les séries au chargement
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
        
        // Animer le graphique au chargement
        // chart.appear(1000, 100);
        
    }); // fin am5.ready()
}
 
export { graph };
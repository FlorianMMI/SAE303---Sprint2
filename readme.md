Installer am chart : 
npm install @amcharts/amcharts5
npm install @amcharts/amcharts5-geodata
npm install @amcharts/amcharts5-fonts

Commande github : 


Crée une nouvelle branche --> 

git checkout -b iteration1 //création
git push -u origin iteration1 //push vers le git 
git branch //verifie la bonne integralité de la branche


Switch de branche --> 


Après commit : git push origin iterationX

git checkout iterationX
git pull origin iterationX



Commande SQL : 

Itearation 4 

SELECT 
    p.product_name,
    oi.product_id,
    SUM(oi.quantity) AS total_sales
FROM 
    OrderItems oi
JOIN 
    Orders o ON oi.order_id = o.id
JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    o.order_date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
GROUP BY 
    oi.product_id, p.product_name
ORDER BY 
    total_sales DESC
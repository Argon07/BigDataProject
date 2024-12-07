from pyspark.sql import SparkSession
from pyspark.sql.functions import sum, avg, col

# Step 1: Initialize Spark Session
spark = SparkSession.builder.appName('WalmartSalesAnalysis').getOrCreate()

# Step 2: Load the Dataset (Choose the dataset you want to process)
data = spark.read.csv('datasets/monthlySales.csv', header=True, inferSchema=True)

# Step 3: Process the Data
# Example: Aggregate sales by year and month
processed_data = data.groupBy('Year', 'Month').agg(
    sum('Total_Sales').alias('Monthly_Sales')
)

# Step 4: Show Processed Data (Optional)
processed_data.show()

# Step 5: Save the Processed Data to CSV
processed_data.write.csv('datasets/processed_monthly_sales', header=True)

print("Data processing complete. Processed file saved as 'datasets/processed_monthly_sales'")

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, year, month, sum, avg, when, date_format
from pyspark.sql.functions import to_date, when, col

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("Walmart Sales Analysis") \
    .getOrCreate()

# Load the dataset
file_path = "datasets/Walmart.csv"

df = spark.read.csv(file_path, header=True, inferSchema=True)

# Display the schema
#df.printSchema()



# Set the legacy time parser policy
spark.conf.set("spark.sql.legacy.timeParserPolicy", "LEGACY")

# Now process your DataFrame as before
df_cleaned = df.withColumn(
    "Date",
    when(col("Date").contains("-"), to_date(col("Date"), "dd-MM-yyyy"))
    .otherwise(to_date(col("Date"), "MM/dd/yyyy"))
)

df_cleaned = df_cleaned.dropDuplicates()
#df_cleaned.show(n=100, truncate=False)



# Convert Date column to date format and extract Year and Month
df_trends = df_cleaned.withColumn("Date", to_date(col("Date"), "yyyy-MM-dd")) \
                      .withColumn("Year", year(col("Date"))) \
                      .withColumn("Month", month(col("Date")))

# Show transformed data
#df_trends.show()
monthly_sales = df_trends.groupBy("Year", "Month").agg(
    sum("Weekly_Sales").alias("Total_Sales")
)

# Show monthly sales trends
#monthly_sales.show()
output_path1 = "datasets/monthlySales.csv"
monthly_sales.write.csv(output_path1, header=True)
#monthly_sales.write.csv(output_path1, header=True, mode="overwrite")

yearly_sales = df_trends.groupBy("Year").agg(
    sum("Weekly_Sales").alias("Total_Sales")
)

# Show yearly sales trends
#yearly_sales.show()
output_path2 = "datasets/yearlySales.csv"
yearly_sales.write.csv(output_path2, header=True)

top_stores = df_cleaned.groupBy("Store").agg(
    sum("Weekly_Sales").alias("Total_Sales")
).orderBy(col("Total_Sales").desc())

# Display top 10 stores
#top_stores.show(10)
output_path3 = "datasets/topSales.csv"
top_stores.write.csv(output_path3, header=True)


holiday_impact = df_cleaned.groupBy("Holiday_Flag").agg(
    sum("Weekly_Sales").alias("Total_Sales"),
    avg("Weekly_Sales").alias("Average_Sales")
)

# Display impact
#holiday_impact.show()
output_path4 = "datasets/holidaySales.csv"
holiday_impact.write.csv(output_path4, header=True)



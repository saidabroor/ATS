from src.components.data_ingestion import DataIngestion
from src.components.data_transformation import DataTransformation

# Run the pipeline
if __name__ == "__main__":
    ingestion = DataIngestion()
    train_data, test_data = ingestion.initiate_data_ingestion()

    transformation = DataTransformation()
    transformation.initiate_data_transformation(train_data, test_data)
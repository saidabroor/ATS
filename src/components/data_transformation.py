import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

from src.exception import CustomException
from src.logger import logging
from src.utils import save_object

import sys
from dataclasses import dataclass
import os

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path = os.path.join('artifacts', 'preprocessor.pkl')

class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def get_data_transformation_object(self, numerical_columns, categorical_columns):
        try:
            # Numerical pipeline: impute missing with median, then scale features
            num_pipeline = Pipeline(steps=[
                ('imputer', SimpleImputer(strategy='median')),
                ('scaler', StandardScaler())
            ])
            logging.info(f'Numerical pipeline created for columns: {numerical_columns}')

            # Categorical pipeline: impute missing with most frequent, then one-hot encode
            cat_pipeline = Pipeline(steps=[
                ('imputer', SimpleImputer(strategy='most_frequent')),
                ('onehot', OneHotEncoder(handle_unknown='ignore'))
            ])
            logging.info(f'Categorical pipeline created for columns: {categorical_columns}')

            # Combine pipelines into a preprocessor for numerical and categorical columns
            preprocessor = ColumnTransformer(transformers=[
                ('num_pipeline', num_pipeline, numerical_columns),
                ('cat_pipeline', cat_pipeline, categorical_columns)
            ])

            return preprocessor

        except Exception as e:
            raise CustomException(e, sys)

    def initiate_data_transformation(self, train_path, test_path):
        try:
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)
            logging.info('Train and test data read successfully.')

            target_column_name = 'pass_screening'

            # Select numerical and categorical columns excluding the target
            numerical_columns = train_df.select_dtypes(include=['int64', 'float64']).columns.tolist()
            categorical_columns = train_df.select_dtypes(include=['object']).columns.tolist()

            numerical_columns = [col for col in numerical_columns if col != target_column_name]
            categorical_columns = [col for col in categorical_columns if col != target_column_name]

            preprocessing_obj = self.get_data_transformation_object(numerical_columns, categorical_columns)

            # Separate input features and target
            input_feature_train_df = train_df.drop(columns=[target_column_name], axis=1)
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(columns=[target_column_name], axis=1)
            target_feature_test_df = test_df[target_column_name]

            # ======= NEW: Drop rows with NaN in target column for train =======
            # Combine X and y temporarily to drop any rows where y is NaN
            train_combined = pd.concat([input_feature_train_df, target_feature_train_df], axis=1)
            train_combined = train_combined.dropna(subset=[target_column_name])
            # Separate back after dropping NaNs in target
            input_feature_train_df = train_combined.drop(columns=[target_column_name])
            target_feature_train_df = train_combined[target_column_name]

            # ======= NEW: Same for test data =======
            test_combined = pd.concat([input_feature_test_df, target_feature_test_df], axis=1)
            test_combined = test_combined.dropna(subset=[target_column_name])
            input_feature_test_df = test_combined.drop(columns=[target_column_name])
            target_feature_test_df = test_combined[target_column_name]
            # ================================================================

            # Fit and transform training features, transform test features
            input_feature_train_arr = preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr = preprocessing_obj.transform(input_feature_test_df)

            # Combine processed features and target arrays horizontally
            train_arr = np.c_[input_feature_train_arr, target_feature_train_df]
            test_arr = np.c_[input_feature_test_arr, target_feature_test_df]

            # Save preprocessing object for later use (e.g., model deployment)
            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )
            logging.info('Preprocessing object saved successfully.')

            # Return processed arrays and path to saved preprocessor
            return train_arr, test_arr, self.data_transformation_config.preprocessor_obj_file_path

        except Exception as e:
            raise CustomException(e, sys)

import os
import sys

from dataclasses import dataclass

from catboost import CatBoostClassifier
from sklearn.ensemble import (
  AdaBoostClassifier,
  GradientBoostingClassifier,
  RandomForestClassifier
)

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import r2_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

from src.exception import CustomException
from src.logger import logging
from src.utils import save_object, evaluate_models

@dataclass
class ModelTrainerConfig:
  trained_model_file_path = os.path.join("artifacts", "model.pkl")

class ModelTrainer:
  def __init__(self):
    self.model_trainer_config = ModelTrainerConfig()

  def initiate_model_trainer(self, train_array, test_array):
    try:
      logging.info("Splitting train and test input data")
      x_train, y_train, x_test, y_test = (
        train_array[:,:-1],
        train_array[:,-1],
        test_array[:,:-1],
        test_array[:,-1]
      )

      models = {
        "Random Forest" : RandomForestClassifier(),
        "Decision Tree" : DecisionTreeClassifier(),
        "Gradient Boosting" : GradientBoostingClassifier(),
        "Linear Regression" : LogisticRegression(),
        "K-Neighbors Classifier" : KNeighborsClassifier(),
        "XGBClassier" : XGBClassifier(),
        "CatBoosting Classifier" : CatBoostClassifier(),
        "Adaboost Regressor" : AdaBoostClassifier(),
      }


      model_report:dict=evaluate_models(x_train=x_train, y_train=y_train, x_test=x_test, y_test=y_test, models=models)

      # to get the best model score from dict
      best_model_score = max(sorted(model_report.values()))

      # to get best model name from dict

      best_model_name = list(model_report.keys())[
        list(model_report.values()).index(best_model_score)
      ]
      
      best_model = models[best_model_name]

      if best_model_score < 0.6:
        raise CustomException('No best model found')
      logging.info('Best found model on both training and testing datasets.')

      save_object(
        file_path = self.model_trainer_config.trained_model_file_path,
        obj = best_model
      )

      predicted = best_model.predict(x_test)
      r2_square = r2_score(y_test, predicted)
      return r2_square

    except Exception as e:
      raise CustomException(e, sys)





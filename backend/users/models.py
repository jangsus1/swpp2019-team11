from django.db import models
from django.contrib.auth.models import AbstractUser
 
# Create your models here.
class SurBingUser(AbstractUser):
    cart = models.ForeignKey('surBing.Cart', on_delete=models.PROTECT,
                             related_name='cart', blank=True, null=True)
    participating = models.ManyToManyField('surBing.SurveyOngoing', related_name = 'participant')
    participated = models.ManyToManyField('surBing.Survey', related_name='participant')

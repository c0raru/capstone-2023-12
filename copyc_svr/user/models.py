from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.contrib.sessions.models import Session
from django.db.models.deletion import SET_NULL
# from subscribs.models import Subscribs

from fileserver.models import File


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('Users must have an email')
        user = self.model(
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username=username,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField("아이디", max_length=100, unique=True)
    email = models.CharField("이메일", max_length=100, unique=True)
    fullname = models.CharField("이름", max_length=100)

    is_admin = models.BooleanField("어드민", default=False)
   
    objects = UserManager()
    coin = models.IntegerField("코인", default=1000)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.OneToOneField(Session, on_delete=models.CASCADE)
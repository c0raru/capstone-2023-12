# Generated by Django 3.2.9 on 2021-12-04 09:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fileserver', '0002_alter_file_attached'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='purpose',
            field=models.CharField(blank=True, choices=[('FEED', '피드')], default='', max_length=20, verbose_name='용도'),
        ),
        migrations.AddField(
            model_name='file',
            name='uploader',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
# Generated by Django 3.0 on 2023-05-19 12:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_auto_20230519_2121'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productimage',
            name='attached',
        ),
    ]
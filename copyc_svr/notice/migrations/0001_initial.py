# Generated by Django 3.0 on 2022-02-05 21:09

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, verbose_name='공지사항 이름')),
                ('contents', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='상품내용')),
                ('fixed', models.BooleanField(default=False, verbose_name='상위 고정 여부')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='등록일')),
            ],
            options={
                'verbose_name_plural': '공지사항',
            },
        ),
    ]
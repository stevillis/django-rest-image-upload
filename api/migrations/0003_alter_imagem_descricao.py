# Generated by Django 4.0.1 on 2022-01-23 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_foto_imagem_imagem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagem',
            name='descricao',
            field=models.CharField(max_length=100),
        ),
    ]
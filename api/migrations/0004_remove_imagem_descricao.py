# Generated by Django 4.0.1 on 2022-01-23 22:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_imagem_descricao"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="imagem",
            name="descricao",
        ),
    ]

# Generated by Django 4.2.3 on 2023-07-17 09:33

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("readit_api", "0002_post"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="post",
            options={"ordering": ["created_on", "title"]},
        ),
    ]
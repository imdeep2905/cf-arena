# Generated by Django 3.1.7 on 2021-03-27 21:50

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('arena', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_handle_1', models.TextField()),
                ('user_handle_2', models.TextField(blank=True, null=True)),
                ('room_id', models.UUIDField(default=uuid.uuid4, editable=False)),
            ],
        ),
    ]

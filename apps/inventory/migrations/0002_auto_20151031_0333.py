# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag', models.CharField(max_length=32)),
            ],
        ),
        migrations.AddField(
            model_name='item',
            name='location',
            field=models.CharField(default=datetime.datetime(2015, 10, 31, 3, 33, 46, 41515, tzinfo=utc), max_length=32),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='itemtag',
            name='item',
            field=models.ForeignKey(to='inventory.Item'),
        ),
    ]

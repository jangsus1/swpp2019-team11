# Generated by Django 2.2.6 on 2019-12-03 18:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surBing', '0002_auto_20191202_1509'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='related_survey1',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='pointed_mostly_related', to='surBing.Survey'),
        ),
        migrations.AddField(
            model_name='survey',
            name='related_survey2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='pointed_secondly_related', to='surBing.Survey'),
        ),
        migrations.AddField(
            model_name='survey',
            name='similartiy1',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='survey',
            name='similartiy2',
            field=models.IntegerField(default=0),
        ),
    ]
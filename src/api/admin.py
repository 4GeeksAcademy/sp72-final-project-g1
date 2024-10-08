import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Games, GameCharacteristics, Platforms, Favorites, SocialAccounts, Comments, Media, Stores


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'

    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))  # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
    admin.add_view(ModelView(Games, db.session))
    admin.add_view(ModelView(GameCharacteristics, db.session))
    admin.add_view(ModelView(Platforms, db.session))
    admin.add_view(ModelView(Stores, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(SocialAccounts, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Media, db.session))

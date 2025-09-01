"""
User Profile Model

This model represents a user profile for the Enough app.
Fields:
- username: Unique identifier for each user.
- bio: Short bio or description set by the user.
- profile_picture_url: Link to the user's profile image.
- privacy_settings: Controls who can see the profile ('public' or 'private').
- additional fields can be added as needed.
"""

class UserProfile:
    def __init__(self, username, bio="", profile_picture_url="", privacy_settings="public"):
        self.username = username
        self.bio = bio
        self.profile_picture_url = profile_picture_url
        self.privacy_settings = privacy_settings

    def edit_bio(self, new_bio):
        self.bio = new_bio

    def update_profile_picture(self, new_url):
        self.profile_picture_url = new_url

    def set_privacy(self, setting):
        if setting in ["public", "private"]:
            self.privacy_settings = setting

    def __repr__(self):
        return (f"UserProfile(username={self.username}, bio={self.bio}, "
                f"profile_picture_url={self.profile_picture_url}, privacy_settings={self.privacy_settings})")
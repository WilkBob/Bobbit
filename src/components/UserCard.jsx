import React, { useContext, useState } from "react";
import { Avatar, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { UserContext } from "./context/UserContext";
import { uploadImage } from "../Firebase/firebaseStorage";
import { updateUser } from "../Firebase/Users";
import UserCardAvatar from "./UserCardAvatar";

export function UserCard({ displayUser }) {
  const { user, userDetails } = useContext(UserContext);
  const isCurrentUser = displayUser?.uid === user?.uid;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(displayUser?.username);
  const [bio, setBio] = useState(displayUser?.bio);
  const [profileImage, setProfileImage] = useState(null);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };
//todo take upload image up to firebaseDB, use it to update user profile image across all posts and comments
  const  handleSubmit = async () => {
    setIsEditing(false);
    const imageurl = profileImage ? await uploadImage(profileImage, user.uid) : userDetails.profileImage ? userDetails.profileImage : 'n';
    const updates = {
      username,
      bio,
      profileImage: imageurl
    };
    await updateUser(user.uid, updates);
    
  };

  return (
    <Card sx={{ marginBottom: '10px' }}>
      <CardContent>
       {displayUser.profileImage && <UserCardAvatar src={displayUser.profileImage} />}
       {!displayUser.profileImage && <Avatar sx={{ width: 200, height: 200, marginInline:'auto' }}><Typography variant="h1">{displayUser.username.slice(0, 2)}</Typography></Avatar>}
        {isEditing ? (
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxWidth: '300px',
            }}
          >
            <input type="file" accept="image*/" onChange={handleImageChange} style={{ display: 'none' }} id="upload-button" />
            <label htmlFor="upload-button">
              <Button component="span" disabled={profileImage !== null}>
                {profileImage ? `${profileImage.name}` : 'Upload Profile Image'}
              </Button>
            </label>
            <TextField label={'Change Username'} value={username} onChange={handleUsernameChange} />
            <TextField label={'Change Bio'} value={bio} onChange={handleBioChange} multiline />

            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        ) : (
          <>
            <Typography variant="h5" component="div">{username}</Typography>
            <Typography variant="body2" color="text.secondary">{bio}</Typography>
            <Typography variant="body2" color="text.secondary">
              {displayUser?.joined
                ? `Joined ${new Date(displayUser.joined).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}`
                : 'Loading...'}
            </Typography>
          </>
        )}
        {isCurrentUser && (
         <Button onClick={handleEditProfile}>{isEditing ? 'Close' : 'Edit Profile'}</Button>
        )}
      </CardContent>
    </Card>
  );
}
import { db } from './firebaseDB';
import { get, ref, set, update } from 'firebase/database';
import uniqueid from '../utility/UniqueId';




export const getUser = async (id) => {
    const user = await get(ref(db, `users/${id}`));
    return user.val();
}

export const updateUser = async (id, updates) => {
    await update(ref(db, `users/${id}`), updates);
    const updatedUser = await getUser(id);
    return updatedUser;
}

export const deleteUser = async (id) => {
    await update(ref(db, `users/${id}`), {
        deleted: true
    });

}

export const toggleLike = async (userId, postId) => {
    const postRef = ref(db, `posts/${postId}`);
    const userRef = ref(db, `users/${userId}`);
    const post = await get(postRef);
    const user = await get(userRef);
    const postLikes = post.val().likes || {};
    const userLikes = user.val().likes || {};
  
    if (postLikes[userId]) {
      delete postLikes[userId];
      delete userLikes[postId];
    } else {
      postLikes[userId] = userId;
      userLikes[postId] = postId;
    }
  
    const updates = {};
    updates[`/posts/${postId}/likes`] = postLikes;
    updates[`/users/${userId}/likes`] = userLikes;
  
    await update(ref(db), updates);
  }

export const getLikedPosts = async (userId) => {
    const user = await get(ref(db, `users/${userId}`));
    const likedPosts = user.val().likes;
    const posts = await get(ref(db, 'posts'));
    const likedPostList = [];
    for (const postId in likedPosts) {
        likedPostList.push(posts.val()[postId]);
    }
    return likedPostList;
}

export const getPostsByUser = async (userId) => {
    const user = await get(ref(db, `users/${userId}`));
    const userPosts = user.val().posts;
    const posts = await get(ref(db, 'posts'));
    const userPostList = [];
    for (const postId in userPosts) {
        userPostList.push(posts.val()[postId]);
    }
    return userPostList;
}
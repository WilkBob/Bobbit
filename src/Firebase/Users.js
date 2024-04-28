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

export const toggleLike = async (userId, postId, forumId) => {
    const postRef = ref(db, `posts/${forumId}/${postId}`);
    const userRef = ref(db, `users/${userId}`);
    const postSnapshot = await get(postRef);
    const userSnapshot = await get(userRef);

    // Check if post and user are not null
    if (!postSnapshot.exists() || !userSnapshot.exists()) {
        console.error('Post or user does not exist');
        return;
    }

    const post = postSnapshot.val();
    const user = userSnapshot.val();
    const postLikes = post.likes || {};
    const userLikes = user.likes || {};

    if (postLikes[userId]) {
        delete postLikes[userId];
        delete userLikes[postId];
    } else {
        postLikes[userId] = userId;
        userLikes[postId] = postId;
    }

    const updates = {};
    updates[`/posts/${forumId}/${postId}/likes`] = postLikes;
    updates[`/users/${userId}/likes`] = userLikes;

    await update(ref(db), updates);
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
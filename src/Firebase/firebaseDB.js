import {app} from './firebase';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import uniqueid from '../utility/UniqueId';
import { uploadImage } from './firebaseStorage';
const db = getDatabase(app);

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

// posts
export const getPost = async (id) => {
  const post = await get(ref(db, `posts/${id}`));
  console.log(post.val());
  return post.val();
}

export const addPost = async ({ title, content, userId, username, userImage, forum, image, link }) => {
  const id = uniqueid();
  const imageUrl = image ? await uploadImage(image, id) : null;
  const newPost = {
    forum,
    title,
    content,
    userId,
    username,
    userImage: userImage || null,
    image: imageUrl || null,
    link: link || null,
    id,
    timestamp: Date.now()
  }
  await set(ref(db, `posts/${id}`), newPost);
  await update(ref(db, `users/${userId}/posts`), {
    [id]: id
  });
  await toggleLike(userId, id);

  return id;
};

export const updatePost = async (id, title, content, image, link) => {
    const updates = {
        title,
        content,
        image: image || null,
        link: link || null,
        timestamp: Date.now()
    }
    await update(ref(db, `posts/${id}`), updates);
}

export const deletePost = async (id) => {
    await update(ref(db, `posts/${id}`), {
        deleted: true
    });
}

export const getPosts = async () => {
    const posts = await get(ref(db, 'posts'));
  
    return Object.values(posts.val());
}


// users --most will be in auth--

export const getUser = async (id) => {
    const user = await get(ref(db, `users/${id}`));
    return user.val();
}

export const updateUser = async (id, updates) => {
    await update(ref(db, `users/${id}`), updates);
}

export const deleteUser = async (id) => {
    await update(ref(db, `users/${id}`), {
        deleted: true
    });
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

// comments
export const getComment = async (id) => {
    const comment = await get(ref(db, `comments/${id}`));
    return comment.val();
}

export const addComment = async (content, username, userId, postId, userImage, image) => {
    const imageUrl = image ? await uploadImage(image, postId) : null;
    const id = uniqueid();
    const newComment = {
        content,
        userId,
        postId,
        id,
        imageUrl: imageUrl || null,
        timestamp: Date.now(),
        username,
        userImage
    }
    await set(ref(db, `comments/${id}`), newComment);
    await update(ref(db, `posts/${postId}/comments`), {
        [id]: id
    });
    await update(ref(db, `users/${userId}/comments`), {
        [id]: id
    });
    return id;
}

export const getCommentsByPost = async (postId) => {
    const post = await get(ref(db, `posts/${postId}`));
    const comments = post.val().comments;
    const commentList = [];
    for (const commentId in comments) {
        const comment = await getComment(commentId);
        commentList.push(comment);
    }
    return commentList;
}

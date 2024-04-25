import {app} from './firebase';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import uniqueid from '../utility/UniqueId';
const db = getDatabase(app);



// posts
export const getPost = async (id) => {
  const post = await get(ref(db, `posts/${id}`));
  return post.val();
}

export const addPost = async ({ title, content, userId, username, forum, image, link }) => {
  const id = uniqueid();
  const newPost = {
    forum,
    title,
    content,
    userId,
    username,
    image: image || null,
    link: link || null,
    id,
    timestamp: Date.now()
  }
  await set(ref(db, `posts/${id}`), newPost);
  await update(ref(db, `users/${userId}/posts`), {
    [id]: id
  });
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
    return posts.val();
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


// comments
export const getComment = async (id) => {
    const comment = await get(ref(db, `comments/${id}`));
    return comment.val();
}

export const addComment = async (content, userId, postId) => {
    const id = uniqueid();
    const newComment = {
        content,
        userId,
        postId,
        id,
        timestamp: Date.now()
    }
    await set(ref(db, `comments/${id}`), newComment);
    await update(ref(db, `posts/${postId}/comments`), {
        [id]: id
    });
    return id;
}

import {app} from './firebase';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import uniqueid from '../utility/UniqueId';
const db = getDatabase(app);



// posts
export const getPost = async (id) => {
  const post = await get(ref(db, `posts/${id}`));
  return post.val();
}

export const addPost = async (title, content, userId, username, image, link, forum) => {
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
    }

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

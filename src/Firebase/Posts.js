import { db } from './firebaseDB';
import { get, ref, set, update, remove, child } from 'firebase/database';
import uniqueid from '../utility/UniqueId';
import { uploadImage, deleteImage } from './firebaseStorage';
import { toggleLike } from './Users';


export const getPost = async (id, forumId) => {
    const post = await get(ref(db, `posts/${forumId}/${id}`));
    console.log(post.val());
    return post.val();
  }
  
  export const addPost = async ({ title, content, userId, username, userImage, forumId, image, link }) => {
    const id = uniqueid();
    const imageUrl = image ? await uploadImage(image, id) : null;
    const forum = await get(ref(db, `forums/${forumId}`));
    const forumName = forum.val().name;
    const newPost = {
      forumId,
      forumName, 
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
    await set(ref(db, `forums/${forumId}/posts/${id}`), id);
    await set(ref(db, `posts/${forumId}/${id}`), newPost);
    await update(ref(db, `users/${userId}/posts`), {
      [id]: id
    });
    await toggleLike(userId, id, forumId);
  
    return id;
  };
  
  export const updatePost = async (id, title, content, userImage, forumId, image, link, ) => {
      const updates = {
          title,
          content,
          link: link || null,
          userImage: userImage || null,
          edited: true
      }
      if (image) {
          const imageUrl = await uploadImage(image, id);
          updates.image = imageUrl;
      }
      await update(ref(db, `posts/${forumId}/${id}`), updates);
      const post = await getPost(id);
      return post;
  }
  
  export const deletePost = async (id, forumId) => {
      const postRef = ref(db, `posts/${forumId}/${id}`);
      const post = await get(postRef);
      const userId = post.val().userId;
      const userRef = ref(db, `users/${userId}`);
      if (post.val().image) {
          await deleteImage(id);
      }
      await remove(ref(db, `forums/${forumId}/posts/${id}`));
      await remove(postRef);
      await remove(child(userRef, `posts/${id}`));
  }
  
 export const getAllPosts = async () => {
    const forums = await get(ref(db, 'forums'));
    const postsList = [];
    const forumsList = Object.values(forums.val());
    for (const forum of forumsList) {
      const forumPosts = await getPostsByForum(forum.id);
      if (forumPosts){
      postsList.push(...forumPosts);
      }else{
        continue;
      }

    }
    return postsList;
  }

  export const getPostsByForum = async (forumId) => {
    const postsSnapshot = await get(ref(db, `posts/${forumId}`));
    const postsVal = postsSnapshot.val();
    return postsVal ? Object.values(postsVal) : [];
}
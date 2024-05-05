import { db } from './firebaseDB';
import { get, ref, set, update, remove, child } from 'firebase/database';
import uniqueid from '../utility/UniqueId';
import { uploadImage, deleteImage } from './firebaseStorage';

export const getComment = async (postId, commentId) => {
    const comment = await get(ref(db, `comments/${postId}/${commentId}`));
    return comment.val();
};

export const toggleCommentLike = async (userId, commentId, postId) => {
    const commentRef = ref(db, `comments/${postId}/${commentId}/likes`);
    const userRef = ref(db, `users/${userId}/CommentLikes`);
    const commentLikes = (await get(commentRef)).val() || {};
    const userLikes = (await get(userRef)).val() || {};

    if (commentLikes[userId]) {
        commentLikes[userId] = null;
        userLikes[commentId] = null;
    } else {
        commentLikes[userId] = true;
        userLikes[commentId] = true;
    }

    await update(commentRef, commentLikes);
    await update(userRef, userLikes);
};

export const addComment = async (
    content,
    username,
    userId,
    postId,
    userImage,
    forumId,
    image
) => {
    const id = uniqueid();
    const imageUrl = image ? await uploadImage(image, id) : null;
    const newComment = {
        content,
        userId,
        postId,
        id,
        imageUrl: imageUrl || null,
        timestamp: Date.now(),
        username,
        userImage,
        forumId,
    };
    await set(ref(db, `comments/${postId}/${id}`), newComment);
    await update(ref(db, `posts/${forumId}/${postId}/comments`), { [id]: id });
    await update(ref(db, `users/${userId}/comments`), { [id]: id });
    await toggleCommentLike(userId, id, postId, forumId);
    return newComment;
};

export const getCommentsByPost = async (postId) => {
    const commentsRef = await get(ref(db, `comments/${postId}`));
    const comments = commentsRef.val();
    const commentList = [];
    for (const commentId in comments) {
        const comment = await getComment(postId, commentId);
        commentList.push(comment);
    }
    return commentList;
};

export const updateComment = async (
    content,
    postId,
    commentId,
    image,
    userImage
) => {
    const updates = {
        content,
        edited: true,
        userImage: userImage || null,
    };
    if (image) {
        const imageUrl = await uploadImage(image, commentId);
        updates.imageUrl = imageUrl;
    }
    await update(ref(db, `comments/${postId}/${commentId}`), updates);
    const comment = await getComment(postId, commentId);
    return comment;
};

export const deleteComment = async (postId, commentId, userId) => {
    try {
        const commentRef = ref(db, `comments/${postId}/${commentId}`);
        if (!commentRef) {
            return { success: false, message: 'Comment reference not found.' };
        }
        const comment = await getComment(postId, commentId);
        if (comment.imageUrl) {
            await deleteImage(commentId);
        }
        const forumId = comment.forumId;
        const postRef = ref(db, `posts/${forumId}/${postId}`);
        const userRef = ref(db, `users/${userId}`);
        await remove(commentRef);
        await remove(child(postRef, `comments/${commentId}`));
        await remove(child(userRef, `comments/${commentId}`));

        return { success: true, message: 'Comment deleted successfully.' };
    } catch (error) {
        console.error('Error deleting comment: ', error);
        return { success: false, message: error.message };
    }
};
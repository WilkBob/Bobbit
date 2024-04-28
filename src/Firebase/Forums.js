

export const getForum = async (forumId) => {
    const forum = await get(ref(db, `forums/${forumId}`));
    return forum.val();
}

export const getForums = async () => {
    const forums = await get(ref(db, 'forums'));
    return forums.val();
}

export const addForum = async (name, description, image) => {
    const id = uniqueid();
    const newForum = {
        name,
        id,
        description,
        timestamp: Date.now(),
    }
    if (image) {
        const imageUrl = await uploadImage(image, id);
        newForum.image = imageUrl;
    }

    await set(ref(db, `forums/${id}`), newForum);
    return id;
}

export const updateForum = async (id, name, description, image) => {
    const updates = {
        name,
        description,
        edited: true
    }
    if (image) {
        const imageUrl = await uploadImage(image, id);
        updates.image = imageUrl;
    }
    await update(ref(db, `forums/${id}`), updates);
    const forum = await getForum(id);
    return forum;
}

export const deleteForum = async (id) => {
    const forumRef = ref(db, `forums/${id}`);
    if ((await get(forumRef)).val().image) {
        await deleteImage(id);
    }
    await remove(forumRef);
}

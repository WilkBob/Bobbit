import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import { onValue, ref } from 'firebase/database';
import { db } from '../Firebase/firebaseDB';
import SortButtons from '../components/SortButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { getForum } from '../Firebase/Forums';
import ForumCard from '../components/ForumCard';

const Forum = () => {
  const{id} = useParams();
  const [forum, setForum] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchForum = async () => {
  try {
    const forum = await getForum(id);
    setForum(forum);
  } catch (error) {
    navigate('/404');
  }
};

  useEffect(() => {
    fetchForum();
  }, []);

  useEffect(() => {
    const postsRef = ref(db, `posts/${id}`);
    const unsubscribe = onValue(postsRef, (snapshot) => {
      setPosts(Object.values(snapshot.val() || {}));
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);


  return (
    <>
      <ForumCard forum={forum} loading={loading}/>
      <AddPost forumId={id}/>
      <SortButtons posts={posts} setDisplayPosts={setDisplayPosts} />
      <DisplayPosts posts={displayPosts} loading={loading}/>
    </>
  )
}

export default Forum
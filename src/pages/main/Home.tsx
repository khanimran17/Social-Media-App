import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import Posts from './Posts'
import { useAuthState } from 'react-firebase-hooks/auth'

export interface Posts {
    id: string,
    title: string,
    description: string,
    userId: string,
    username: string
}

const Home = () => {
    const [postList, setPostList] = useState<Posts[] | null>(null)
    const postsRef = collection(db, 'posts')
    const [user] = useAuthState(auth);

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[]
        )
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            {user ? (
                postList?.map((post) => <Posts key={post.id} post={post} />)
            ) : (
                <p className="logged-out-message">Please login to see the posts.</p>
            )}
        </div>
    );
};

export default Home
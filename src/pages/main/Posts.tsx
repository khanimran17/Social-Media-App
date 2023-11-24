import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { Posts as Iposts } from './Home'
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Props {
    post: Iposts
}
interface Like {
    likeId: string,
    userId: string;
}

const Posts = (props: Props) => {
    const [likes, setLikes] = useState<Like[] | null>(null)
    const { post } = props
    const [user] = useAuthState(auth);

    const likesRef = collection(db, 'likes')

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getlikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }]
                )
            }
        } catch (err) {
            console.log(err)
        }
    }


    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where('userId', '==', user?.uid)
            )

            const likeToDeletedata = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeletedata.docs[0].id
            const likeToDelete = doc(db, 'likes', likeId)
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)


    useEffect(() => {
        getlikes()
    }, [])


    return (
        <div className="post">
            <div className='title'>
                <h1>{post.title}</h1>
            </div>
            <div className='description'>
                <p>{post.description}</p>
            </div>
            <div className='username'>
                <p>Post By: @{post.username}</p>
            </div>
            <div className='like-section'>
                <div className="response">
                    <button onClick={hasUserLiked ? removeLike : addLike}>
                        {hasUserLiked ? <>&#x2665;</> : <>&#x2661;</>}
                    </button>
                    <p>Likes: {likes ? likes.length : 0}</p>
                </div>
            </div>
        </div>
    )
}

export default Posts
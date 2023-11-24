import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import logo from 'E:/codes/React/social-media-app/src/images/logo3.png'

interface CreateFormData {
    title: string,
    description: string
}

const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must Add Title"),
        description: yup.string().required("You must Add description")
    })

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, 'posts')

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid
        });
        navigate('/');
    };

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <div className="form-image">
                    <img src={logo} alt=""/>
                    <h3>Create Post</h3>
                </div>
                <input type="text" placeholder="Title.." {...register('title')} />
                <p style={{ color: 'red' }}>{errors.title?.message}</p>
                <textarea placeholder="description.." {...register('description')} />
                <p style={{ color: 'red' }}>{errors.description?.message}</p>
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreateForm
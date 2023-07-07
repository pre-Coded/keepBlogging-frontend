import { useBlogContext } from "../../utils/BlogContext";
import { useNavigate } from "react-router-dom";


const SuggestedBlogCard = ( { data, imageData } ) => {
    const navigate = useNavigate();
    const blgctx = useBlogContext();

    const items = data.tags;

    return (
        <li onClick={() => {
            const combinedData = {
                blogData: data,
                imgData: imageData,
            }

            blgctx.handleSelectedBlog(combinedData);

            const suggested = blgctx.blogList.filter((blog) => blog.blogData.username === data.username);

            blgctx.handleSuggestedBlog(suggested);
            navigate(`/blogs/view/${data._id}`);

        }} className='w-full aspect-square inline-block cursor-pointer space-y-2'>
            <img src={`data:image/jpg;base64,${imageData}`} alt="alt" className='w-full aspect-square object-cover rounded-md' />

            <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-col space-y-2">
                    <div className='flex flex-row gap-2 text-xs'>
                        {items && items?.map((tag, index) => {
                            if (index === 0) return "";
                            return <span className='text-gray-500' key={index}>{tag}</span>;
                        })}
                    </div>
                    <p className='text-sm text-gray-200 whitespace-pre-wrap'>
                        {data.title}
                    </p>
                </div>

                <div className='flex flex-row cursor-pointer justify-self-end'>
                    <div className='text-xs text-gray-600 flex flex-col items-start justify-around'>
                        <span className='font-semibold'>{data.username}</span>
                        <span className='text-gray-600 text-xs'>{new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SuggestedBlogCard
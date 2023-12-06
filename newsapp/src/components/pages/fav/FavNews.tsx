
import { useSelector } from 'react-redux';
import Wish from './Wish';
import { useDarkMode } from '../../organisms/context/DarkModeContext';

const FavNews = () => {


    const { wishlistsItems } = useSelector((state) => state?.wishlists);

    console.log(wishlistsItems)

    const { isDarkMode } = useDarkMode();


    return (
        <>
        <div className={isDarkMode ? 'dark-mode text-white' : 'light-mode bg-white'}>
             <div className='' >
                <div className='container mx-auto px-2 py-3'>
                    <h1 className='text-4xl text-center py-5  '>My Fav</h1>
                    <div className='py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center'>
                        {
                            wishlistsItems?.map((wishlist: { _id: any; image?: string; title?: string; price?: number; category?: string; }) => {
                                return <Wish key={wishlist?._id} wishlist={wishlist} />
                            })
                        }
                    </div>
                </div>

            </div>
        </div>

           


        </>
    )
}

export default FavNews
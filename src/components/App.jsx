import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [querySearch, setQuerySearch] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!querySearch) {
          return;
        }
        setIsLoading(true);
        const getPhotos = await API.getPhotos(querySearch, page);

        if (getPhotos.total === 0) {
          toast.warn(`${querySearch} not found`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
          return;
        }
        if (page === 1) {
          toast.success(`${querySearch} found! Total: ${getPhotos.total}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTotal(getPhotos.total);
        }

        setPhotos(prevPhotos => [...prevPhotos, ...getPhotos.hits]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, querySearch]);

  const searchPhotos = ({ querySearch }) => {
    if (querySearch.trim() === '') {
      toast.warn('Field cannot be empty', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setQuerySearch(querySearch);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setTotal(total - API.PER_PAGE);
  };

  return (
    <>
      <Searchbar onSubmit={searchPhotos} />
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {isLoading && <Loader />}
      {total > 12 && <LoadMore onClick={loadMore} />}
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

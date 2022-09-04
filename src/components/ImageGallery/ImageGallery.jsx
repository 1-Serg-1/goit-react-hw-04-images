import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { ItemImage, ListImage } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photos }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [tags, setTags] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleModalLargeImage = (largeImageURL, tags) => {
    setLargeImage(largeImageURL);
    setTags(tags);
  };
  return (
    <>
      <ListImage>
        {photos.map(photo => {
          return (
            <ItemImage key={photo.id}>
              <ImageGalleryItem
                photo={photo}
                onShowPhoto={handleModalLargeImage}
                onClick={toggleModal}
              />
            </ItemImage>
          );
        })}
      </ListImage>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

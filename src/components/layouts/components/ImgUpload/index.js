import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { LoadingOutlined, CameraFilled } from '@ant-design/icons';
import axios from 'axios';
import './style.css'

const ImgUpload = ({ onImageUpload, imageUrl, setImageUrl, isAvatar }) => {
  const [loading, setLoading] = useState(false)
    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 32;
      if (!isLt2M) {
        message.error('Image must smaller than 32MB!');
      }
      return isJpgOrPng && isLt2M;
    };
  
    const customRequest = async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        // Make a POST request to ImgBB API
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          params: {
            key: '9fb3ae59789f5af860a923793eee4051',
          },
        });
  
        // Handle the response from ImgBB
        if (response.data && response.data.data && response.data.data.url) {
          onImageUpload(response.data.data.url)
          setImageUrl(response.data.data.url)
          onSuccess();
          message.success('Image uploaded successfully');
        } else {
          onError();
          message.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        onError();
        message.error('Error uploading image');
      }
    };

    const uploadButton = (
      <Button
        className='upload-btn w-40 h-40 border-dashed border-2'
        >
        {loading ? <LoadingOutlined /> : <CameraFilled />}
        <div className='font-semibold text-sm'>
          Upload Image
        </div>
      </Button>
    );
    
    const uploadAvatar = (
      <Button
        className='rounded-full w-40 h-40'
      >
        {loading ? <LoadingOutlined /> : <CameraFilled />}
          <div className='text-md font-semibold'>
            Upload Image
          </div>
      </Button>
    )

    return (
      <Upload
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        showUploadList={false}
      >
       {imageUrl ? (
                    <div>
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className='h-40 w-40'
                    />
                    </div>
                ) : ( isAvatar ? uploadAvatar : uploadButton )}
             
      </Upload>
    );
  };

  export default ImgUpload
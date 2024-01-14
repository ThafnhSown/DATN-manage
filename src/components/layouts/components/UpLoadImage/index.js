import { useState } from 'react'
import { LoadingOutlined, CameraFilled } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';

export const UploadImage = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };

      const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };
      const uploadButton = (
        <Button
          className='w-100 h-60'
          >
          {loading ? <LoadingOutlined /> : <CameraFilled />}
          <div className='text-md font-semibold text-xl'>
            Upload Image
          </div>
        </Button>
      );

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

      const headersUpload = () => {
        return { authorization: 'authorization-text',
                 'Access-Control-Allow-Origin': '*',
                 'Content-Type': '*'
        }
      }
    return (
        <>
            <Upload
                listType="picture"
                className="avatar-uploader"
                showUploadList={false}
                action="https://api.imgbb.com/1/upload?key=9fb3ae59789f5af860a923793eee4051"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={headersUpload}
            >
                {imageUrl ? (
                    <div className='w-80'>
                      <img
                        src={imageUrl}
                        alt="avatar"
                    />
                    </div>
                ) : ( uploadButton )}
             
            </Upload>
        </>
    )
}
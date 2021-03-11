import React, { useRef, useState } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    //파일이 변경될때(이미지)
    const onChange = async (event) => {
        setLoading(true);
        const uploaded = await imageUploader.upload(event.target.files[0]);
        //로딩이 끝나고나면
        setLoading(false);
        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url,
        });
    };

    return (
        <div className={styles.container}>
            <input className={styles.input} ref={inputRef} type="file" name="file" accept="image/*" onChange={onChange} />
            {!loading && (
                <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onButtonClick}>
                    {name || 'No File'}
                </button>
            )}
            {loading && <div className={styles.loading}></div>}
        </div>
    );
};

export default ImageFileInput;

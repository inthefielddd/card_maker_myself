import React, { useRef } from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
    //ref
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    //card값
    const { name, company, theme, title, email, message, fileName, fileURL } = card;

    //Delete btn
    const onSubmit = () => {
        deleteCard(card);
    };

    const onFileChange = (file) => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url,
        });
    };

    //이벤트가 발생하면 함수를 호출
    const onChange = (event) => {
        //이벤트의 currentTarget에 아무것도 없다면
        if (event.currentTarget == null) {
            //아무것도 해주지 않을 것
            return;
        }
        //있다면 브라우저에서 기본적인이벤트를 처리하지 않도록 이벤트 막아주고
        event.preventDefault();
        //받아온 updateCard를 이용해서
        //기존의 card를 쓰면서
        // [event.currentTarget.name] = key = company
        // event.currentTarget.value = value = 입력값
        console.log(event.currentTarget.name, event.currentTarget.value);
        updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };
    return (
        <form className={styles.form}>
            <input ref={nameRef} className={styles.input} type="text" name="name" value={name} onChange={onChange} />
            <input ref={companyRef} className={styles.input} type="text" name="company" value={company} onChange={onChange} />
            <select ref={themeRef} className={styles.select} name="theme" value={theme} onChange={onChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
            </select>
            <input ref={titleRef} className={styles.input} type="text" name="title" value={title} onChange={onChange} />
            <input ref={emailRef} className={styles.input} type="text" name="email" value={email} onChange={onChange} />
            <textarea ref={messageRef} className={styles.textarea} name="message" cols="10" value={message} onChange={onChange} />
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange} />
            </div>
            <Button name="Delete" onClick={onSubmit} className={styles.button} />
        </form>
    );
};

export default CardEditForm;

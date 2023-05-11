import React, { Component, useState, ChangeEvent } from 'react';
import axios from "axios";
import { showModal } from '/imports/ui/components/common/modal/service';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import {
  defineMessages, injectIntl, FormattedMessage,
} from 'react-intl';
import Styled from './styles';
import { AnimatedButtonPrimary, ButtonCloseCross } from './buttons';
import Settings from '/imports/ui/services/settings';
import Storage from '/imports/ui/services/storage/session';

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired
};

const defaultProps = {
};

const intlMessages = defineMessages({
});

const AttachModal = (props) => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadState, setUploadState] = useState(0);
    const attachFilesUrl = Storage.getItem('attachFilesUrl');

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("files[]", files[0]);
        setIsLoading(true);
        axios.post(
                attachFilesUrl,
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                    withCredentials: false
                }
            )
        .then(res => {
            setFiles([]);
            setIsLoading(false);
            setUploadState(1); // show success
        })
        .catch(err => {
            setFiles([]);
            setIsLoading(false);
            setUploadState(2); // show error
        })
     };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (
            file &&
            (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') &&
            file.size <= 30000000
        ) {
            const newFiles = [...files];
            if (event.target.files.length === 1) {
                newFiles.push(file);
            }
            setFiles(newFiles);
        } else {
            console.log('Invalid file type or size.');
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (
            file &&
            (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') &&
            file.size <= 30000000
        ) {
            if (files.length === 0) {
                const newFiles = [...files];
                newFiles.push(file);
                setFiles(newFiles);
            }
        } else {
            console.log('Invalid file type or size.');
        }
    };

    const handleClose = () => {
        showModal(null);
    };

    const handleRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        setFiles([]);
    };

    return (
        <>
        <span>
        <Styled.AttachModal
          onRequestClose={handleClose}
          hideBorder
          data-test="attachModal"
          contentLabel="Some Content"
        >
        <div style={{display: (uploadState == 0)?'block':'none'}}>
          <Styled.Content>
            {!files.length ? (
                <Styled.DocumentsDragAndDrop active={files.length > 0} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
                    <input
                        type="file"
                        id="file-upload"
                        accept="application/pdf,image/jpeg,image/jpg,image/png"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        multiple={false}
                        disabled={files.length > 0}
                    />
                    <label htmlFor="file-upload">
                        <h3>Для загрузки нажмите или перетащите файл в эту область.</h3>
                    </label>
                </Styled.DocumentsDragAndDrop>
            ) : (
                <>
                    {files.map((file, index) => (
                        <Styled.DocumentsDragAndDropItem onSubmit={handleSubmit} key={index}>
                            <div style={{padding: 5 + 'px'}}>Нажмите кнопку Загрузить для отправки файла или на крестик слева чтобы отменить его загрузку:</div>
                            <div style={{paddingLeft: 20+'px', paddingRight: 20+'px', paddingTop: 20+'px' }}>
                                <ButtonCloseCross disabled={isLoading} type="button" onClick={() => handleRemove(index)} />
                                <small style={{fontSize: '100%', marginLeft: 40+'px'}}>{file.name}</small>
                            </div>
                            <div>
                                <AnimatedButtonPrimary type="submit" mw={'100%'} disabled={isLoading}>
                                <div className={isLoading ? 'loader' : ''}>
                                    <span className="button__text">{isLoading ? 'Загрузка...' : `Загрузить`}</span>
                                </div>
                                </AnimatedButtonPrimary>
                            </div>
                        </Styled.DocumentsDragAndDropItem>
                    ))}
                </>
            )}

           </Styled.Content>
           {!files.length ? (    
                <>
                    <div style={{textAlign: 'center'}}>Максимальный размер одного файла: 30Mb<br />
                        Допустимые форматы файла: pdf, jpg, jpeg
                    </div>
                </>
           ) : null}
       </div>
       <Styled.ResultMsg test-data="successMsg" style={{display: (uploadState == 1)?'flex':'none'}}>
            <Styled.DocumentsDragAndDropItem>
                <div>
                    <h3 style={{padding: 5 + 'px'}}>Файл успешно загружен!</h3>
                    <AnimatedButtonPrimary type="button" mw={'100%'} onClick={handleClose}>
                    <div>
                        <span className="button__text">Закрыть</span>
                    </div>
                    </AnimatedButtonPrimary>
                </div>
            </Styled.DocumentsDragAndDropItem>
       </Styled.ResultMsg>
       <Styled.ResultMsg test-data="failureMsg" style={{display: (uploadState == 2)?'flex':'none'}}>
            <Styled.DocumentsDragAndDropItem>
                    <h3 style={{padding: 5 + 'px'}}>Невозможно отправить файл!</h3>
                    <div style={{padding: 5 + 'px'}}>Повторите попытку немного позже</div>
                    <AnimatedButtonPrimary type="button" mw={'100%'} onClick={handleClose}>
                    <div>
                        <span className="button__text">Закрыть</span>
                    </div>
                    </AnimatedButtonPrimary>
            </Styled.DocumentsDragAndDropItem>
       </Styled.ResultMsg>
      </Styled.AttachModal>
     </span>
        </>
    );
}

AttachModal.propTypes = propTypes;
AttachModal.defaultProps = defaultProps;
export default AttachModal;
import { BASE_STORAGE_API_URL } from '@/assets/config';
import React, { useEffect, useRef, useState } from 'react';

export default function InputFile(props) {
    const { name, dimension, handleFile, fileRef, thumbnailRef, stateHasFile } = props
    const [hasFile, setHasFile] = stateHasFile == null ? useState(isEdit ? true : false) : stateHasFile;
    const inputFile = fileRef == null ? useRef(null) : fileRef;
    const thumbnail = thumbnailRef == null ? useRef(null) : thumbnailRef;

    const handleClick = () => {
        inputFile.current.click();
    }

    const handleChange = () => {
        setHasFile(true);
        if(handleFile != null){
            handleFile(inputFile.current.files[0]);
        }
        let blob = window.URL.createObjectURL(inputFile.current.files[0]);
        thumbnail.current.src = blob;
    }

    return (
        <label
            htmlFor="dropzone-file"
            onClick={handleClick}
            className={`${!hasFile && 'flex flex-col'} relative overflow-hidden items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}>
            <img src={null} className={`${!hasFile && 'hidden'} object-cover w-full h-full`} ref={thumbnail} />
            <div className={`${hasFile && 'hidden'} flex flex-col items-center justify-center pt-5 pb-6`}>
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                {/* <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p> */}
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-gray-500">JPG or PNG (MAX. {`${dimension.width}x${dimension.height}`}px)</p>
            </div>
            <input type="file" name={name} className="hidden" onChange={handleChange} ref={inputFile} accept={`image/jpeg,image/png`} />
        </label>
    )
}
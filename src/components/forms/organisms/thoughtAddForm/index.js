import React from 'react';
import {ButtonWrapper, InputField, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState} from 'react';
import './index.scss';
import axios from "axios";

export const ThoughtAddForm = ({setCancel, setAddPost}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    async function addThought(data) {
        try {
            const formData = {...data, type:"THOUGHT", projectId: 1};
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/posts/thoughts', formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setAddPost(false);
        } catch (e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        setCancel(true);
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(addThought)}>
                <div className='form-item'>
                    <InputField
                        name="title"
                        label="Title"
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Title is required',
                            }
                        })}
                    />
                </div>
                <div className='form-item'>
                    <InputField
                        name="description"
                        label="Description"
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Description is required',
                            }
                        })}
                    />
                </div>
                <ButtonWrapper>
                    <Button onClick={addThought} className="button button__primary button__margin-right">Save</Button>
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>

            </form>
        </FormProvider>
    );
}



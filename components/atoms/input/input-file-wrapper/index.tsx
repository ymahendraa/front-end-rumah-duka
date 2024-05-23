import React, { ReactElement, ReactNode } from 'react';
import Label from '../../label';
import Section from '../../section';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import Button from '../../button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type InputFileWrapperProps = {
    name: string
    classNameInput?: string
    classNameWrapper?: string
    label?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    placeholder?: string,
    inputContent: ReactNode,
    onlineUrl?: string,
} & React.InputHTMLAttributes<HTMLInputElement>


const InputFileWrapper = React.forwardRef<HTMLInputElement, InputFileWrapperProps>(({
    classNameInput,
    classNameWrapper,
    label,
    ...props
}, ref) => {

    InputFileWrapper.displayName = 'InputFileWrapper';

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // Handle dropped files here
        if (files && files[0]) {
            props.onChange && props.onChange({ target: { files: [files[0]] } } as any);
        }
    };

    const handleClick = () => {
        if (ref && typeof ref !== 'function' && ref.current) {
            ref.current.click();
        }
    };

    const config = {
        classNameInput: classNameInput ?? 'w-full flex items-center justify-center bg-base min-h-12 focus:border focus:border-gray-300 rounded-xl p-2 box-border text-white text-sm cursor-pointer hover:bg-gray-700 transition-color duration-300 ease-in-out',
        classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
    }
    const isContentImage = (props.inputContent as ReactElement).type === 'img';

    return (
        <div
            className={config.classNameWrapper}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            {label && <Label label={label} name={props.name} aria-required={props['aria-required']} />}
            <Section
                className={`${config.classNameInput} ${props.error ? 'border-red-500' : ''} ${isContentImage && 'justify-center'}`}
            >
                {props.inputContent}
                <input
                    // value={props.value}
                    type="file"
                    ref={ref}
                    className='hidden'
                    onChange={props.onChange}
                />
                {/* {props.onlineUrl && (
                    <Button
                        type='button'
                        onClick={() => {
                            // download file from online url
                            window.open(props.onlineUrl, '_blank');

                        }}>
                        <ArrowDownTrayIcon className='h-5 w-5' />
                    </Button>
                )
                } */}
            </Section>

        </div>
    );
});

export default InputFileWrapper;
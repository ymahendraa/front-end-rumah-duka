import InputCheckbox from '@/components/atoms/input/input-checkbox'
import { TODO } from '@/types/todo'
import React from 'react'

type CheckboxWithChildrenProps = {
    className?: string
    checkboxChildren?: TODO
    parent?: TODO
    value?: string
}

/**
 * 
 * @description
 * CheckboxWithChildren: CheckboxWithChildren component for showing user data
 * @param className className for styling
 * @param checkboxChildren checkboxChildren for showing children component
 * @param parent parent for showing parent component
 * @param value value for showing value
 * @return CheckboxWithChildren component
 * 
 * @example
 * <CheckboxWithChildren
 * className='flex flex-col gap-y-2'
 * checkboxChildren={checkboxChildren}
 * parent={parent}
 * />
 */
const CheckboxWithChildren: React.FC<CheckboxWithChildrenProps> = ({
    className,
    checkboxChildren,
    parent,
    value
}) => {
    const config = {
        className: className ?? 'flex flex-col gap-y-2'
    }
    return (
        <div className={config.className}>
            <InputCheckbox label={parent.name} name={parent.name} onChange={() => console.log(parent.name)} value={value ? value : parent.id} />
            {checkboxChildren && (
                checkboxChildren?.map((child: TODO, index: number) =>
                    <div className='ml-4' key={index}>
                        <CheckboxWithChildren key={index} parent={child} checkboxChildren={child.children} />
                    </div>
                )
            )}
        </div>
    )
}

export default CheckboxWithChildren
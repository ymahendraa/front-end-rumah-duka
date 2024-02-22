import React from 'react'

type ModalOverlayProps = {
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
    setter
}) => {
    return (
        // Overlay to prevent clicks in background, also serves as our close button
        <div
            className={`flex lg:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => setter((oldVal) => !oldVal)}
        />

    )
}

export default ModalOverlay
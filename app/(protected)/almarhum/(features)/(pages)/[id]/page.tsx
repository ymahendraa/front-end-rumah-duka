import React from 'react'
import Detail from '../../components/Detail'

const EditPage = ({ params }: { params: { id: string } }) => {
    return (
        <main>
            <Detail id={params.id} />
        </main>
    )
}

export default EditPage
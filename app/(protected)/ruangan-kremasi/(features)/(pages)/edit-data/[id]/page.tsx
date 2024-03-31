import React from 'react'
import Edit from '../../../components/Edit'

const EditPage = ({ params }: { params: { id: string } }) => {
    return (
        <main>
            <Edit id={params.id} />
        </main>
    )
}

export default EditPage
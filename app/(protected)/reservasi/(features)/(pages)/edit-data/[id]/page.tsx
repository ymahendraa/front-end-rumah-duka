import React from 'react'
import Edit from '../../../components/edit/Edit'

const EditPage = ({ params }: { params: { id: string } }) => {
    return (
        <main>
            <Edit id={params.id} />
        </main>
    )
}

export default EditPage
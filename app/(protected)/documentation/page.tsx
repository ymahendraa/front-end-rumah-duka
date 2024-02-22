'use client'
import Button from '@/components/atoms/button'
import InputDatepicker from '@/components/atoms/input/input-datepicker'
import InputText from '@/components/atoms/input/input-text'
import LoadingKalla from '@/components/atoms/loading'
import Modal from '@/components/atoms/modal'
import Section from '@/components/atoms/section'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Menu from '@/components/molecules/menu'
import PaginationButton from '@/components/molecules/pagination-button'
import useModalState from '@/hooks/useModalState'
import { ICON } from '@/utils/icon'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

/**
 * @description DocumentationPage is a page for documentation of this project which contains all components you can use
 * @returns DocumentationPage component
 */
const DocumentationPage = () => {
  const name = "Admin Kalla" // define name for delete modal
  const { open, setOpen, openDelete, setOpenDelete } = useModalState() // define modal state

  // const [activeItems, setActiveItems] = useState<any>(null) // define active menu state

  // // define toggle active menu function
  // const toggleActiveItem = (item: any) => {
  //   if (activeItems === item) {
  //     setActiveItems(null)
  //   } else {
  //     setActiveItems(item)
  //   }
  // }

  // const isItemActive = (item: any) => activeItems === item // define is item active function

  // const item = {
  //   name: "Report",
  //   icon: "TableCells",
  //   path: undefined,
  //   children: [
  //     {
  //       name: "Report 1",
  //       path: "/report-1",
  //     },
  //     {
  //       name: "Report 2",
  //       path: "/report-2",
  //     },
  //   ],
  // }

  return (
    <main className='text-black bg-white min-h-full shadow-md rounded-md p-4'>
      <h1 className='text-3xl font-bold mb-4'>Documentation Page</h1>
      <p className='text-sm text-slate-800 mb-10'>
        <b>Description: </b>
        <br />
        This page contains all components you can use in this project. You can use this page as a reference for your project. You can also use this page to test your component.
      </p>
      <Section className='flex flex-col gap-20'>

        {/* ATOMS */}
        <Section>
          <h2 className='text-xl font-semibold'>Atoms</h2>
          <Section className='flex flex-col gap-16'>
            <Section className='flex flex-col gap-4'>
              <h3 className='text-sm underline'>Input components</h3>
              <Section className='flex gap-2 flex-wrap'>
                <InputText label='Text' placeholder='Input text here' classNameWrapper=' basis-auto grow' />
                <InputText label='Number' type='number' placeholder='Input number here' classNameWrapper=' basis-auto  grow' />
                <InputDatepicker label='Datepicker' classNameWrapper=' basis-auto grow' />
              </Section>
            </Section>
            <Section className='flex flex-col gap-4'>
              <h3 className='text-sm underline'>Button components</h3>
              <Section className='flex gap-4 flex-wrap'>
                <Section className='flex flex-col gap-2'>
                  <p className='text-sm'>Primary/default</p>
                  <Button>
                    Button
                  </Button>
                </Section>
                <Section className='flex flex-col gap-2'>
                  <p className='text-sm'>Secondary</p>
                  <Button className='bg-secondary text-white hover:bg-secondaryDark p-2 rounded-md text-sm'>
                    Button
                  </Button>
                </Section>
                <Section className='flex flex-col gap-2'>
                  <p className='text-sm'>Iconed</p>
                  <Button
                    className='w-[40px] flex items-center bg-primary rounded-lg text-sm p-2 hover:bg-primaryDark'
                    type='button'
                    icon={<MagnifyingGlassCircleIcon className='w-6 h-5 text-white' />}
                  />
                </Section>
                <Section className='flex flex-col gap-2'>
                  <p className='text-sm'>Text with icon</p>
                  <Button
                    className='flex justify-between items-center bg-primary rounded-lg text-sm p-2 hover:bg-primaryDark text-white'
                    type='button'
                    icon={<MagnifyingGlassCircleIcon className='w-6 h-5 text-white' />}
                  >
                    Search
                  </Button>
                </Section>
              </Section>
            </Section>
            <Section className='flex flex-col gap-4'>
              <h3 className='text-sm underline'>Loading components</h3>
              <Section className='flex gap-2 flex-wrap'>
                <Section className='flex flex-col gap-2'>
                  <p className='text-sm'>Kalla</p>
                  <LoadingKalla width={30} height={30} />
                </Section>
              </Section>
            </Section>
            <Section className='flex flex-col gap-4'>
              <h3 className='text-sm underline'>Icon components</h3>
              <Section className='flex gap-2 flex-wrap'>
                {Object.keys(ICON).map((key, index) => (
                  <Section key={index} className='flex flex-col gap-2'>
                    <p className='text-sm'>{key}</p>
                    <div className='flex justify-center items-center'>
                      {ICON[key as keyof typeof ICON]}
                    </div>
                  </Section>
                ))}
              </Section>
            </Section>
            <Section className='flex flex-col gap-4'>
              <h3 className='text-sm underline'>Modal components</h3>
              <Section className='flex gap-2 flex-wrap'>
                <Button onClick={setOpen.bind(null, true)}>
                  Click here to open modal
                </Button>
                <Modal
                  isOpen={open}
                  setIsOpen={setOpen}
                  dialogTitle='Example Modal'
                  dialogContent={
                    <></>
                    // <DeleteModalContent
                    //     name={selectedRow?.name}
                    //     setOpen={setOpenDelete}
                    //     isLoading={isLoadingSubmit}
                    //     deleteHandler={() => submitHandler({
                    //         url: `master/customers/${selectedRow?.id}`,
                    //         config: {
                    //             method: 'DELETE',
                    //         },
                    //         setOpen: setOpenDelete,
                    //         mutate,
                    //     })}
                    // />
                  }
                  className='w-3/4 md:w-1/3'
                />
              </Section>
              <Section className='flex gap-2 flex-wrap'>
                <Button onClick={setOpenDelete.bind(null, true)} className='bg-red-600 hover:bg-red-700 text-white text-sm p-2 rounded-lg'>
                  Click here to example delete
                </Button>
                <Modal
                  isOpen={openDelete}
                  setIsOpen={setOpenDelete}
                  dialogTitle='Delete Modal'
                  dialogContent={
                    <DeleteModalContent
                      name={name}
                      deleteHandler={() => alert('delete')}
                      setOpen={setOpenDelete.bind(null, false)}
                      isLoading={false}
                    />
                  }
                  className='w-3/4 md:w-1/3'
                />
              </Section>
            </Section>
          </Section>

        </Section>
        {/* MOLECULES */}
        <Section>
          <h2 className='text-xl font-semibold'>Molecules</h2>
          <Section className='flex flex-col gap-4'>
            <h3 className='text-sm underline'>Delete modal components</h3>
            <Section className='w-fit p-2 shadow-md rounded-lg'>
              <DeleteModalContent
                name={name}
                deleteHandler={() => alert('delete')}
                setOpen={() => { return true }}
                isLoading={false}
              />
            </Section>
          </Section>
          <Section className='flex flex-col gap-4'>
            <h3 className='text-sm underline'>Menu component</h3>
            <Section className='flex flex-col gap-4 p-2'>
              <p className='text-sm'>Single menu</p>
              <Menu
                icon='HomeIcon'
                label="Home"
                path='#'
                classNameLink={`flex flex-row justify-between gap-x-2 p-3 rounded-md  transition-colors cursor-pointer ${true
                  ? 'bg-primary '
                  : 'bg-white hover:bg-primaryLight'
                  }`}
                classNameLabel={`text-sm font-medium ${true
                  ? 'text-white'
                  : 'text-slate-800'
                  } `}
                classNameIcon={`w-5 h-5  ${true
                  ? 'text-white'
                  : 'text-slate-800'
                  } `}
                classNameDropdown={`h-5 w-5 transition-transform text-slate-800  ${true
                  ? 'rotate-180'
                  : ''
                  } `}
                onClick={() => true}
              />
            </Section>
          </Section>
          <Section className='flex flex-col gap-4'>
            <h3 className='text-sm underline'>Pagination Button</h3>
            <Section className='flex flex-col gap-4 p-2'>
              <p className='text-sm'>Single menu</p>
              <PaginationButton
                className='flex flex-row justify-between gap-x-2 p-3 rounded-md  transition-colors cursor-pointer bg-primary '
                labelNext='Next'
                labelPrev='Prev'
                disabledPrev={false}
                disabledNext={false}
                onClickNext={() => { return true }}
                onClickPrev={() => { return true }}
              />
            </Section>
          </Section>
        </Section>
        {/* ORGANISMS */}
      </Section>
    </main>
  )
}

export default DocumentationPage
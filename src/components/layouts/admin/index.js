import AdminHeader from '../components/AdminHeader'

function AdminLayout({ children }) {
  return (
    <div className='flex-col flex'>
      <div className='grid grid-cols-12 h-16 mb-16'>
        <div className='col-span-1'></div>
        <div className='col-span-10'>
          <AdminHeader />
        </div>
        <div className='col-span-1'></div>
      </div>
      
      <div className='grid grid-cols-12 bg-neutral-200'>
        <div className='min-h-screen col-span-1'></div>
        <div className='min-h-screen col-span-10'>
          <div className='p-8 h-[calc(100%_-_64px)] bg-neutral-200'>{children}</div>
        </div>
        <div className='min-h-screen col-span-1'></div>
      </div>
    </div>
  )
}

export default AdminLayout

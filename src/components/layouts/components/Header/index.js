import logo from '../../../../assets/logo.png'
import AppNav from '../AppNav'

const Header = () => {
    return (
        <div>
            <div className='flex flex-row mb-4'>
                <div className='flex flex-row items-center justify-center ml-4'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='flex flex-row items-center justify-center ml-20 bg-green-700 rounded-2xl mt-8 w-full h-12'>
                    <AppNav />
                </div>
            </div>
        </div>
    )
}

export default Header
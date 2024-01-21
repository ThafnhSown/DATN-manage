import logo from '../../../../assets/logo.png'
import AppNav from '../AppNav'

const Header = () => {
    return (
            <div className='h-20 flex flex-row'>
                <div className='flex flex-row items-center ml-4'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='flex flex-row items-center justify-center ml-20 bg-green-700 rounded-2xl h-12 mt-4'>
                    <AppNav />
                </div>
            </div>
    )
}

export default Header
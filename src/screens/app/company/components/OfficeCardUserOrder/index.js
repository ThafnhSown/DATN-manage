import noImage from '../../../../../assets/no-image.png'
import { Location, Phone, Map, MiniLocation, MiniPhone, MiniMap } from '../../../../../assets/svgs'

const OfficeCardUserOrder = ({office}) => {
    return (
        <div className="flex flex-col bg-white desktop:space-y-2">
            <h1 className='mobile:text-lg desktop:text-2xl font-bold'>{office.name}</h1>
            <div className="flex flex-row mobile:space-x-1 desktop:space-x-4">
                {office.logoLink ? <img src={office.logoLink} className='mobile:w-20 mobile:h-20 desktop:w-40 desktop:h-40 rounded-md'/> : <img className='mobile:w-20 mobile:h-20 desktop:w-40 desktop:h-40' src={noImage}/>}
                <div className="flex flex-col justify-center desktop:space-y-2 mobile:hidden desktop:flex">
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2'>
                        <div className='mt-1'>
                            <Location />
                        </div>
                        <h1 className='mobile:text-xs desktop:text-xl font-bold'>{office.address}, {office.location.district}, {office.location.province}</h1>
                    </div>
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2 items-center'>
                        <Phone />
                        <p className='mobile:text-xs desktop:text-xl font-bold'>
                            <a href={`tel:${office.phoneNumber1}`}>{office.phoneNumber1} </a>
                                {
                                    office.phoneNumber2 ? <a href={`tel:${office.phoneNumber2}`}>- {office.phoneNumber2}</a> : null
                                }
                        </p>
                    </div>
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2 items-center'>
                        <Map />
                        <a className='mobile:text-xs desktop:text-xl font-bold' href={office.mapLink}>Xem trên bản đồ</a>
                    </div>
                </div>
                <div className="flex flex-col justify-center desktop:space-y-2 mobile:flex desktop:hidden">
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2'>
                        <div className='mt-px'>
                            <MiniLocation />
                        </div>
                        <h1 className='mobile:text-xs desktop:text-xl font-bold'>{office.address}, {office.location.district}, {office.location.province}</h1>
                    </div>
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2 items-center'>
                        <MiniPhone />
                        <div className='mobile:text-xs desktop:text-xl font-bold'>
                            <a href={`tel:${office.phoneNumber1}`}>{office.phoneNumber1} </a>
                            {
                                office.phoneNumber2 ? <a href={`tel:${office.phoneNumber2}`}>- {office.phoneNumber2}</a> : null
                            }
                        </div>
                    </div>
                    <div className='flex flex-row mobile:space-x-1 desktop:space-x-2 items-center'>
                        <MiniMap />
                        <a className='mobile:text-xs desktop:text-xl font-bold' href={office.mapLink}>Xem trên bản đồ</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficeCardUserOrder
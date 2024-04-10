import { Modal } from "antd"
import OfficeCardUserOrder from "../OfficeCardUserOrder"
import { MiniBlue } from "../../../../../assets/svgs"

const OfficeAtPoint = (props) => {
    const { data, modalShow, setModalShow } = props
    return (
        <div>
            <Modal
                open={modalShow}
                onCancel={() => setModalShow(false)}
                width={720}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex flex-row justify-center space-x-2">
                    </div>
                  )}
            >
                <div className="flex flex-row items-center space-x-2">
                  <MiniBlue />
                  <p>{data.description}</p>  
                </div>
                <div className="border border-neutral w-full my-1"/>
                {
                    data?.officeList?.map(office => <OfficeCardUserOrder office={office}/>)
                }
            </Modal>
        </div>
    ) 
}

export default OfficeAtPoint
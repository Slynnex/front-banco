import React, { useState, useContext, useEffect } from 'react'
import Positions from './Positions'
import Areas from './Areas'
import ModalArea from './ModalArea'
import ModalPosition from './ModalPosition'
import { Context } from '../../context/PositionArea/PositionAreaContext'

//Loader
import Loader from '../../assets/Loader'

const PositionArea = () => {
  const [openA, setOpenA] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [PositionId, setPositionId] = useState('');
  const { getPositionArea } = useContext(Context);

  //loading state
  const [loader, setLoader] = useState('none')

  useEffect(() => {
    getPositionArea({ setLoader })
  }, []);


  return (
    <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))" }}>
      <Loader display={loader} />
      <Positions
        setOpenP={setOpenP}
        setAction={setAction}
        setName={setName}
        setId={setId}
        setLoader={setLoader}
      />
      <Areas
        setOpenA={setOpenA}
        setAction={setAction}
        setName={setName}
        setId={setId}
        setLoader={setLoader}
        setPositionId={setPositionId}
      />
      <ModalPosition
        openP={openP}
        setOpenP={setOpenP}
        action={action}
        name={name}
        setName={setName}
        setLoader={setLoader}
        id={id}
      />
      <ModalArea
        openA={openA}
        setOpenA={setOpenA}
        action={action}
        name={name}
        setName={setName}
        setLoader={setLoader}
        setPositionId={setPositionId}
        PositionId={PositionId}
        id={id}
      />
    </div>
  )
}

export default PositionArea
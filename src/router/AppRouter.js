import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ConsultaApp from '../js/ConsultaApp'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                {/* <Route path='/pedidos' element={<App />} ></Route> */}
                <Route path='pedidos/*' element={<ConsultaApp />} >
                    {/* <Routes>
                        <Route path='/*' element={<ConsultaApp />} ></Route>
                    </Routes> */}
                </Route>
                <Route path='/*' element={<Navigate to='/pedidos' />} />
            </Routes>
        </>

    )
}

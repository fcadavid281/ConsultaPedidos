import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ConsultaApp from '../js/ConsultaApp'
import { RedirectRoute } from './RedirectRoute'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/pedido' element={<ConsultaApp />} />
                <Route path='/*' element={<RedirectRoute />} />
            </Routes>
        </>

    )
}

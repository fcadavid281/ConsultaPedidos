import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const RedirectRoute = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/pedido');
    }, []);

    return null;
}

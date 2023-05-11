import Routes from "../routes"
import { RouterProvider } from 'react-router-dom';
import { router } from "../routes";
export const Views = () => {

    return (
        <RouterProvider router={router} />
    )
}   
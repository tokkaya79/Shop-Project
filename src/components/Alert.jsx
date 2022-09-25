import { useEffect } from 'react';

function Alert(props) {
    const { name = '', closeAlert = Function.prototype } = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000); //убираем алерт

        return () => {
            clearTimeout(timerId); //убираем таймер, чтобы при появлении нового алерта он не срабатывал
        };
        //для того чтоб убрать подчеркивание:
        // eslint-disable-next-line 
    }, [name]);

    return (
        <div id="toast-container">
            <div className="toast">{name} added in cart</div>
        </div>
    );
}
export {Alert}
const Success = () => {
    return (
        <div className="authsuccess auth">
            <div className="authsuccess__body">
                <img src="/Images/ImageSuccess.png" alt="not-image" className="authsuccess__body-img-1" />
                <h4 className="authsuccess__body-title">Neighbor Harbor</h4>
                <img src="/Images/GirlsSuccess.png" alt="" className="authsuccess__body-img-2" />
                <h4 className="authsuccess__body-title authsuccess__body-subtitle">Welcome,
                    <b>Feliks !</b>
                </h4>
                <button className="authsuccess__body-setup">Let’s setup your account</button>
            </div>

            <button className="authsuccess__body-setup">Setup later</button>
            <button className='login__button'>
                Setup Account
            </button>
        </div>
    )
}

export default Success
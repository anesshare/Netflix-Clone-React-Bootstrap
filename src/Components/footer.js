import React from "react";
import Button from 'react-bootstrap/Button';

import './foot.css';
import {
    MDBFooter,
    MDBContainer,
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                <section className='mb-4'>
                <Button className="btn" variant="secondary" size="lg" active>
                          <img className="dd" src="/img/fejs.png"/>
                </Button>
                <Button className="btn" variant="secondary" size="lg" active>
                          <img className="dd" src="/img/insta.png"/>
                </Button>
                <Button className="btn"variant="secondary" size="lg" active>
                          <img className="dd" src="/img/twit.png"/>
                </Button>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className='text-white' href='https://mdbootstrap.com/'>
                    anesshare
                </a>
            </div>
        </MDBFooter>
    )
}

export default Footer;

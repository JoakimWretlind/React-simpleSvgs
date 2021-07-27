import { useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
`;

const MySvg = styled.svg`
    height: 0;
    width: 0;
	visibility: hidden;
`;

const Button = styled.button`
	background: radial-gradient(#FE5F26, #E43D4F);
	border: none;
    outline: none;
	border-radius: .4rem;
	color: #fff;
    font-size: 1.4rem;
	padding: 1em 1.4em;
	letter-spacing: .2rem;
    cursor: pointer;

	&:focus {
    -webkit-filter: url(#noise);
	  filter: url(#noise);
	}
`;


const Section = () => {
    useEffect(() => {
        let bt = document.querySelectorAll('.button')[0];
        let turbVal = { val: 0.000001 }
        let turb = document.querySelectorAll('#noise feTurbulence')[0];

        let btTl = gsap.timeline({
            paused: true, onUpdate: function () {
                turb.setAttribute('baseFrequency', '0 ' + turbVal.val);
            }
        });

        btTl.to(turbVal, 0.2, { val: 0.2 })
            .to(turbVal, 0.2, { val: 0.000001 });

        bt.addEventListener('click', function () {
            btTl.restart();
        });
    }, [])
    return (
        <>
            <Container>
                <Button className="button">
                    <MySvg>
                        <filter id='noise' x='0%' y='0%' width='100%' height='100%'>
                            <feTurbulence type="fractalNoise" baseFrequency="0 0.000001" result="NOISE" numOctaves="2" />
                            <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="30" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
                        </filter>
                    </MySvg>
                    click me
                </Button>
            </Container>
        </>
    )
}

export default Section

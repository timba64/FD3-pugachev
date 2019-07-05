import React from 'react';
import { Container } from 'react-bootstrap';
import { title,content } from './about';

const arrStrings = content.split('\n');
const outString = arrStrings.map((item, i)=>{
    return <p key={i}>{item}</p>;
});

const AboutPage = () => {
    console.log('render from AboutPage');
    return (
        <Container>
            <div className="page-content">
                <h2>{title}</h2>
                {outString}
            </div>
        </Container>
    );
};

export default AboutPage;
import styled from 'styled-components';


export const Title = styled.h1`
    color: ${props => props.color ? props.color : () => '#ffffff'};
    font-size: 4rem;
    font-weight: bold;
    `;
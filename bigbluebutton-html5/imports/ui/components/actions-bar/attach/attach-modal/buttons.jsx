import styled from 'styled-components';

export const button = styled.button.attrs(
    `${(props) => ({
        type: props.type,
        href: props.href,
        disabled: props.disabled,
        target: props.href && '_blank',
    })}`
)`
    text-align: center;
    display: block;
    background: transparent;
    box-shadow: 0px 6px 20px rgba(0,0,0,.08);
    font-weight: 600;
    font-size: 14px;
    line-height: 0%;
    color: #fff;
    ${({ small }) => (small ? 'padding: 14px 5px;' : 'padding: 20px 5px;')}
    border-radius: 5px;
    margin-bottom: ${({ mb }) => mb || 0};
    margin-top: ${({ mt }) => mt || 0};
    margin-right: ${({ mr }) => mr || 0};
    margin-left: ${({ ml }) => ml || 0};
    flex: none;
`;

export const ButtonCloseCross = styled.button`
    position: absolute;
    top: ${({ t }) => t || 'none'};
    right: ${({ r }) => r || 'none'};
    bottom: ${({ b }) => b || 'none'};
    left: ${({ l }) => l || 'none'};
    cursor: pointer;
    background: url('svgs/cross.svg') no-repeat center center / cover;
    display: block;
    border: 0;
    width: ${({ w = '21px' }) => w};
    height: ${({ h = '21px' }) => h};
`;

export const ButtonPrimary = styled(button)`
    color: #fff;
    border: 0;
    background: #82bf31;
    font-weight: 600;
    font-size: 14px;
    line-height: 0%;
    margin-top: ${({ mt }) => mt || 0};
    margin-bottom: ${({ mb }) => mb || 0};
    width: ${({ mw }) => mw || '290px'};
    ${({ dis }) =>
        dis &&
        `
        &:disabled {
            opacity: 0.5;
        }
    `}
`;
export const ButtonFailure = styled(ButtonPrimary)`
    background: #ff9211;
`;

export const ButtonClose = styled(ButtonPrimary)`
    background: #747f8f;
`;

export const ButtonSecondary = styled(button)`
    color: var(--colors-primary);
    background: transparent;
    font-weight: 600;
    font-size: 14px;
    line-height: 0%;
    box-shadow: none;
    border: 1px solid var(--colors-primary);
    margin-top: ${({ mt }) => mt || 0};
    margin-bottom: ${({ mb }) => mb || 0};
    width: ${({ mw }) => mw || '290px'};
    outline: none;
    height: 39px;
`;

export const ButtonText = styled(button)`
    color: var(--colors-primary);
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-decoration-line: underline;
    box-shadow: none;
    padding: 0;
`;

export const ButtonGU = styled(ButtonPrimary)`
    background: ${({ isLoadingGetLink }) => (isLoadingGetLink ? 'var(--colors-bg-first)' : 'var(--colors-bg-second)')};
    padding-top: 5px;
    padding-bottom: 5px;
    color: var(--colors-text-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    img {
        margin-left: 6px;
    }
`;

export const AnimatedButtonPrimary = styled(ButtonPrimary)`
    position: relative;
    overflow: hidden;
    border: 0;
    cursor: pointer;
    background: ${({ color = '#82bf31' }) => color};
    & .loader {
        font-size: 1rem;
        overflow: hidden;
        width: 150%;
        height: 100%;
        cursor: wait;
    }
    & .loader::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 150%;
        height: 100%;
        background: repeating-linear-gradient(
            60deg,
            transparent,
            transparent 0.75rem,
            ${({ colorAlt = '#dfeec9' }) => colorAlt} 0.75rem,
            ${({ colorAlt = '#dfeec9' }) => colorAlt} 1.5rem
        );
        animation: load 1s infinite linear;
    }
    & .button__text {
        position: absolute;
        left: 0;
        right: 0;
        ${({ disabled }) => disabled && 'color: #172945'}
    }
`;
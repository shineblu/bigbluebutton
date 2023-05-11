import styled, { css, keyframes } from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import Modal from '/imports/ui/components/common/modal/simple/component';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  colorPrimary,
  colorGrayDark,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  mdPaddingY,
  btnSpacing,
} from '/imports/ui/stylesheets/styled-components/general';
import { lineHeightComputed } from '/imports/ui/stylesheets/styled-components/typography';

const AudioOptions = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
`;

const AudioModalButton = styled(Button)`
  i {
    color: #3c5764;
  }

  // Modifies the audio button icon colour
  & span:first-child {
    display: inline-block;
    color: #1b3c4b;
    background-color: #f1f8ff;
    box-shadow: none;
    border: 5px solid #f1f8ff;
    font-size: 3.5rem;

    @media ${smallOnly} {
      font-size: 2.5rem;
    }
  }

  // When hovering over a button of class audioBtn, change the border colour of first span-child
  &:hover span:first-child,
  &:focus span:first-child {
    border: 5px solid ${colorPrimary};
    background-color: #f1f8ff;
  }

  // Modifies the button label text
  & span:last-child {
    display: block;
    color: black;
    font-size: 1rem;
    font-weight: 600;
    margin-top: ${btnSpacing};
    line-height: 1.5;
  }
`;

const AudioDial = styled(Button)`
  margin: 0 auto;
  margin-top: ${mdPaddingY};
  display: block;
`;

const Connecting = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 2rem;
`;

const ellipsis = keyframes`
  to {
    width: 1.5em;
  }
`;

const ConnectingAnimation = styled.span`
  margin: auto;
  display: inline-block;
  width: 1.5em;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0;
    margin-left: 0.25em;

    ${({ animations }) => animations && css`
      animation: ${ellipsis} steps(4, end) 900ms infinite;
    `}
  }
`;

const AttachModal = styled(Modal)`
  padding: 1.5rem;
  min-height: 20rem;
`;

const BrowserWarning = styled.p`
  margin: ${lineHeightComputed};
  text-align: center;
  padding: 0.5rem;
  border-width: 3px;
  border-style: solid;
  border-radius: 0.25rem;
`;

const Header = styled.header`
  margin: 0;
  padding: 0;
  border: none;
  line-height: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 400;
  font-size: 1.3rem;
  color: ${colorGrayDark};
  white-space: normal;
  margin: 0;

  @media ${smallOnly} {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0.5rem 0;

  button:first-child {
    margin: 0 3rem 0 0;

    [dir="rtl"] & {
      margin: 0 0 0 3rem;
    }

    @media ${smallOnly} {
      margin: 0 1rem 0 0;

      [dir="rtl"] & {
        margin: 0 0 0 1rem;
      }
    }
  }

  button:only-child {
    margin: inherit 0 inherit inherit;

    [dir="rtl"] & {
      margin: inherit inherit inherit 0 !important;
    }
  }
`;

const DocumentsDragAndDropItem = styled.form`
    position: relative;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 6px 20px rgba(0,0,0,.08);
    transition: 0.2s ease;
    margin-bottom: 30px;
    margin-top: 30px;
    padding: 10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    max-width: 290px;
    width: 290px;
    & > div > small {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        margin-bottom: 20px;
        display: block;
        font-size: 14px;
    }
    div {
        margin-top: auto;
    }
`;

const ResultMsg = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;

const DocumentsDragAndDrop = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 290px;
    & > label {
        cursor: pointer;
        padding: 10px;
        margin-bottom: 30px;
        width: 100%;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0px 6px 20px rgba(0,0,0,.08);
        border: ${({ active }) => (active ? '0.5px solid #82bf31' : '0.5px solid #99a7bc')};
        transition: 0.2s ease;
        &:hover {
            border: 0.5px solid #82bf31;
            h3 {
                color: #82bf31;
            }
        }
    }
    h3 {
        transition: 0.2s ease;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        color: ${({ active }) => (active ? '#82bf31' : '#172945')};
    }
`;

export default {
  Connecting,
  ConnectingAnimation,
  AttachModal,
  BrowserWarning,
  Header,
  Title,
  Content,
  DocumentsDragAndDropItem,
  DocumentsDragAndDrop,
  ResultMsg
};

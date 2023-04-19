import styled from 'styled-components';
import Modal from '/imports/ui/components/common/modal/simple/component';
import Button from '/imports/ui/components/common/button/component';
import { colorGrayDark, colorWhite } from '/imports/ui/stylesheets/styled-components/palette';
import {
  jumboPaddingY,
  minModalHeight,
  headingsFontWeight,
  mdPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import { fontSizeLarge } from '/imports/ui/stylesheets/styled-components/typography';

const Title = styled.h3`
  font-weight: ${headingsFontWeight};
  font-size: ${fontSizeLarge};
  color: ${colorGrayDark};
  white-space: normal;
  padding-bottom: ${mdPaddingX};
`;

const LeaveButton = styled(Button)`
  span {
      background-color: red;
      color: white;
  }

  ${({ ghost }) => ghost && `
      span {
        box-shadow: none;
        background-color: transparent !important;
        border-color: ${colorWhite} !important;
      }
   `}
`;

export default {
  Title,
  LeaveButton,
};

import React from 'react';
import { injectIntl } from 'react-intl';
import AttachButton from './component';

const AttachButtonContainer = (props) => <AttachButton {...props} />;
export default injectIntl(AttachButtonContainer)

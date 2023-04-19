import React from 'react';
import { injectIntl } from 'react-intl';
import LeaveButton from './component';

const LeaveButtonContainer = (props) => <LeaveButton {...props} />;

export default injectIntl(LeaveButtonContainer)
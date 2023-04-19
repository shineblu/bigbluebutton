import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import deviceInfo from '/imports/utils/deviceInfo';
import browserInfo from '/imports/utils/browserInfo';
import logger from '/imports/startup/client/logger';
import { makeCall } from '/imports/ui/services/api';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import Styled from './styles';
import EndMeetingConfirmationContainer from '/imports/ui/components/end-meeting-confirmation/container';

const propTypes = {
    intl: PropTypes.object.isRequired,
    mountModal: PropTypes.func.isRequired
};

const defaultProps = {
    amIModerator: false
};

const intlMessages = defineMessages({
});

class LeaveButtonComponent extends Component {
    constructor(props) {
	super(props);
	this.LOGOUT_CODE = '680';
	this.leaveSession = this.leaveSession.bind(this);
    }

    leaveSession() {
	const { 
	    intl,
	    mountModal,
	    amIModerator
	} = this.props;

	if (amIModerator) {
	    mountModal(<EndMeetingConfirmationContainer />)
	} else {	
	    makeCall('userLeftMeeting');
	    Session.set('codeError', this.LOGOUT_CODE);
	}
    }

    render() { 
	const { 
	    intl,
	    mountModal,
	    amIModerator
	} = this.props;
	return(
    	    <Styled.LeaveButton
    		disabled={false}
    		icon={'logout'}
    		data-test='Leave Conf'
    		label="Покинуть консультацию"
    		description=""
    		color={'default'}
    		ghost={false}
    		hideLabel
    		circle
    		size="lg"
    		onClick={ () => this.leaveSession() }
    		id='leave-button'
    	    />);
    }
}

LeaveButtonComponent.propTypes = propTypes;
LeaveButtonComponent.defaultProps = defaultProps;
export default withModalMounter(injectIntl(LeaveButtonComponent));
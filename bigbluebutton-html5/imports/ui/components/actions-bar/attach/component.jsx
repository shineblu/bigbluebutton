import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import deviceInfo from '/imports/utils/deviceInfo';
import browserInfo from '/imports/utils/browserInfo';
import logger from '/imports/startup/client/logger';
import { makeCall } from '/imports/ui/services/api';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import Styled from './styles';
import AttachModalContainer from '/imports/ui/components/actions-bar/attach/attach-modal/container';

const propTypes = {
    intl: PropTypes.object.isRequired,
    mountModal: PropTypes.func.isRequired
};

const defaultProps = {
    amIModerator: false
};

const intlMessages = defineMessages({
});

class AttachButtonComponent extends Component {
    constructor(props) {
	super(props);
	//this.LOGOUT_CODE = '680';
	//this.leaveSession = this.leaveSession.bind(this);
    }

    attachFilesDialog() {
	const { 
	    intl,
	    mountModal,
	    amIModerator
	} = this.props;

	//if (amIModerator) {
	    mountModal(<AttachModalContainer />)
	//} else {	
	//    makeCall('userLeftMeeting');
	//    Session.set('codeError', this.LOGOUT_CODE);
	//}
    }

    render() { 
	const { 
	    intl,
	    mountModal,
	    amIModerator
	} = this.props;
	return(
    	    <Styled.AttachButton
    		disabled={false}
    		icon={'upload'}
    		data-test='Attach Files Conf'
    		label="Прикрепить файлы к истории болезни"
    		description=""
    		color={'default'}
    		ghost={false}
    		hideLabel
    		circle
    		size="lg"
    		onClick={ () => this.attachFilesDialog() }
    		id='attach-button'
    	    />);
    }
}

AttachButtonComponent.propTypes = propTypes;
AttachButtonComponent.defaultProps = defaultProps;
export default withModalMounter(injectIntl(AttachButtonComponent));
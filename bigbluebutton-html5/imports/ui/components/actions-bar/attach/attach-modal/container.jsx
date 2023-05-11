import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import browserInfo from '/imports/utils/browserInfo';
import getFromUserSettings from '/imports/ui/services/users-settings';
import AttachModal from './component';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import lockContextContainer from '/imports/ui/components/lock-viewers/context/container';
import AppService from '/imports/ui/components/app/service';
import Storage from '/imports/ui/services/storage/session';
const AttachModalContainer = (props) => <AttachModal {...props} />;
const APP_CONFIG = Meteor.settings.public.app;

export default withModalMounter(AttachModalContainer);
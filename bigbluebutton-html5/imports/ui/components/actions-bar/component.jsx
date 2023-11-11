import React, { PureComponent } from 'react';
import CaptionsButtonContainer from '/imports/ui/components/captions/button/container';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import Styled from './styles';
import ActionsDropdown from './actions-dropdown/container';
import ScreenshareButtonContainer from '/imports/ui/components/actions-bar/screenshare/container';
import LeaveButtonContainer from '/imports/ui/components/actions-bar/leave/container';
import AttachButtonContainer from '/imports/ui/components/actions-bar/attach/container';
import AudioControlsContainer from '../audio/audio-controls/container';
import JoinVideoOptionsContainer from '../video-provider/video-button/container';
import PresentationOptionsContainer from './presentation-options/component';
import Storage from '/imports/ui/services/storage/session';

class ActionsBar extends PureComponent {
  render() {
    const {
      amIPresenter,
      amIModerator,
      enableVideo,
      isLayoutSwapped,
      toggleSwapLayout,
      handleTakePresenter,
      intl,
      isSharingVideo,
      hasScreenshare,
      stopExternalVideoShare,
      isCaptionsAvailable,
      isMeteorConnected,
      isPollingEnabled,
      isSelectRandomUserEnabled,
      isRaiseHandButtonEnabled,
      isPresentationDisabled,
      isThereCurrentPresentation,
      allowExternalVideo,
      setEmojiStatus,
      currentUser,
      shortcuts,
      layoutContextDispatch,
      actionsBarStyle,
      isOldMinimizeButtonEnabled,
    } = this.props;

    // check if Storage has non-empty attachFilesUrl
    const attachFilesUrl = Storage.getItem('attachFilesUrl');
    const screenshare = Storage.getItem('screenshare');

    return (
      <Styled.ActionsBar
        style={
          {
            height: actionsBarStyle.innerHeight,
          }
        }
      >
        <Styled.Left />
        <Styled.Center>
          <AudioControlsContainer />
          {enableVideo
            ? (
              <JoinVideoOptionsContainer />
            )
            : null}
          {attachFilesUrl && !amIModerator
            ? (
		<AttachButtonContainer {...{
		    amIModerator
		}}
    		/>
	    )
	  : null}
	  <LeaveButtonContainer {...{
	    amIModerator
	  }}
    	  />
          {screenshare && amIModerator
            ? (
        	<ScreenshareButtonContainer {...{
        	    amIPresenter,
        	    isMeteorConnected,
        	}}
		/>
	    )
	  : null}
        </Styled.Center>
        <Styled.Right>
          {!isOldMinimizeButtonEnabled ||
            (isOldMinimizeButtonEnabled && isLayoutSwapped && !isPresentationDisabled)
            ? (
              <PresentationOptionsContainer
                isLayoutSwapped={isLayoutSwapped}
                toggleSwapLayout={toggleSwapLayout}
                layoutContextDispatch={layoutContextDispatch}
                hasPresentation={isThereCurrentPresentation}
                hasExternalVideo={isSharingVideo}
                hasScreenshare={hasScreenshare}
              />
            )
            : null}
          {isRaiseHandButtonEnabled
            ? (
              <Styled.RaiseHandButton
                icon="hand"
                label={intl.formatMessage({
                  id: `app.actionsBar.emojiMenu.${
                    currentUser.emoji === 'raiseHand'
                      ? 'lowerHandLabel'
                      : 'raiseHandLabel'
                  }`,
                })}
                accessKey={shortcuts.raisehand}
                color={currentUser.emoji === 'raiseHand' ? 'primary' : 'default'}
                data-test={currentUser.emoji === 'raiseHand' ? 'lowerHandLabel' : 'raiseHandLabel'}
                ghost={currentUser.emoji !== 'raiseHand'}
                emoji={currentUser.emoji}
                hideLabel
                circle
                size="lg"
                onClick={() => {
                  setEmojiStatus(
                    currentUser.userId,
                    currentUser.emoji === 'raiseHand' ? 'none' : 'raiseHand',
                  );
                }}
              />
            )
            : null}
        </Styled.Right>
      </Styled.ActionsBar>
    );
  }
}

export default withShortcutHelper(ActionsBar, ['raiseHand']);

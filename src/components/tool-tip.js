import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const CustomToolTip = withStyles((theme) => ({
  tooltip: {
    fontSize: 18,
    maxWidth: '70vw',
  },
}))(Tooltip);

const tip =
  <div>
    <p>
      Thanks for visiting this webapp! There's always more work to do so if you have
      any ideas feel free to reach me at ehymowitz@gmail.com
    </p>
    <p>
      There are three pages on here so far - Sequencer, File Loader, and MPC.
      You can navigate using the bottom menu with the play button, mic, and grid shaped buttons respectively.
    </p>
    <p>
      You can open more than one page of this webapp so I HIGHLY recommend making a loop in one page then opening
      a new page to improvise sounds over the loop in another session.
    </p>
    <p>
      File Loader: Upload your own files or select files which are hosted online so that they appear in other pages.
      Click on a sound to preview it.
    </p>
    <p>
      Sequencer: You can change the BPM, mess with different sounds and the switch gives
      access to some synth sounds. Play controls are on the top by the
      bpm box.
    </p>
    <p>
      MPC: Hold down a trigger to open the menu to change the sound - play with loaded files
      or hit the switch to change into synth mode.
    </p>
    <p>
      Enjoy!
    </p>
  </div>

const HoverTip = () => {

  return (
    <CustomToolTip title={tip}>
      <p className="hover-tip">?</p>
    </CustomToolTip>
  )
}

export default HoverTip

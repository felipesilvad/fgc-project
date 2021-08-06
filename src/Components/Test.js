import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import { version } from '../../package.json'
import ReactPlayer from 'react-player'

class Test extends Component {
  state = {
    played: 0,
  }

  handleTime = (time) => {
    this.player.seekTo(parseFloat(3600))
  }

  ref = player => {
    this.player = player
  }

  render () {
    
    const hour = '01'
    const min = '22'
    const sec = '26'
    const timeConverted = (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec)

    console.log(timeConverted)
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · '
  
    return (
      <div className='app'>
        <section className='section'>
          <h1>ReactPlayer Demo</h1>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              controls='true'
              width='100%'
              height='100%'
              url={'https://www.twitch.tv/videos/1075550815'}
            />
          </div>

          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.handleTime}>Wookr</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default Test
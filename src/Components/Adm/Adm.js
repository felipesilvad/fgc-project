import AddRegion from './AddRegion';
import AddTeam from './AddTeam';
import AddPlayer from './AddPlayer';
import AddSeries from './AddSeries';
import GamesList from './GamesList';

function Adm() {
  return (
    <div>
      <GamesList />
      <AddRegion />
      <AddTeam />
      <AddPlayer />
      <AddSeries />      
    </div>
  );
}

export default Adm;

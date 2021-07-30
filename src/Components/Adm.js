import AddRegion from './AddRegion';
import AddTeam from './AddTeam';
import AddPlayer from './AddPlayer';
import AddSeries from './AddSeries';

function Adm() {
  return (
    <div>
      <AddRegion />
      {/* <AddTeam /> */}
      <AddPlayer />
      <AddSeries />      
    </div>
  );
}

export default Adm;
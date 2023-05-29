import React from 'react';

const AnalysisCountBadge = ({analysisCount}) => {
    return ( 
        <span className='ms-2' style={{color:"#C91871"}}><i className="fas fa-file-medical-alt me-2"></i>{analysisCount}</span>
     );
}
 
export default AnalysisCountBadge;
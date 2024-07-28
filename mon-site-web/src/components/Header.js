// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./Header.css";

// const Header = () => {
//     return (
//         <header>
//             <div class="radio-inputs">
//                 <label class="radio">
//                 <input type="radio" name="radio" checked="" />
//                 <span class="name">Home</span>
//                 </label>
//                 <label class="radio">
//                 <input type="radio" name="radio" />
//                 <a href ="net/net.html" class="name"><span  >Notes</span></a>
//                 </label>
//                 <label class="radio">
//                 <input type="radio" name="radio" />
//                 <a href="test.html" class="name"><span >Projets</span></a>
//                 </label>
//                 <label class="radio">
//                     <input type="radio" name="radio" />
//                     <span class="name">CV</span>
//                 </label>
//             </div>
//         </header>
//     );
// };

// export default Header;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [selected, setSelected] = useState('Home');

    return (
        <header>
            <div className="radio-inputs">
                <label className="radio">
                    <input
                        type="radio"
                        name="radio"
                        checked={selected === 'Home'}
                        onChange={() => setSelected('Home')}
                    />
                    <span className="name"><Link to="/">Home</Link></span>
                </label>
                {/* <label className="radio">
                    <input
                        type="radio"
                        name="radio"
                        checked={selected === 'Notes'}
                        onChange={() => setSelected('Notes')}
                    />
                    <span className="name"><Link to="/notes">Notes</Link></span>
                </label> */}
                <label className="radio">
                    <input
                        type="radio"
                        name="radio"
                        checked={selected === 'Graph'}
                        onChange={() => setSelected('Graph')}
                    />
                    <span className="name"><Link to="graph">Projets</Link></span>
                </label>
                <label className="radio">
                    <input
                        type="radio"
                        name="radio"
                        checked={selected === 'CV'}
                        onChange={() => setSelected('CV')}
                    />
                    <span className="name"><Link to="/cv">CV</Link></span>
                </label>
            </div>
        </header>
    );
};

export default Header;
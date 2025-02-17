import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Korman1 from '../Svgs/Korman1.jsx';
import Korman2 from '../Svgs/Korman2.jsx';

const SvgComponent = ({ id, building, floor }) => {
    console.log(floor);
    const [initialLoad, setInitialLoad] = useState(true);
    const [prevId, setPrevId] = useState('');

    const jQuerycode = () => {

        if (prevId !== '') {
            $(`#${prevId}`).css({ fill: '#000080' });
            $(`#${prevId}L`).css({ fill: '#ffffff' });
        }

        if (id !== '') {
            $(`#${id}`).css({ fill: "#FFC600" });
            $(`#${id}L`).css({ fill: "#000000" });
            if (!initialLoad) {
                setPrevId(id);
            } else {
                setInitialLoad(false);
            }
        }
    };

    useEffect(() => {
        jQuerycode();
    }, [id, initialLoad]); 



     return (
         <div>
             {building.toLowerCase() === "korman center" && floor === "1" && <Korman1 />}
             {building.toLowerCase() === "korman center" && floor === "2" && <Korman2 />}
        </div>
    );
}

export default SvgComponent;
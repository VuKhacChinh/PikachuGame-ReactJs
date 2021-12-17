
import React from 'react';
import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBoard } from '../redux_store/slice';
import { checkParingByPos, invalidChoice } from './Controller';

export default function Board(){
    const listPik = useSelector((state)=> state.pikachu.value);
    const board = useSelector((state)=> state.board.value);
    const dispatch = useDispatch();
    var time = 100;
    const [countPik, setCountPik] = useState(64);
    let preClickedPik = ""
    let preClickedPikPoiter = null;
    let prevpos = {
        row: 0,
        col: 0
    };

    setInterval(()=>{
        let clock = document.getElementById('clock');
        let time = clock.innerHTML;
        if(time.includes("h")) return;
        else time = parseInt(time);
        time = time - 1;
        clock.innerHTML = time;
        if(time==0) {
            document.getElementById('board').innerHTML = "<h1>Bạn thua</h1>"
            clock.innerHTML = "<h2>Trò chơi kết thúc</h2>";
        }
    },1000);

    const clickPik = (event) => {
        let e = event.target;
        let path = e.src;
        let pos = parseInt(e.className);
        let row = Math.floor(pos/8) + 1;
        let col = pos%8 + 1;
        pos = {
            row,
            col
        }
        if(path == preClickedPik && e!= preClickedPikPoiter && checkParingByPos(pos, prevpos, board)){
            preClickedPikPoiter.style.border = "1px solid olivedrab";
            e.style.visibility = preClickedPikPoiter.style.visibility = "hidden";
            preClickedPik="";
            preClickedPikPoiter = null;
            dispatch(changeBoard(invalidChoice(pos, prevpos, board)));
            if(countPik-2==0){
                document.getElementById('board').innerHTML = "<h1>Bạn thắng</h1>"
            }
            console.log(countPik);
            setCountPik(countPik-2);
        }
        else{
            if(preClickedPik==""){
                preClickedPik = path;
                preClickedPikPoiter = e;
                prevpos = pos;
                e.style.border = "2px solid red";
            }
            else{
                preClickedPik = "";
                preClickedPikPoiter.style.border = "1px solid olivedrab";
                preClickedPikPoiter = null;
                prevpos = {row:0, col:0};
            }
        }
    }

    return(
        <div style={{textAlign: 'center'}}>
            <p id="clock" style={{fontSize: '200%', color: 'green'}}>{time}</p>
            <div id="spacegame">
                <div id="board" style={{width: '580px', height: '580px', margin: 'auto', color: 'orange'}}>
                    {
                        listPik.map((pik,key)=>{
                            return(<img className = {key} src={pik} onClick={(e)=> clickPik(e)}/>);
                        })
                    }
                </div>
            </div>
            <button style={{color: 'blue',backgroundColor: 'yellow', padding: '5px', marginTop: '3px'}}
            onClick={()=>{
                window.location.reload();
            }}
            >Chơi mới</button>
        </div>
    );
}

   
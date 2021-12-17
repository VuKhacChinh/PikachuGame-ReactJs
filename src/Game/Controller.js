import { boardReducer } from "../redux_store/slice";

export const searchPath = (row1, col1, row2, col2, zigzagnum, preStep, board) => {
    if(row1<0||row1> 9||row2<0||row2> 9||col1<0||col1> 9||col2<0||col2> 9||zigzagnum > 2) return false;
    if(row1!==row2||col1!==col2){
      if(preStep!=='n'&&board[row1][col1]===1) return false;
    }
    else return true;
    let leftStep, rightStep, bottomStep, topStep;
    leftStep = (preStep==='r')? false: searchPath(row1, col1 - 1, row2, col2, (preStep==='l'||preStep==='n'? zigzagnum: zigzagnum + 1), 'l', board);
    rightStep = (preStep==='l')? false: searchPath(row1, col1 + 1, row2, col2, (preStep==='r'||preStep==='n'? zigzagnum: zigzagnum + 1), 'r', board);
    bottomStep = (preStep==='t')? false: searchPath(row1 - 1, col1, row2, col2, (preStep==='b'||preStep==='n'? zigzagnum: zigzagnum + 1), 'b', board);
    topStep = (preStep==='b')? false: searchPath(row1 + 1, col1, row2, col2, (preStep==='t'||preStep==='n'? zigzagnum: zigzagnum + 1), 't', board);
    return leftStep||rightStep||bottomStep||topStep;
}

export const checkParingByPos = (pos1, pos2, board)=>{
    return searchPath(pos1['row'], pos1['col'], pos2['row'], pos2['col'], 0, 'n', board);
}

export const checkExistPair = (board, listPikachu) => {
    const sizePik = listPikachu.length;
    for(let it = 0; it < sizePik; ++it){
        const listPos = listPikachu[it]['listPos'];
        const sizePos = listPos.length;
        for(let it2 = 0; it2 < sizePos - 1; ++it2){
            for(let it3 = it2 + 1; it3 < sizePos; ++it3){
                if(checkParingByPos(listPos[it2], listPos[it3], board)==true) return true;
            }
        }
    }
    return false;
}

export const startGame = ()=>{
    let listPik = [];
    for(let i = 1; i <= 16; ++i){
        for(let j = 0; j < 4; ++j) listPik.push("PikachuImage/pik"+i+".jpg");
    }

    for(let i = 0; i < 99; ++i){
        let pos1 = Math.floor(Math.random() * 64);
        let pos2 = Math.floor(Math.random() * 64);
        if(pos1!=pos2){
            let tmp = listPik[pos1];
            listPik[pos1] = listPik[pos2];
            listPik[pos2] = tmp;
        }
    }

    return listPik;
}

export const createBoard = ()=>{
    let board = [[0,0,0,0,0,0,0,0,0,0]];
    for(let i = 0; i < 8; ++i){
        board.push([0,1,1,1,1,1,1,1,1,0]);
    }
    board.push([0,0,0,0,0,0,0,0,0,0]);
    return board;
}

export const invalidChoice = (pos1, pos2, board) => {
    let n = board.length;
    let boardcopy = [];
    for(let i = 0; i < n; ++i){
        let tmp = [...board[i]];
        boardcopy.push(tmp);
    }
    boardcopy[pos1.row][pos1.col] = 0;
    boardcopy[pos2.row][pos2.col] = 0;
    return boardcopy;
}

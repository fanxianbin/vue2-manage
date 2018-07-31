let mutations = {

    setMainMenuActiveIndex(state,index){
        state.mainMenuActiveIndex = index;
    },
    setMainMenuItemCollapse(state){
       state.mainMenuItemCollapse = !state.mainMenuItemCollapse; 
    },
    setPagePosition(state,position){
        state.pagePosition = position;
    }

}

export default mutations

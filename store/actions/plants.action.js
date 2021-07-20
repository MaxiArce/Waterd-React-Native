export const SELECT_PLANT = 'SELECT_PLANT'
export const ADD_PLANT = 'ADD_PLANT'
export const DELETE_PLANT = 'DELETE_PLANT'

export const selectPlant = (id) => ({
    type: SELECT_PLANT,
    plantID: id
})

export const addPlant = item => ({
    type: ADD_PLANT,
    item
})

export const deletePlant = (id) => ({
    type: DELETE_PLANT,
    plantID: id,
  })